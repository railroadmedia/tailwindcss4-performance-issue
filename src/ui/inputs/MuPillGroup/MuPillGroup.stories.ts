import type { Meta, StoryObj } from '@storybook/vue3'
import MuPillGroup from './MuPillGroup.vue'
import { ref } from 'vue'

const meta = {
  title: 'UI/Inputs/MuPillGroup',
  component: MuPillGroup,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Currently selected value',
    },
    options: {
      control: 'object',
      description: 'Array of pill options',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state of the entire group',
    },
  },
} satisfies Meta<typeof MuPillGroup>

export default meta
type Story = StoryObj<typeof meta>

const defaultOptions = [
  { value: 'book', label: 'Book', icon: 'book-read' },
  { value: 'video', label: 'Video', icon: 'video-camera' },
  { value: 'band-practice', label: 'Band Practice', icon: 'users-user-group' },
  { value: 'gig', label: 'Gig', icon: 'play-along' },
  { value: 'in-person-lesson', label: 'In-Person Lesson', icon: 'courses-hat-graduation' },
  { value: 'other', label: 'Other', icon: 'edit-pen-paper' },
]

export const Default: Story = {
  render: (args) => ({
    components: { MuPillGroup },
    setup() {
      const selected = ref(args.modelValue)
      return { args, selected }
    },
    template: `
      <MuPillGroup
        v-model="selected"
        :options="args.options"
        :disabled="args.disabled"
      />
    `,
  }),
  args: {
    modelValue: 'daily',
    options: defaultOptions,
    disabled: false,
  },
}

export const WithoutIcons: Story = {
  render: Default.render,
  args: {
    modelValue: 'option1',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    disabled: false,
  },
}

export const Disabled: Story = {
  render: Default.render,
  args: {
    ...Default.args,
    disabled: true,
  },
}
