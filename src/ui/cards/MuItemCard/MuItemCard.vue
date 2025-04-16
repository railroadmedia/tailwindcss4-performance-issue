<template>
  <div :class="`item_card item_card--${size}`">
    <slot name="preview" />
    <div class="item_card__details">
      <div class="item_card__info">
        <RouterLink :to="url" class="item_card__title">{{ title }}</RouterLink>
        <div class="item_card__meta">
          <slot name="meta" />
        </div>
      </div>
      <div class="item_card__actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
const props = defineProps({
  title: String,
  size: {
    type: String,
    default: 'small',
    required: false,
  },
  url: String,
})
</script>

<style scoped>
@reference "@/style.css";

.item_card {
  @apply flex flex-col;
}

.item_card--small {
  @apply w-[299px];
}

.item_card--big {
  @apply w-[322px];
}

.item_card--responsive {
  @apply w-full flex-grow;
}

.item_card__details {
  @apply flex pt-2 justify-between;
}

.item_card__info {
  @apply flex flex-col;
}

.item_card__title {
  @apply text-sm font-bold leading-5 text-base-content mb-[6px];
}

.item_card__meta {
  @apply text-xs text-mu-7;
}
</style>
