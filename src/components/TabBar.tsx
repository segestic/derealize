/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useState, useRef } from 'react'
import cs from 'classnames'
import { VscThreeBars } from 'react-icons/vsc'
import { useStoreActions, useStoreState } from '../reduxStore'
import { Project } from '../models/project'
import useHotkeys from '../utils/useHotkeys'
import ChromeTabs from '../utils/chrome-tabs'
import css from './TabBar.module.scss'
import { ReactComponent as BackgroundSvg } from '../styles/chrome-tabs/background.svg'
import type { PreloadWindow } from '../preload'
import { MainIpcChannel } from '../interface'

declare const window: PreloadWindow
const { sendMainIpc } = window.derealize

const TabBar = (): JSX.Element => {
  const chromeTabs = useRef<any>()
  const openedProjects = useStoreState<Array<Project>>((state) => state.project.openedProjects)
  const frontProject = useStoreState<Project | undefined>((state) => state.project.frontProject)
  const setFrontProject = useStoreActions((actions) => actions.project.setFrontProjectThunk)
  const closeProject = useStoreActions((actions) => actions.project.closeProject)

  useEffect(() => {
    const el = document.querySelector('.chrome-tabs')
    if (!el) return

    chromeTabs.current = new ChromeTabs()
    chromeTabs.current.init(el)
    chromeTabs.current.setCurrentTab(document.querySelector(`.${css.maintab}`))
  }, [])

  useEffect(() => {
    chromeTabs.current?.layoutTabs()
    chromeTabs.current?.setupDraggabilly()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedProjects, frontProject])

  useHotkeys(
    'ctrl+t',
    () => {
      chromeTabs.current.addTab({
        title: 'New Tab',
        favicon: false,
      })
    },
    [],
  )

  return (
    <header className={css.tabbar}>
      <div className="chrome-tabs">
        <div className="chrome-tabs-content">
          <div
            draggable={false}
            className={cs('chrome-tab', css.maintab)}
            onClick={() => {
              setFrontProject(null)
            }}
            role="button"
            aria-hidden="true"
            {...(frontProject === undefined ? { active: 'true' } : {})}
          >
            <div className="chrome-tab-dividers" />
            <div className="chrome-tab-background">
              <BackgroundSvg />
            </div>
            <div className="chrome-tab-content">
              <div className="chrome-tab-favicon" />
              <div className="chrome-tab-title">Derealize</div>
              <div className="chrome-tab-drag-handle" />
              {!window.env.isMac && (
                <VscThreeBars
                  className={css.menu}
                  onClick={(e) => {
                    e.stopPropagation()
                    sendMainIpc(MainIpcChannel.MainMenu)
                  }}
                />
              )}
            </div>
          </div>

          {openedProjects.map((p) => (
            <div
              key={p.id}
              className="chrome-tab"
              onClick={() => {
                setFrontProject(p.id)
              }}
              role="button"
              aria-hidden="true"
              {...(frontProject?.id === p.id ? { active: 'true' } : {})}
            >
              <div className="chrome-tab-dividers" />
              <div className="chrome-tab-background">
                <BackgroundSvg />
              </div>
              <div className="chrome-tab-content">
                <div className="chrome-tab-favicon" />
                <div className="chrome-tab-title">{p.name}</div>
                <div className="chrome-tab-drag-handle" />
                <div
                  className="chrome-tab-close"
                  onClick={(e) => {
                    e.stopPropagation()
                    closeProject(p.id)
                  }}
                  role="button"
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={css.controls}>
        <div
          className={cs(css.button, css.minButton)}
          onClick={() => {
            sendMainIpc(MainIpcChannel.Controls, 'minimize')
          }}
          role="button"
          aria-hidden="true"
        >
          <img
            srcSet="styles/icons/min-k-10.png 1x, styles/icons/min-k-12.png 1.25x, styles/icons/min-k-15.png 1.5x, styles/icons/min-k-15.png 1.75x, styles/icons/min-k-20.png 2x, styles/icons/min-k-20.png 2.25x, styles/icons/min-k-24.png 2.5x, styles/icons/min-k-30.png 3x, styles/icons/min-k-30.png 3.5x"
            draggable="false"
            alt="icon"
          />
        </div>

        <div
          className={cs(css.button, css.maxButton)}
          onClick={() => {
            sendMainIpc(MainIpcChannel.Controls, 'maximize')
          }}
          role="button"
          aria-hidden="true"
        >
          <img
            srcSet="styles/icons/max-k-10.png 1x, styles/icons/max-k-12.png 1.25x, styles/icons/max-k-15.png 1.5x, styles/icons/max-k-15.png 1.75x, styles/icons/max-k-20.png 2x, styles/icons/max-k-20.png 2.25x, styles/icons/max-k-24.png 2.5x, styles/icons/max-k-30.png 3x, styles/icons/max-k-30.png 3.5x"
            draggable="false"
            alt="icon"
          />
        </div>

        <div
          className={cs(css.button, css.restoreButton)}
          onClick={() => {
            sendMainIpc(MainIpcChannel.Controls, 'unmaximize')
          }}
          role="button"
          aria-hidden="true"
        >
          <img
            srcSet="styles/icons/restore-k-10.png 1x, styles/icons/restore-k-12.png 1.25x, styles/icons/restore-k-15.png 1.5x, styles/icons/restore-k-15.png 1.75x, styles/icons/restore-k-20.png 2x, styles/icons/restore-k-20.png 2.25x, styles/icons/restore-k-24.png 2.5x, styles/icons/restore-k-30.png 3x, styles/icons/restore-k-30.png 3.5x"
            draggable="false"
            alt="icon"
          />
        </div>

        <div
          className={cs(css.button, css.closeButton)}
          onClick={() => {
            sendMainIpc(MainIpcChannel.Controls, 'close')
          }}
          role="button"
          aria-hidden="true"
        >
          <img
            srcSet="styles/icons/close-k-10.png 1x, styles/icons/close-k-12.png 1.25x, styles/icons/close-k-15.png 1.5x, styles/icons/close-k-15.png 1.75x, styles/icons/close-k-20.png 2x, styles/icons/close-k-20.png 2.25x, styles/icons/close-k-24.png 2.5x, styles/icons/close-k-30.png 3x, styles/icons/close-k-30.png 3.5x"
            draggable="false"
            alt="icon"
          />
        </div>
      </div>
    </header>
  )
}

export default TabBar
