import { ipcRenderer, contextBridge } from 'electron'
import 'selector-generator'
import { connectSocket, send, listen } from './client-ipc'
import { Handler, Broadcast, ElementPayload } from './backend/backend.interface'

let PROJECTID: string | null = null
let activeElement: HTMLElement | null = null
const css = `
  [data-code]:hover {
    box-shadow: 0 0 0 2px #4fd1c5;
  }
  [data-active] {
    box-shadow: 0 0 0 2px #319795;
  }
`

// eslint-disable-next-line new-cap
const generator = new (window as any).SelectorGenerator()
const getSelectorString = (el: Element): string => {
  return generator.getPath(el).replace('html body ', '').split(' ').join('>')
}

const InspectActiveElement = async (): Promise<void> => {
  if (!PROJECTID) return

  if (!activeElement) {
    await send(Handler.FocusElement, { id: PROJECTID, tagName: '' })
    return
  }

  const codePosition = activeElement.getAttribute('data-code')
  if (!codePosition) {
    await send(Handler.FocusElement, { id: PROJECTID, tagName: '' })
    return
  }

  const { tagName, className } = activeElement
  const payload: ElementPayload = { id: PROJECTID, codePosition, className, tagName }

  const declaration = getComputedStyle(activeElement)
  payload.display = declaration.getPropertyValue('display')
  payload.position = declaration.getPropertyValue('position')

  if (activeElement.parentElement) {
    payload.parentTagName = activeElement.parentElement.tagName
    const parentDeclaration = getComputedStyle(activeElement.parentElement)
    payload.parentDisplay = parentDeclaration.getPropertyValue('display')
  }

  await send(Handler.FocusElement, payload as any)
}

ipcRenderer.on('setParams', async (event: Event, { socketId, projectId, activeSelector }: Record<string, string>) => {
  console.log('setParams', socketId, projectId, activeSelector)
  PROJECTID = projectId
  connectSocket(socketId)

  if (activeSelector) {
    activeElement = document.querySelector(activeSelector)
    activeElement?.setAttribute('data-active', 'true')

    await InspectActiveElement()
  }
})

const derealizeListener = async (e: Event) => {
  if (!e.target || !PROJECTID) return
  e.stopPropagation() // todo:用防反跳函数代替 stopPropagation()

  activeElement?.removeAttribute('data-active')
  activeElement = e.target as HTMLElement
  activeElement.setAttribute('data-active', 'true')

  const activeSelector = getSelectorString(activeElement)
  ipcRenderer.send('setActiveSelector', PROJECTID, activeSelector)
  // console.log('setActiveSelector', activeSelector)

  await InspectActiveElement()
}

listen(Broadcast.LiveUpdateClass, ({ id, className }: ElementPayload) => {
  if (id === PROJECTID && activeElement) {
    // console.log('LiveUpdateClass', className)
    activeElement.className = className
  }
})

const listenElement = async () => {
  document.querySelectorAll('[data-code]').forEach((el) => {
    el.removeEventListener('click', derealizeListener)
    el.addEventListener('click', derealizeListener)

    el.removeEventListener('contextmenu', derealizeListener)
    el.addEventListener('contextmenu', derealizeListener)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style')
  style.appendChild(document.createTextNode(css))
  document.head.appendChild(style)
  listenElement()
})

contextBridge.exposeInMainWorld('derealize', {
  isMac: process.platform === 'darwin',
  isDev: process.env.NODE_ENV === 'development',
  listenElement,
})
