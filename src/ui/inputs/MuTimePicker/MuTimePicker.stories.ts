import type { Meta, StoryObj } from '@storybook/vue3'
import MuTimePicker from './MuTimePicker.vue'
import { ref, watch } from 'vue'
const meta = {
  title: 'UI/Inputs/MuTimePicker',
  component: MuTimePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A time picker component that allows users to input time in mm:ss format. Supports keyboard navigation and custom step intervals.',
      },
    },
  },
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Current time value in format "mm:ss"',
    },
    step: {
      control: { type: 'number', min: 1, max: 60 },
      description: 'Step value for increment/decrement (in seconds)',
    },
    'onUpdate:modelValue': {
      description: 'Event emitted when time value changes',
    },
    onChange: {
      description: 'Event emitted when time value changes',
    },
  },
} satisfies Meta<typeof MuTimePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: '0:00',
  },
}

export const WithInitialValue: Story = {
  args: {
    modelValue: '42:30',
  },
}

export const CustomStep: Story = {
  args: {
    modelValue: '1:00',
    step: 15,
  },
}

export const LongDuration: Story = {
  args: {
    modelValue: '59:59',
  },
}

export const InteractiveExample: Story = {
  args: {
    modelValue: '8:00',
  },
  render: (args) => ({
    components: { MuTimePicker },
    setup() {
      const value = ref(args.modelValue)
      watch(value, (newVal) => {
        args.modelValue = newVal
      })
      return { args, value }
    },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center gap-4">
          <MuTimePicker
            class="w-lg"
            v-model="value"
            v-bind="args"
            @update:modelValue="args['update:modelValue']"
            @change="args.change"
          />
          <span class="text-sm text-mu-7">
            Try using ↑/↓ keys to change values
          </span>
        </div>
        <div class="text-sm text-mu-7">
          Current value: <span class="font-bold">{{ value }}</span>
        </div>
      </div>
    `,
  }),
}
