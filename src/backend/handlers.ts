/* eslint-disable no-restricted-syntax */
import type { TailwindConfig } from 'tailwindcss/tailwind-config'
import Project from './project'
import log from './log'
import type { HistoryReply, BoolReply } from './backend.interface'
import { ElementPayload, InsertElementPayload } from '../interface'
import { ApplyClass, InsertElement } from './shift'
import { npmStart } from './npm'

const projectsMap = new Map<string, Project>()
type IdParam = { url: string }

const getProject = (url: string): Project => {
  const project = projectsMap.get(url)
  if (!project) throw new Error('project null')
  return project
}

export const Import = async ({ url, path, branch }: Record<string, string>): Promise<BoolReply> => {
  let project = projectsMap.get(url)
  if (!project) {
    project = new Project(url, path, branch)
    projectsMap.set(url, project)
  }

  const result = await project.Import()
  return result
}

export const Remove = async ({ url }: Record<string, string>): Promise<BoolReply> => {
  const result = projectsMap.delete(url)
  return { result }
}

export const Install = async ({ url }: IdParam): Promise<BoolReply> => {
  const project = getProject(url)
  const result = project.Install()
  return result
}

export const CheckStatus = async ({ url }: IdParam) => {
  const project = getProject(url)
  await project.CheckStatus()
}

export const Start = async ({ url }: IdParam): Promise<BoolReply> => {
  const project = getProject(url)
  const result = await project.Start()
  return result
}

export const Stop = async ({ url }: IdParam) => {
  const project = getProject(url)
  await project.Stop()
}

export const Pull = async ({ url }: IdParam): Promise<BoolReply> => {
  const project = getProject(url)
  const reply = await project.Pull()
  return reply
}

export const Push = async ({ url, msg }: Record<string, string>): Promise<BoolReply> => {
  const project = getProject(url)
  const reply = await project.Push(msg)
  return reply
}

export const History = async ({ url }: IdParam): Promise<HistoryReply> => {
  const project = getProject(url)
  const logs = await project.History()
  return logs
}

// export const Dispose = async ({ url }: IdParam) => {
//   const project = getProject(url)
//   project?.Dispose()
//   projectsMap.delete(url)
// }

export const DisposeAll = async () => {
  // https://eslint.org/docs/rules/no-await-in-loop#examples
  const promises = []
  for (const project of projectsMap.values()) {
    promises.push(project.Dispose())
  }
  await Promise.all(promises)
  log('DisposeAll')
}

export const GetTailwindConfig = async ({ url }: IdParam): Promise<TailwindConfig> => {
  const project = getProject(url)
  const config = await project.GetTailwindConfig()
  return config
}

export const UpdateClass = async (payload: ElementPayload) => {
  const { projectId } = payload
  const project = getProject(projectId)

  ApplyClass(project.path, payload)
}

export const AddElement = async (payload: InsertElementPayload) => {
  const { projectId } = payload
  const project = getProject(projectId)

  InsertElement(project.path, payload)
  npmStart(project.path, project.config.formatScript)
}
