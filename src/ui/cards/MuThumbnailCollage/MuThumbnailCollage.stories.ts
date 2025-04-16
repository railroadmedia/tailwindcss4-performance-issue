import type { Meta, StoryObj } from '@storybook/vue3'
import MuThumbnailCollage from './MuThumbnailCollage.vue'

const meta: Meta<typeof MuThumbnailCollage> = {
  title: 'UI/Cards/MuThumbnailCollage',
  component: MuThumbnailCollage,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select', options: ['small', 'big', 'responsive'] },
      description: 'Size variant of the thumbnail',
    },
    itemCount: {
      control: 'number',
      description: 'Number of items in the playlist',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A thumbnail collage component for displaying up to 4 images in a grid format. Commonly used for playlists or collections. Shows a count overlay on the last image when itemCount is provided.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof MuThumbnailCollage>

const sampleImages = [
  'https://picsum.photos/seed/1/300/200',
  'https://picsum.photos/seed/2/300/200',
  'https://picsum.photos/seed/3/300/200',
  'https://picsum.photos/seed/4/300/200',
]

export const Default: Story = {
  args: {
    images: sampleImages,
    itemCount: 12,
  },
}

export const BigSize: Story = {
  args: {
    images: sampleImages,
    itemCount: 12,
    size: 'big',
  },
}

export const FewerImages: Story = {
  args: {
    images: sampleImages.slice(0, 2),
    itemCount: 2,
  },
}

export const ResponsiveSize: Story = {
  args: {
    images: sampleImages,
    itemCount: 12,
    size: 'responsive',
  },
}
