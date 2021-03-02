import React, { useEffect, Suspense } from 'react'
import cs from 'classnames'
import { PuffLoader } from 'react-spinners'
import { useStoreActions, useStoreState } from './reduxStore'
import { Project } from './models/project'
import Home from './Home'
import TopBar from './components/TopBar'
import TabBar from './components/TabBar'
import ImportProject from './components/Import'
import style from './App.module.scss'

const App = (): JSX.Element => {
  const profileLoad = useStoreActions((actions) => actions.profile.load)
  const projectLoad = useStoreActions((actions) => actions.project.load)
  const projectListen = useStoreActions((actions) => actions.project.listen)
  const projectUnListen = useStoreActions((actions) => actions.project.unlisten)

  const loading = useStoreState<boolean>((state) => state.project.loading)
  const frontProject = useStoreState<Project | null>((state) => state.project.frontProject)

  useEffect(() => {
    profileLoad()
    projectLoad()
    projectListen()

    return projectUnListen
  }, [profileLoad, projectListen, projectLoad, projectUnListen])

  return (
    <div className="app">
      <TabBar />
      <div className={style.main}>
        {!frontProject && <Home />}
        {frontProject && <TopBar />}
        {loading && (
          <div className={style.centerWapper}>
            <PuffLoader loading={loading} color="#4FD1C5" />
          </div>
        )}
      </div>
      <ImportProject />
    </div>
  )
}

export default App
