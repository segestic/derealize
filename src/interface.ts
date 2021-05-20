export interface ProjectIdParam {
  projectId: string
}

export interface ImportPayload extends ProjectIdParam {
  url: string
  path: string
  branch: string
}

export interface ElementPayload extends ProjectIdParam {
  codePosition: string
  className: string
  selector: string
  text?: string
  dropzoneCodePosition?: string
}

export interface ElementActualStatus extends ProjectIdParam {
  codePosition: string
  tagName: string
  className: string
  display: string
  position: string
  background: string
  parentTagName?: string
  parentDisplay?: string
}

export enum InsertMode {
  After = 'After',
  Before = 'Before',
  Append = 'Append',
  // Prepend = 'Prepend',
}

export enum ElementTagType {
  div = 'div',
  span = 'span',
  a = 'a',
  button = 'button',
  input = 'input',
}

export interface InsertElementPayload extends ElementPayload {
  insertTagType: ElementTagType
  insertMode?: InsertMode
}

export interface ReplaceElementPayload extends ElementPayload {
  replaceTagType: ElementTagType
}

export interface BreadcrumbPayload extends ProjectIdParam {
  index: number
  isClick?: boolean
}

export interface JitTiggerPayload extends ProjectIdParam {
  className: string
}

export interface ThemeSetImagePayload extends ProjectIdParam {
  key: string
  path: string
  fileName: string
}

export interface ThemeRemoveImagePayload extends ProjectIdParam {
  key: string
  webPath: string
}

export enum MainIpcChannel {
  Shortcut = 'Shortcut',
  ControllerShortcut = 'ControllerShortcut',
  OpenImport = 'OpenImport',
  GetStore = 'GetStore',
  SetStore = 'SetStore',
  Controls = 'Controls',
  MainMenu = 'MainMenu',
  CloseFrontProject = 'CloseFrontProject',
  PagesMenu = 'PagesMenu',
  SelectDirs = 'SelectDirs',
  OpenDirs = 'OpenDirs',
  FrontView = 'FrontView',
  DestroyProjectView = 'DestroyProjectView',
  LoadURL = 'LoadURL',
  DeviceEmulation = 'DeviceEmulation',
  FocusElement = 'FocusElement',
  RespElementStatus = 'RespElementStatus',
  BlurElement = 'BlurElement',
  Flush = 'Flush',
  Refresh = 'Refresh',
  SelectBreadcrumb = 'SelectBreadcrumb',
  LiveUpdateClass = 'LiveUpdateClass',
  InsertTab = 'InsertTab',
  TextTab = 'TextTab',
  Dropped = 'Dropped',
}

export const ControllerShortcut = [
  { key: 'Alt+1', label: 'Current Panel' },
  { key: 'Alt+2', label: 'Layout Panel' },
  { key: 'Alt+3', label: 'Spacing Panel' },
  { key: 'Alt+4', label: 'Border Panel' },
  { key: 'Alt+5', label: 'Typography Panel' },
  { key: 'Alt+6', label: 'Background Panel' },
  { key: 'Alt+7', label: 'Effects Panel' },
  { key: 'Alt+8', label: 'Components Panel' },
  { key: 'Alt+9', label: 'Add Panel' },
]
