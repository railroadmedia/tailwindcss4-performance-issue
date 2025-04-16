import type { Meta, StoryObj } from '@storybook/vue3'
import MuThumbnail from './MuThumbnail.vue'
import { vueRouter } from 'storybook-vue3-router'

const meta: Meta<typeof MuThumbnail> = {
  title: 'UI/Cards/MuThumbnail',
  component: MuThumbnail,
  tags: ['autodocs'],
  argTypes: {
    imageWidth: {
      control: { type: 'number' },
      description: 'Width of the thumbnail image in pixels',
      defaultValue: 500,
    },
  },
  render: (args, { argTypes }) => ({
    components: { MuThumbnail },
    setup() {
      return { args }
    },
    template: '<div class="w-[240px]"><MuThumbnail v-bind="args" /></div>',
  }),
}

export default meta
type Story = StoryObj<typeof MuThumbnail>

// Basic Thumbnail with progress and pill
export const Default: Story = {
  args: {
    imgUrl: 'https://picsum.photos/id/237/299/169',
    pillText: '1:23',
    brand: 'drumeo',
    progress: 25,
    title: 'Alt Text Title',
    url: '/',
  },
}

Default.decorators = [vueRouter()]

// Thumbnail with no pill or progress
export const NoPillOrProgress: Story = {
  args: {
    imgUrl: 'https://picsum.photos/id/237/299/169',
    brand: 'drumeo',
    title: 'Alt Text Title',
    url: '/',
  },
}

NoPillOrProgress.decorators = [vueRouter()]

// Thumbnail with small modifier
export const SmallThumbnail: Story = {
  args: {
    imgUrl: 'https://picsum.photos/id/237/299/169',
    brand: 'drumeo',
    title: 'Alt Text Title',
    size: 'small',
    pillText: '1:23',
    url: '/',
  },
}

SmallThumbnail.decorators = [vueRouter()]

// Thumbnail with no progress and long pill
export const NoProgressAndLongPill: Story = {
  args: {
    imgUrl: 'https://picsum.photos/id/237/299/169',
    pillText: '5 Lessons',
    brand: 'drumeo',
    title: 'Alt Text Title',
    url: '/',
  },
}

NoProgressAndLongPill.decorators = [vueRouter()]

// Thumbnail with custom overlay slot
export const CustomOverlay: Story = {
  args: {
    imgUrl: 'https://picsum.photos/id/237/1080/720',
    pillText: 'Custom Overlay',
    brand: 'drumeo',
    title: 'Alt Text Title',
    url: '/',
  },
  render: (args, { argTypes }) => ({
    components: { MuThumbnail },
    setup() {
      return { args }
    },
    template: `
      <MuThumbnail v-bind="args">
        <template #overlay>
          <div style="color: white; font-size: 18px; text-align: center; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background-color: rgba(0, 0, 0, 0.5)">
            Custom Overlay Content
          </div>
        </template>
      </MuThumbnail>
    `,
  }),
}

CustomOverlay.decorators = [vueRouter()]

// Thumbnail with custom image width
export const CustomImageWidth: Story = {
  args: {
    imgUrl: 'https://picsum.photos/id/237/299/169',
    pillText: '1:23',
    brand: 'drumeo',
    progress: 25,
    title: 'Alt Text with Custom Width',
    url: '/',
    imageWidth: 800,
  },
}

CustomImageWidth.decorators = [vueRouter()]
