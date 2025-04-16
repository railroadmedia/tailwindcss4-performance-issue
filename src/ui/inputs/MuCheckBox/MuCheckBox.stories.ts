import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'
import MuCheckBox from './MuCheckBox.vue'

const meta: Meta<typeof MuCheckBox> = {
  title: 'UI/Forms/MuCheckBox',
  component: MuCheckBox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'The checked state of the checkbox',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    name: {
      control: 'text',
      description: 'Input name attribute',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    'onUpdate:modelValue': {
      description: 'Event emitted when checkbox state changes',
      table: {
        category: 'events',
        type: { summary: 'boolean' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof MuCheckBox>

export const Default: Story = {
  args: {
    modelValue: false,
    label: 'Accept terms and conditions',
    name: 'terms',
  },
  render: (args) => ({
    components: { MuCheckBox },
    setup() {
      return { args }
    },
    template: `
      <MuCheckBox
        v-model="args.modelValue"
        :label="args.label"
        :name="args.name"
        @update:modelValue="onValueChange"
      />
    `,
    methods: {
      onValueChange: action('update:modelValue'),
    },
  }),
}

export const Checked: Story = {
  args: {
    ...Default.args,
    modelValue: true,
  },
}

export const LongLabel: Story = {
  args: {
    ...Default.args,
    label:
      'I agree to the terms and conditions of this website and confirm that I have read and understood the privacy policy and user agreement which govern my use of this service',
  },
}

// Example of multiple checkboxes in a group
export const CheckboxGroup: Story = {
  render: (args) => ({
    components: { MuCheckBox },
    setup() {
      return { args }
    },
    template: `
      <div class="flex flex-col gap-4">
        <MuCheckBox
          v-model="args.modelValue"
          label="Option 1"
          name="option1"
          @update:modelValue="onValueChange"
        />
        <MuCheckBox
          v-model="args.modelValue"
          label="Option 2"
          name="option2"
          @update:modelValue="onValueChange"
        />
        <MuCheckBox
          v-model="args.modelValue"
          label="Option 3"
          name="option3"
          @update:modelValue="onValueChange"
        />
      </div>
    `,
    methods: {
      onValueChange: action('update:modelValue'),
    },
  }),
}
