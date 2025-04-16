import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'
import RadioButton from './MuRadioButton.vue'

const meta: Meta<typeof RadioButton> = {
  title: 'UI/Forms/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The selected value',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '' },
      },
    },
    value: {
      control: 'text',
      description: 'Value for this radio option',
      table: {
        type: { summary: 'string | number' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text for the radio button',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      control: 'text',
      description: 'Input name attribute for radio group',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'radio-button' },
      },
    },
    'update:modelValue': {
      description: 'Event emitted when selection changes',
      table: {
        category: 'events',
        type: { summary: 'string | number' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof RadioButton>

// Single Radio Button
export const Default: Story = {
  args: {
    modelValue: '',
    value: 'option1',
    label: 'Radio Option',
    name: 'demo-radio',
  },
  render: (args) => ({
    components: { RadioButton },
    setup() {
      return { args }
    },
    template: `
      <RadioButton
        v-model="args.modelValue"
        :value="args.value"
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

// Selected Radio Button
export const Selected: Story = {
  args: {
    ...Default.args,
    modelValue: 'option1',
  },
}

// Radio Button Group Example
export const RadioGroup: Story = {
  render: () => ({
    components: { RadioButton },
    setup() {
      const options = [
        { label: 'Sort by Date', value: 'date' },
        { label: 'Sort by Name', value: 'name' },
        { label: 'Sort by Price', value: 'price' },
      ]

      return { options }
    },
    template: `
      <div class="flex flex-col gap-2">
        <RadioButton
          v-for="option in options"
          :key="option.value"
          v-model="selectedValue"
          :value="option.value"
          :label="option.label"
          name="sorting"
          @update:modelValue="onValueChange"
        />
      </div>
    `,
    data() {
      return {
        selectedValue: 'date',
      }
    },
    methods: {
      onValueChange: action('update:modelValue'),
    },
  }),
}

// Numeric Values Example
export const NumericValues: Story = {
  render: () => ({
    components: { RadioButton },
    setup() {
      const options = [
        { label: '10 items per page', value: 10 },
        { label: '20 items per page', value: 20 },
        { label: '50 items per page', value: 50 },
      ]

      return { options }
    },
    template: `
      <div class="flex flex-col gap-2">
        <RadioButton
          v-for="option in options"
          :key="option.value"
          v-model="selectedValue"
          :value="option.value"
          :label="option.label"
          name="pagination"
          @update:modelValue="onValueChange"
        />
      </div>
    `,
    data() {
      return {
        selectedValue: 10,
      }
    },
    methods: {
      onValueChange: action('update:modelValue'),
    },
  }),
}

// Long Label Example
export const LongLabel: Story = {
  args: {
    ...Default.args,
    label:
      'This is a very long label that demonstrates how the radio button handles wrapped text and maintains proper alignment with multiple lines of content',
  },
}
