import React, { useEffect } from 'react'
import cs from 'classnames'
import { Text, IconButton } from '@chakra-ui/react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { PuffLoader } from 'react-spinners'
import { useStoreActions, useStoreState } from './reduxStore'
import { Project } from './models/project'
import TopBar from './components/TopBar'
import style from './Project.module.scss'
import PreloadWindow from './preload_inteeface'

declare const window: PreloadWindow

const ProjectView = (): JSX.Element => {
  const loading = useStoreState<boolean>((state) => state.project.loading)
  const debugging = useStoreState<boolean>((state) => state.project.debugging)
  const project = useStoreState<Project | null>((state) => state.project.frontProject)
  const setDebugging = useStoreActions((actions) => actions.project.setDebugging)

  return (
    <>
      <TopBar />
      <div className={style.content}>
        <PuffLoader loading={loading} color="#4FD1C5" />
        {debugging && project && (
          <>
            <div className={style.output}>
              {project.runningOutput?.map((o, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Text color={o.startsWith('error') || o.startsWith('stderr') ? 'red.500' : 'gray.500'} key={i}>
                  {o}
                </Text>
              ))}
            </div>
            <IconButton
              aria-label="Close"
              icon={<AiOutlineCloseCircle />}
              onClick={() => {
                window.electron.frontProjectView(project.url)
                setDebugging(false)
              }}
            />
          </>
        )}
      </div>
    </>
  )
}

export default ProjectView
