import type { Meta, StoryObj } from '@storybook/vue3'
import MuSvgIcon from './MuSvgIcon.vue'

const meta = {
  title: 'UI/Typography/MuSvgIcon',
  component: MuSvgIcon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description:
        'Name of the icon to display (as defined in the icons folder, w/o the <strong><i>.svg</i></strong> extension)',
    },
  },
  render: (args) => ({
    components: { MuSvgIcon },
    setup() {
      return { args }
    },
    template: '<MuSvgIcon v-bind="args" class="h-[24px] w-[24px]" />',
  }),
} satisfies Meta<typeof MuSvgIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'settings',
  },
}

export const CustomSize: Story = {
  args: {
    name: 'settings',
    class: 'h-[32px] w-[32px]',
  },
  render: (args) => ({
    components: { MuSvgIcon },
    setup() {
      return { args }
    },
    template: '<MuSvgIcon v-bind="args" />',
  }),
}

export const CustomColor: Story = {
  args: {
    name: 'settings',
    class: 'h-[24px] w-[24px] fill-current text-red-500',
  },
  render: (args) => ({
    components: { MuSvgIcon },
    setup() {
      return { args }
    },
    template: '<MuSvgIcon v-bind="args" />',
  }),
}
