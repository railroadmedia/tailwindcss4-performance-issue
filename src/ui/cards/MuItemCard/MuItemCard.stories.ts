// ItemCard.stories.js

import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'
import { vueRouter } from 'storybook-vue3-router'
import MuItemCard from './MuItemCard.vue'

const meta: Meta<typeof MuItemCard> = {
  title: 'UI/Cards/MuItemCard',
  component: MuItemCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    size: {
      control: { type: 'select', options: ['small', 'big', 'responsive'] },
    },
    url: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof MuItemCard>

// Default ItemCard with all slots
export const Default: Story = {
  args: {
    title: 'Puppy Drumming',
    size: 'small',
    url: '/home',
  },
  render: (args) => ({
    components: { MuItemCard },
    setup() {
      return { args }
    },
    template: `
      <MuItemCard v-bind="args">
        <template #preview>
          <img src="https://picsum.photos/id/237/299/169" alt="Preview Image" />
        </template>
        <template #meta>
          <div>Intermediate • Video • Jane Doe</div>
        </template>
        <template #actions>
          <button class="btn" @click="onActionClick">X</button>
        </template>
      </MuItemCard>
    `,
    methods: {
      onActionClick: action('Button Clicked'),
    },
  }),
}

Default.decorators = [vueRouter()]

// ItemCard with only Preview slot
export const WithPreview: Story = {
  args: {
    title: 'Puppy Drumming',
    size: 'small',
    url: '/home',
  },
  render: (args) => ({
    components: { MuItemCard },
    setup() {
      return { args }
    },
    template: `
      <MuItemCard v-bind="args">
        <template #preview>
          <img src="https://picsum.photos/id/237/299/169" alt="Preview Image" />
        </template>
      </MuItemCard>
    `,
  }),
}

WithPreview.decorators = [vueRouter()]

// Big ItemCard with only Preview slot
export const BigWithPreview: Story = {
  args: {
    title: 'Big Puppy Drumming',
    size: 'big',
    url: '/home',
  },
  render: (args) => ({
    components: { MuItemCard },
    setup() {
      return { args }
    },
    template: `
      <MuItemCard v-bind="args">
        <template #preview>
          <img src="https://picsum.photos/id/237/299/169" alt="Preview Image" />
        </template>
      </MuItemCard>
    `,
  }),
}

BigWithPreview.decorators = [vueRouter()]

// ItemCard with only Meta slot
export const WithMeta: Story = {
  args: {
    title: 'Puppy Drumming',
    size: 'small',
    url: '/home',
  },
  render: (args) => ({
    components: { MuItemCard },
    setup() {
      return { args }
    },
    template: `
      <MuItemCard v-bind="args">
        <template #meta>
          <div>Beginner • Article • John Smith</div>
        </template>
      </MuItemCard>
    `,
  }),
}

WithMeta.decorators = [vueRouter()]

// ItemCard with only Actions slot
export const WithActions: Story = {
  args: {
    title: 'Puppy Drumming',
    size: 'small',
    url: '/home',
  },
  render: (args) => ({
    components: { MuItemCard },
    setup() {
      return { args }
    },
    template: `
      <MuItemCard v-bind="args">
        <template #actions>
          <button class="btn" @click="onActionClick">X</button>
        </template>
      </MuItemCard>
    `,
    methods: {
      onActionClick: action('Button Clicked'),
    },
  }),
}

WithActions.decorators = [vueRouter()]

// ItemCard with no slots provided
export const NoSlots: Story = {
  args: {
    title: 'Puppy Drumming',
    size: 'small',
    url: '/home',
  },
  render: (args) => ({
    components: { MuItemCard },
    setup() {
      return { args }
    },
    template: `<MuItemCard v-bind="args" />`,
  }),
}

NoSlots.decorators = [vueRouter()]
