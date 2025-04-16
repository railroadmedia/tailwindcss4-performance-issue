import { ref, computed } from 'vue'
import { Meta, StoryFn } from '@storybook/vue3'
import MuSvgIconV2 from './MuSvgIconV2.vue'
import { icons } from './icons-list' // Import shared icons list

export default {
  title: 'Components/MuSvgIconV2',
  component: MuSvgIconV2,
  argTypes: {
    variant: { control: false },
  },
} as Meta<typeof MuSvgIconV2>

const Template: StoryFn<typeof MuSvgIconV2> = (args) => ({
  components: { MuSvgIconV2 },
  setup() {
    const searchQuery = ref('')

    const filteredIcons = computed(() => {
      return icons.filter((icon) => icon.includes(searchQuery.value.toLowerCase()))
    })

    return { args, searchQuery, filteredIcons }
  },
  template: `
    <div class="flex flex-col items-center gap-4 p-4">
      <h1 class="text-4xl font-bold">Stylesora 2.0 Icons</h1>
      <div class="flex w-full p-4">Dev Notes: Search icons by name as the group name starts in Figma. If a name seems odd, feel free to change it in the svg file names (both solid and outline) and also in the icons-list-js file next to this story file, because this entire library was generated using batch exporting and batch modification using node scripts.</div>
      <input 
        v-model="searchQuery" 
        placeholder="Search icons..." 
        class="p-2 w-72 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      />
      <div class="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-4 p-4 bg-white rounded-lg shadow-md">
        <div v-for="icon in filteredIcons" :key="icon" class="flex flex-col items-center text-center">
          <MuSvgIconV2 :name="icon" v-bind="args" class="w-12 h-12 text-gray-700 dark:text-gray-500" />
          <p class="text-xs text-gray-800 mt-1">{{ icon }}</p>
        </div>
      </div>
    </div>
  `,
})

export const SolidIcons = Template.bind({})
SolidIcons.args = {
  variant: 'solid',
}

export const OutlineIcons = Template.bind({})
OutlineIcons.args = {
  variant: 'outline',
}
