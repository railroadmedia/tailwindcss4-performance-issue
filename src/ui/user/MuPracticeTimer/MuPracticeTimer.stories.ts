import type { Meta, StoryObj } from '@storybook/vue3'
import MuPracticeTimer from './MuPracticeTimer.vue'
import MuSvgIcon from '@/ui/typography/MuSvgIcon/MuSvgIcon.vue'

const meta = {
  title: 'UI/User/MuPracticeTimer',
  component: MuPracticeTimer,
  tags: ['autodocs'],
  argTypes: {
    goalTime: {
      control: 'text',
      description: 'Target practice time in MM:SS format',
    },
    currentTime: {
      control: 'text',
      description: 'Current elapsed time in MM:SS format',
    },
  },
} satisfies Meta<typeof MuPracticeTimer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    goalTime: '15:00',
    currentTime: '00:00',
  },
  parameters: {
    docs: {
      description: {
        story: `Default practice timer, showing only current time. <br>
          You can arrange the bottom slot to show the goal time.`,
      },
    },
  },
}

export const InProgress: Story = {
  args: {
    goalTime: '15:00',
    currentTime: '09:30',
  },
}

export const Completed: Story = {
  args: {
    goalTime: '15:00',
    currentTime: '17:20',
  },
}

export const WithCustomSlots: Story = {
  args: {
    goalTime: '15:00',
    currentTime: '05:00',
  },
  render: (args) => ({
    components: { MuPracticeTimer, MuSvgIcon },
    setup() {
      return { args }
    },
    template: `
      <MuPracticeTimer v-bind="args">
        <template #top>
          <MuSvgIcon name="stop-watch" class="w-5 h-5" />
        </template>
        <template #bottom>
          <span>Goal: ${args.goalTime}</span>
        </template>
      </MuPracticeTimer>
    `,
  }),
}
