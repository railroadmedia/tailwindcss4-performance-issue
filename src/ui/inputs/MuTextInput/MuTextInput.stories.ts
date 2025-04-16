// TextInput.stories.js
import MuTextInput from './MuTextInput.vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

export default {
  title: 'UI/Inputs/MuTextInput',
  component: MuTextInput,
  argTypes: {
    onChange: { action: 'onChange' },
    onFocus: { action: 'onFocus' },
    onEnter: { action: 'onEnter' },
  },
}

// Base template without left icon slot
const Template = (args) => ({
  components: { MuTextInput },
  setup() {
    return { args }
  },
  template: `<MuTextInput v-bind="args" />`,
})

// Template that utilizes the leftIcon slot
const TemplateWithLeftIcon = (args) => ({
  components: { MuTextInput, MagnifyingGlassIcon },
  setup() {
    return { args }
  },
  template: `
    <MuTextInput v-bind="args" :showLeftIcon="true">
      <template #leftIcon>
        <MagnifyingGlassIcon class="h-5 w-5 text-mu-10" />
      </template>
    </MuTextInput>
  `,
})

export const Default = Template.bind({})
Default.args = {
  labelValue: 'Default Input',
  placeholder: 'Enter text...',
  initialValue: '',
  infoMessage: '',
  disabled: false,
  status: null,
  showLeftIcon: false,
}

export const WithLeftIcon = TemplateWithLeftIcon.bind({})
WithLeftIcon.args = {
  labelValue: 'Input with Left Icon',
  placeholder: 'Search...',
  initialValue: '',
  infoMessage: '',
  disabled: false,
  status: null,
}

export const WithError = Template.bind({})
WithError.args = {
  labelValue: 'Input with Error',
  placeholder: 'Enter text...',
  initialValue: '',
  infoMessage: '',
  disabled: false,
  status: 'error',
  showLeftIcon: false,
}

export const WithSuccess = Template.bind({})
WithSuccess.args = {
  labelValue: 'Input with Success',
  placeholder: 'Enter text...',
  initialValue: '',
  infoMessage: '',
  disabled: false,
  status: 'success',
  showLeftIcon: false,
}

export const WithInfoMessage = Template.bind({})
WithInfoMessage.args = {
  labelValue: 'Input with Info Message',
  placeholder: 'Enter text...',
  initialValue: '',
  infoMessage: 'This is an info message.',
  disabled: false,
  status: null,
  showLeftIcon: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
  labelValue: 'Disabled Input',
  placeholder: 'Cannot edit...',
  infoMessage: '',
  disabled: true,
  status: null,
  showLeftIcon: false,
}
