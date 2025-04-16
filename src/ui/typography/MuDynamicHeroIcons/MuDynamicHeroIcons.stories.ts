import type { Meta, StoryObj } from '@storybook/vue3'
import MuDynamicHeroIcons from './MuDynamicHeroIcons.vue'

const meta: Meta<typeof MuDynamicHeroIcons> = {
  title: 'UI/Typography/MuDynamicHeroIcons',
  component: MuDynamicHeroIcons,
  tags: ['autodocs'],
  argTypes: {},
  render: (args) => ({
    components: { MuDynamicHeroIcons },
    setup() {
      return { args }
    },
    template: '<MuDynamicHeroIcons v-bind="args" class="h-[24px] w-[24px] text-black" />',
  }),
}

export default meta
type Story = StoryObj<typeof MuDynamicHeroIcons>

export const Default: Story = {
  args: {
    iconStyle: 'outline',
    name: 'EllipsisVertical',
  },
}

export const EllipsisVertical: Story = {
  args: {
    iconStyle: 'outline',
    name: 'EllipsisVertical',
  },
}

export const ArrowTopRightOnSquare: Story = {
  args: {
    iconStyle: 'outline',
    name: 'ArrowTopRightOnSquare',
  },
}

export const EyeSlash: Story = {
  args: {
    iconStyle: 'outline',
    name: 'EyeSlash',
  },
}

export const Flag: Story = {
  args: {
    iconStyle: 'outline',
    name: 'Flag',
  },
}
