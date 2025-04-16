import { ArrowUturnLeftIcon, PlusCircleIcon, FlagIcon } from '@heroicons/vue/24/outline'

export function useContextMenuActions() {
  const mediaActions = [
    {
      id: 'reset-progress',
      icon: ArrowUturnLeftIcon,
      label: 'Reset Progress',
    },
    {
      id: 'playlist-add',
      icon: PlusCircleIcon,
      label: 'Save to Playlist',
    },
    {
      id: 'report-issue',
      icon: FlagIcon,
      label: 'Report an Issue',
    },
  ]

  return {
    mediaActions,
  }
}
