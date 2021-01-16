import Git from 'nodegit'
import broadcast from './broadcast'
import message from './message'

export const Clone = async (url: string, path: string) => {
  try {
    const repository = await Git.Clone.clone(url, path)
    const commit = await repository.getHeadCommit()
    broadcast('gitClone', { result: commit.id().tostrS() })
  } catch (error) {
    if (error.message === 'exist') {
      // todo condition
      // https://github.com/nodegit/nodegit/blob/master/guides/cloning/index.js
      const repository = await Git.Repository.open(path)
      const commit = await repository.getHeadCommit()
      broadcast('gitClone', { result: commit.id().tostrS() })
    } else {
      message({ message: 'Clone', error })
      broadcast('gitClone', { error: error.message })
    }
  }
}

// https://github.com/nodegit/nodegit/blob/master/examples/add-and-commit.js
export const Commit = async (path: string) => {
  try {
    const repo = await Git.Repository.open(path)
    const index = await repo.refreshIndex()
    await index.addByPath('.')
    await index.write()
    const tree = await index.writeTree()
    const head = await Git.Reference.nameToId(repo, 'HEAD')
    const commit = await repo.getCommit(head)
    const committer = Git.Signature.default(repo)
    const commitId = await repo.createCommit('HEAD', committer, committer, 'message', tree, [commit])
    broadcast('gitCommit', { result: commitId.tostrS() })
  } catch (error) {
    message({ message: 'Clone', error })
    broadcast('gitCommit', { error: error.message })
  }
}
