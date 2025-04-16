import type { Meta, StoryObj } from '@storybook/vue3'
import MuButtonGroup from './MuButtonGroup.vue'
import MuActionButton from '@/ui/buttons/MuActionButton/MuActionButton.vue'

const meta: Meta<typeof MuButtonGroup> = {
  title: 'UI/Buttons/MuButtonGroup',
  component: MuButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    vertical: {
      control: 'boolean',
      description: 'Whether the buttons should be stacked vertically',
    },
  },
}

export default meta
type Story = StoryObj<typeof MuButtonGroup>

export const Default: Story = {
  args: {
    vertical: false,
  },
  render: (args) => ({
    components: { MuButtonGroup, MuActionButton },
    setup() {
      return { args }
    },
    template: `
      <MuButtonGroup v-bind="args">
        <MuActionButton>First</MuActionButton>
        <MuActionButton>Second</MuActionButton>
        <MuActionButton>Third</MuActionButton>
      </MuButtonGroup>
    `,
  }),
}

export const WithOutlinedButtons: Story = {
  args: {
    vertical: false,
  },
  render: (args) => ({
    components: { MuButtonGroup, MuActionButton },
    setup() {
      return { args }
    },
    template: `
      <MuButtonGroup v-bind="args">
        <MuActionButton outline>Left</MuActionButton>
        <MuActionButton outline>Center</MuActionButton>
        <MuActionButton outline>Right</MuActionButton>
      </MuButtonGroup>
    `,
  }),
}

export const ResponsiveGroup: Story = {
  render: (args) => ({
    components: { MuButtonGroup, MuActionButton },
    setup() {
      return { args }
    },
    template: `
      <MuButtonGroup class="join-vertical lg:join-horizontal">
        <MuActionButton>Mobile Top / Desktop Left</MuActionButton>
        <MuActionButton>Mobile Middle / Desktop Center</MuActionButton>
        <MuActionButton>Mobile Bottom / Desktop Right</MuActionButton>
      </MuButtonGroup>
    `,
  }),
}
