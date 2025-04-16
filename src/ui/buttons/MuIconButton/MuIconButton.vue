<template>
  <button
    class="icon-button"
    :class="[`icon-button--${size}`, `icon-button--${type}`]"
    @click="$emit('click')"
    :aria-label="label"
    type="button"
  >
    <slot />
    <slot name="icon" v-if="iconName">
      <SvgIcon :name="iconName" class="icon-button__icon" :class="iconClass" />
    </slot>
  </button>
</template>

<script setup lang="ts">
import SvgIcon from '@/ui/typography/MuSvgIcon/MuSvgIcon.vue'

interface Props {
  type?: 'ghost' | 'outline'
  iconName?: string
  label?: string
  size?: 'sm' | 'md' | 'lg' | 'responsive'
  iconClass?: string | object | Array<string | object>
}

withDefaults(defineProps<Props>(), {
  type: 'ghost',
  size: 'md',
  iconClass: 'w-7 h-7',
})

defineEmits(['click'])
</script>

<style>
@reference "@/style.css";

.icon-button {
  @apply btn btn-circle shadow-none;

  &.icon-button--ghost {
    @apply btn-ghost;

    --btn-border: #0000;
    --btn-color: var(--color-mu-1);
    --btn-fg: var(--color-mu-10);
  }

  &.icon-button--outline {
    @apply btn-outline;

    --btn-border: #000;
    --btn-color: var(--color-mu-10);
    --btn-fg: var(--color-mu-1);

    &:not(
        .btn-active,
        :hover,
        :active:focus,
        :focus-visible,
        :disabled,
        [disabled],
        .btn-disabled,
        :checked
      ) {
      --btn-bg: var(--color-mu-1);
    }
  }

  &.icon-button--sm {
    @apply btn-sm;
  }

  &.icon-button--md {
    @apply btn-md;
  }

  &.icon-button--lg {
    @apply btn-lg;
  }

  &.icon-button--responsive {
    @apply w-full h-full;
  }
}
</style>
