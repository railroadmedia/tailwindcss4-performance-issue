import type { Meta, StoryObj } from '@storybook/vue3'
import MuHorizontalCardItemsWrapper from './MuHorizontalCardItemsWrapper.vue'
import MuItemCardHorizontal from '@/ui/cards/MuItemCardHorizontal/MuItemCardHorizontal.vue'
import { vueRouter } from 'storybook-vue3-router'
import { h } from 'vue'

// Define a simple placeholder component
const PlaceholderComponent = {
  setup() {
    return () =>
      h('div', { class: 'flex flex-col items-center justify-center py-12' }, [
        h('div', { class: 'text-xl font-extrabold text-mu-10' }, 'Start playing!'),
        h(
          'p',
          { class: 'text-sm w-60 pt-2 text-center text-mu-9' },
          'All recently started or completed lessons and songs will show here!'
        ),
      ])
  },
}

// Define routes for the mock router
const routes = [
  { path: '/lessons/pentatonic-scale', name: 'pentatonic-scale', component: {} },
  { path: '/lessons/chord-progressions', name: 'chord-progressions', component: {} },
  { path: '/lessons/drum-rudiments', name: 'drum-rudiments', component: {} },
  { path: '/tips/warm-up', name: 'warm-up', component: {} },
  { path: '/tips/practice', name: 'practice', component: {} },
  { path: '/courses/guitar-mastery', name: 'guitar-mastery', component: {} },
  { path: '/courses/piano-fundamentals', name: 'piano-fundamentals', component: {} },
]

const meta = {
  title: 'UI/Sections/MuHorizontalCardItemsWrapper',
  component: MuHorizontalCardItemsWrapper,
  tags: ['autodocs'],
} satisfies Meta<typeof MuHorizontalCardItemsWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { MuHorizontalCardItemsWrapper, MuItemCardHorizontal },
    setup() {
      return { args }
    },
    template: `
      <MuHorizontalCardItemsWrapper v-bind="args">
        <template #title>Recent Lessons</template>
        <template #actions>
          <button class="text-mu-6 hover:text-mu-7">See All</button>
        </template>
        <div class="flex flex-col gap-4">
          <MuItemCardHorizontal
            title="How to Play the Pentatonic Scale"
            url="/lessons/pentatonic-scale"
            size="md"
          >
            <template #preview>
              <div class="w-24 h-24 bg-mu-3 rounded-lg"></div>
            </template>
            <template #meta>
              <span>Guitar • 15 min</span>
            </template>
            <template #actions>
              <button class="text-mu-6 hover:text-mu-7">Continue</button>
            </template>
          </MuItemCardHorizontal>

          <MuItemCardHorizontal
            title="Advanced Chord Progressions"
            url="/lessons/chord-progressions"
            size="md"
          >
            <template #preview>
              <div class="w-24 h-24 bg-mu-3 rounded-lg"></div>
            </template>
            <template #meta>
              <span>Piano • 20 min</span>
            </template>
            <template #actions>
              <button class="text-mu-6 hover:text-mu-7">Start</button>
            </template>
          </MuItemCardHorizontal>

          <MuItemCardHorizontal
            title="Drum Rudiments Masterclass"
            url="/lessons/drum-rudiments"
            size="md"
          >
            <template #preview>
              <div class="w-24 h-24 bg-mu-3 rounded-lg"></div>
            </template>
            <template #meta>
              <span>Drums • 25 min</span>
            </template>
            <template #actions>
              <button class="text-mu-6 hover:text-mu-7">Continue</button>
            </template>
          </MuItemCardHorizontal>
        </div>
      </MuHorizontalCardItemsWrapper>
    `,
  }),
}

Default.decorators = [vueRouter(routes)]

