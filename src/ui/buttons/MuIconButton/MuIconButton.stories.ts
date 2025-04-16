import type { Meta, StoryObj } from '@storybook/vue3'
import MuIconButton from './MuIconButton.vue'
import MuNotificationButton from '../MuNotificationButton/MuNotificationButton.vue'
import MuSearchButton from '../MuSearchButton/MuSearchButton.vue'
import MuHamburgerButton from '../MuHamburgerButton/MuHamburgerButton.vue'
import MuCloseButton from '../MuCloseButton/MuCloseButton.vue'

const meta: Meta<typeof MuIconButton> = {
  title: 'UI/Buttons/MuIconButton',
  component: MuIconButton,
  tags: ['autodocs'],
  argTypes: {
    iconName: { control: 'text' },
    label: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'responsive'],
    },
    iconClass: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Base icon button component used across the application for Utility buttons.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof MuIconButton>

// Base variants
export const Default: Story = {
  args: {
    iconName: 'search',
    label: 'Open Search',
  },
}

export const Small: Story = {
  args: {
    iconName: 'search',
    label: 'Open Search',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    iconName: 'search',
    label: 'Open Search',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    iconName: 'search',
    label: 'Open Search',
    size: 'lg',
  },
}

export const Responsive: Story = {
  args: {
    iconName: 'search',
    label: 'Open Search',
    size: 'responsive',
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: '<MuIconButton icon-name="search" label="Open Search" size="responsive" class="w-20! h-20!" />',
      },
    },
  },
  render: (args) => ({
    components: { MuIconButton },
    setup() {
      return { args }
    },
    template: '<MuIconButton v-bind="args" class="w-20! h-20!" />',
  }),
}

// Dedicated components
export const SearchButton: Story = {
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: '<MuSearchButton />',
      },
    },
  },
  render: () => ({
    components: { MuSearchButton },
    template: '<MuSearchButton />',
  }),
}

export const NotificationButtonWithIndicator: Story = {
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: '<MuNotificationButton :indicator="true" />',
      },
    },
  },
  render: () => ({
    components: { MuNotificationButton },
    template: '<MuNotificationButton :indicator="true" />',
  }),
}

export const NotificationButtonWithoutIndicator: Story = {
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: '<MuNotificationButton :indicator="false" />',
      },
    },
  },
  render: () => ({
    components: { MuNotificationButton },
    template: '<MuNotificationButton :indicator="false" />',
  }),
}

export const HamburgerButton: Story = {
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: '<MuHamburgerButton />',
      },
    },
  },
  render: () => ({
    components: { MuHamburgerButton },
    template: '<MuHamburgerButton />',
  }),
}
export const CloseButton: Story = {
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: '<MuCloseButton />',
      },
    },
  },
  render: () => ({
    components: { MuCloseButton },
    template: '<MuCloseButton />',
  }),
}

// Demonstration of all variants together
export const AllVariants: Story = {
  render: () => ({
    components: {
      MuSearchButton,
      MuNotificationButton,
      MuHamburgerButton,
      MuCloseButton,
    },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex gap-4 items-center">
          <span class="w-24">Search:</span>
          <MuSearchButton />
        </div>
        <div class="flex gap-4 items-center">
          <span class="w-24">Notification:</span>
          <MuNotificationButton :indicator="true" />
        </div>
        <div class="flex gap-4 items-center">
          <span class="w-24">Menu:</span>
          <MuHamburgerButton />
        </div>
        <div class="flex gap-4 items-center">
          <span class="w-24">Close:</span>
          <MuCloseButton />
        </div>
      </div>
    `,
  }),
}
