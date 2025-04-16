import type { Meta, StoryObj } from '@storybook/vue3'
import MuDropdownListItem from './MuDropdownListItem.vue'

const meta: Meta<typeof MuDropdownListItem> = {
  title: 'UI/Actions/MuDropdownListItem',
  component: MuDropdownListItem,
  tags: ['autodocs'],
  argTypes: {},
  render: (args) => ({
    components: { MuDropdownListItem },
    setup() {
      return { args }
    },
    template: `
      <div class="p-4 bg-base-100 w-52">
        <MuDropdownListItem v-bind="args">
          This is a dropdown item
        </MuDropdownListItem>
      </div>
    `,
  }),
}

export default meta
type Story = StoryObj<typeof MuDropdownListItem>

// Dropdown List Item Default
export const Default: Story = {
  args: {},
}

// Dropdown List Item With Icon
export const WithIcon: Story = {
  render: (args) => ({
    components: { MuDropdownListItem },
    setup() {
      return { args }
    },
    template: `
      <div class="p-4 bg-base-100 w-52">
        <MuDropdownListItem v-bind="args">
          <span class="mr-2">🔍</span>
          With an icon
        </MuDropdownListItem>
      </div>
    `,
  }),
  args: {},
}