export const SmallCards: Story = {
  render: (args) => ({
    components: { MuHorizontalCardItemsWrapper, MuItemCardHorizontal },
    setup() {
      return { args }
    },
    template: `
      <MuHorizontalCardItemsWrapper v-bind="args">
        <template #title>Quick Tips</template>
        <template #actions>
          <button class="text-mu-6 hover:text-mu-7">See All</button>
        </template>
        <div class="flex flex-col gap-3">
          <MuItemCardHorizontal
            title="Warm-up Exercises"
            url="/tips/warm-up"
            size="sm"
          >
            <template #preview>
              <div class="w-16 h-16 bg-mu-3 rounded-lg"></div>
            </template>
            <template #meta>
              <span>5 min read</span>
            </template>
          </MuItemCardHorizontal>

          <MuItemCardHorizontal
            title="Practice Schedule"
            url="/tips/practice"
            size="sm"
          >
            <template #preview>
              <div class="w-16 h-16 bg-mu-3 rounded-lg"></div>
            </template>
            <template #meta>
              <span>3 min read</span>
            </template>
          </MuItemCardHorizontal>
        </div>
      </MuHorizontalCardItemsWrapper>
    `,
  }),
}

SmallCards.decorators = [vueRouter(routes)]

export const LargeCards: Story = {
  render: (args) => ({
    components: { MuHorizontalCardItemsWrapper, MuItemCardHorizontal },
    setup() {
      return { args }
    },
    template: `
      <MuHorizontalCardItemsWrapper v-bind="args">
        <template #title>Featured Courses</template>
        <template #actions>
          <button class="text-mu-6 hover:text-mu-7">See All</button>
        </template>
        <div class="flex flex-col gap-6">
          <MuItemCardHorizontal
            title="Complete Guitar Mastery"
            url="/courses/guitar-mastery"
            size="lg"
          >
            <template #preview>
              <div class="w-32 h-32 bg-mu-3 rounded-lg"></div>
            </template>
            <template #meta>
              <span>12 lessons • 4 hours</span>
            </template>
            <template #actions>
              <button class="text-mu-6 hover:text-mu-7">Enroll Now</button>
            </template>
          </MuItemCardHorizontal>

          <MuItemCardHorizontal
            title="Piano Fundamentals"
            url="/courses/piano-fundamentals"
            size="lg"
          >
            <template #preview>
              <div class="w-32 h-32 bg-mu-3 rounded-lg"></div>
            </template>
            <template #meta>
              <span>8 lessons • 3 hours</span>
            </template>
            <template #actions>
              <button class="text-mu-6 hover:text-mu-7">Enroll Now</button>
            </template>
          </MuItemCardHorizontal>
        </div>
      </MuHorizontalCardItemsWrapper>
    `,
  }),
}

LargeCards.decorators = [vueRouter(routes)]

export const LoadingPlaceholders: Story = {
  render: (args) => ({
    components: { MuHorizontalCardItemsWrapper, MuItemCardHorizontal },
    setup() {
      return { args }
    },
    template: `
      <MuHorizontalCardItemsWrapper v-bind="args">
        <template #title>Recent Lessons</template>
        <template #actions>
          <button class="text-mu-6 hover:text-mu-7">See All</button>
        </template>
        <div class="flex flex-col gap-4">
          <MuItemCardHorizontal
            title="Loading Lesson..."
            size="md"
          >
            <template #preview>
              <div class="w-24 h-24 bg-mu-3 rounded-lg animate-pulse"></div>
            </template>
            <template #meta>
              <span class="animate-pulse">Loading...</span>
            </template>
            <template #actions>
              <span class="text-mu-6 animate-pulse">Loading...</span>
            </template>
          </MuItemCardHorizontal>

          <MuItemCardHorizontal
            title="Loading Lesson..."
            size="md"
          >
            <template #preview>
              <div class="w-24 h-24 bg-mu-3 rounded-lg animate-pulse"></div>
            </template>
            <template #meta>
              <span class="animate-pulse">Loading...</span>
            </template>
            <template #actions>
              <span class="text-mu-6 animate-pulse">Loading...</span>
            </template>
          </MuItemCardHorizontal>
        </div>
      </MuHorizontalCardItemsWrapper>
    `,
  }),
}

LoadingPlaceholders.decorators = [vueRouter(routes)]

export const EmptyWithPlaceholder: Story = {
  render: (args) => ({
    components: { MuHorizontalCardItemsWrapper, PlaceholderComponent },
    setup() {
      return { args }
    },
    template: `
      <MuHorizontalCardItemsWrapper v-bind="args">
        <PlaceholderComponent />
      </MuHorizontalCardItemsWrapper>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Shows a placeholder when there are no items to display, without title or actions header',
      },
    },
  },
}

EmptyWithPlaceholder.decorators = [vueRouter(routes)]
