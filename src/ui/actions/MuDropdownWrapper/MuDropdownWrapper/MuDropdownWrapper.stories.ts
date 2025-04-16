import type { Meta, StoryObj } from '@storybook/vue3'
import MuDropdownWrapper from './MuDropdownWrapper.vue'
import MuDropdownListItem from '../MuDropdownListItem/MuDropdownListItem.vue'

const meta: Meta<typeof MuDropdownWrapper> = {
  title: 'UI/Actions/MuDropdownWrapper',
  component: MuDropdownWrapper,
  tags: ['autodocs'],
  argTypes: {},
  render: (args) => ({
    components: { MuDropdownWrapper, MuDropdownListItem },
    setup() {
      return { args }
    },
    template: `
      <div class="h-[300px]">
        <MuDropdownWrapper v-bind="args">
          <div class="btn">Click Me</div>
          <template #options>
            <MuDropdownListItem v-for="(option, index) in 3" :key="index">
              Option {{ index + 1 }}
            </MuDropdownListItem>
          </template>
        </MuDropdownWrapper>
      </div>
    `,
  }),
}

export default meta
type Story = StoryObj<typeof MuDropdownWrapper>

// Dropdown Wrapper Default
export const Default: Story = {
  args: {},
}
