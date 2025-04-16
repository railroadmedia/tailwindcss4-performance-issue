<template>
  <button
    type="button"
    class="mu-pill"
    :class="{
      'mu-pill--selected': selected,
      'mu-pill--disabled': disabled,
    }"
    @click="$emit('select')"
    :disabled="disabled"
    :aria-pressed="selected"
    role="tab"
  >
    <span class="mu-pill__content">
      <MuSvgIconV2 v-if="icon" :name="icon" class="mu-pill__icon" />
      <span class="mu-pill__label">
        {{ label }}
      </span>
    </span>
  </button>
</template>

<script setup lang="ts">
import MuSvgIconV2 from '@/ui/typography/MuSvgIconV2/MuSvgIconV2.vue'

interface Props {
  label: string
  icon?: string
  selected?: boolean
  disabled?: boolean
}

const props = defineProps<Props>()

defineEmits<{
  select: []
}>()
</script>

<style>
@reference "@/style.css";

.mu-pill {
  @apply btn btn-outline rounded-full shadow-none font-normal;

  --btn-border: var(--color-mu-10);
  --btn-color: var(--color-mu-10);
  --btn-fg: var(--color-mu-10);
  --btn-bg: var(--color-mu-1);

  &:hover {
    --btn-bg: var(--color-mu-1);
  }

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
    --btn-border: var(--color-mu-6);
  }

  &.mu-pill--selected {
    --btn-border: var(--color-mu-10);
    --btn-fg: var(--color-mu-1);
    --btn-bg: var(--color-mu-10);

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
      --btn-bg: var(--color-mu-10);
      --btn-fg: var(--color-mu-1);
      --btn-border: var(--color-mu-10);
    }
  }
}

.mu-pill--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.mu-pill__content {
  @apply flex items-center gap-2;
}

.mu-pill__icon {
  @apply w-5 h-5;
}

.mu-pill__label {
  @apply text-xs;
}
</style>
