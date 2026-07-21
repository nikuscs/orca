import { describe, expect, it } from 'vitest'
import { shouldDeselectEmptyWorktreeAfterTabClose } from './empty-worktree-close-navigation'

const WORKTREE_ID = 'repo::/workspace'

describe('shouldDeselectEmptyWorktreeAfterTabClose', () => {
  it('keeps an explicitly runtime-owned empty worktree selected', () => {
    expect(
      shouldDeselectEmptyWorktreeAfterTabClose({
        state: {
          worktreesByRepo: {
            repo: [{ id: WORKTREE_ID, repoId: 'repo', hostId: 'runtime:remote-host' }]
          }
        },
        worktreeId: WORKTREE_ID,
        renderableTabCount: 0
      })
    ).toBe(false)
  })

  it('deselects an empty local worktree even when another runtime is active', () => {
    expect(
      shouldDeselectEmptyWorktreeAfterTabClose({
        state: {
          settings: { activeRuntimeEnvironmentId: 'remote-host' },
          worktreesByRepo: {
            repo: [{ id: WORKTREE_ID, repoId: 'repo', hostId: 'local' }]
          }
        },
        worktreeId: WORKTREE_ID,
        renderableTabCount: 0
      })
    ).toBe(true)
  })

  it('keeps a non-empty worktree selected', () => {
    expect(
      shouldDeselectEmptyWorktreeAfterTabClose({
        state: {},
        worktreeId: WORKTREE_ID,
        renderableTabCount: 1
      })
    ).toBe(false)
  })
})
