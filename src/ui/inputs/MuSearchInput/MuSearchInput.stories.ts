// SearchInput.stories.js
import MuSearchInput from './MuSearchInput.vue' // adjust the path if needed

export default {
  title: 'UI/Inputs/MuSearchInput',
  component: MuSearchInput,
}

const Template = (args) => ({
  components: { MuSearchInput },
  setup() {
    return { args }
  },
  template: `<MuSearchInput v-bind="args" />`,
})

export const Default = Template.bind({})
Default.args = {
  brand: 'Drumeo',
}
