import type { Meta, StoryObj } from '@storybook/vue3'
import MuActionButton from './MuActionButton.vue'

const meta: Meta<typeof MuActionButton> = {
  title: 'UI/Buttons/MuActionButton',
  component: MuActionButton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MuActionButton>

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { MuActionButton },
    setup() {
      return { args }
    },
    template: '<MuActionButton v-bind="args">Click Me</MuActionButton>',
  }),
}
