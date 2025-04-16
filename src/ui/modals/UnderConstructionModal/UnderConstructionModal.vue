<template>
  <dialog class="base-modal modal-open">
    <div class="bg-mu-3 w-full h-full flex justify-center items-center relative overflow-y-scroll">
      <MuCloseButton
        class="absolute right-4 lg:right-8 xl:right-10 top-4 lg:top-8 xl:top-10"
        @click="handleClose"
      />

      <div class="flex flex-col lg:flex-row items-center w-full p-4 lg:p-16 2xl:p-32">
        <div class="text-7xl lg:hidden h-32 flex items-end">🚧</div>
        <div class="lg:flex-1 my-6 lg:my-0 w-full max-w-[600px] lg:max-w-none">
          <img class="w-full" src="../../../assets/iconsv2/under_construction.gif" />
        </div>
        <div class="lg:flex-1 lg:order-first text-center lg:text-left">
          <div class="text-7xl hidden lg:block">🚧</div>
          <div class="lg:mt-10 text-4xl lg:text-5xl xl:text-6xl font-extrabold">
            Under Construction
          </div>
          <div class="mb-6 lg:mb-10 text-sm">
            🐴 Whoa! We're building something awesome here. Check back later!
          </div>
          <MuButton type="primary" class="mx-auto lg:mx-0" @click="handleClose">Go back</MuButton>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import MuCloseButton from '@ui/buttons/MuCloseButton/MuCloseButton.vue'
import MuButton from '@ui/buttons/MuButton/MuButton.vue'
import { useModal } from '@/application/composables/useModalManager'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const { hide } = useModal()

const handleClose = () => {
  hide()
}
</script>

<style>
@reference "@/style.css";

.base-modal {
  @apply modal modal-bottom sm:modal-middle;
}

html {
  scrollbar-gutter: auto !important;
}
</style>
