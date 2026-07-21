import {
  getExplicitRuntimeEnvironmentIdForWorktree,
  type WorktreeRuntimeOwnerState
} from '@/lib/worktree-runtime-owner'

export function shouldDeselectEmptyWorktreeAfterTabClose(args: {
  state: WorktreeRuntimeOwnerState
  worktreeId: string
  renderableTabCount: number
}): boolean {
  if (args.renderableTabCount !== 0) {
    return false
  }
  // Why: remote workspaces must stay selected while the host publishes the replacement canonical tab.
  return !getExplicitRuntimeEnvironmentIdForWorktree(args.state, args.worktreeId)
}
