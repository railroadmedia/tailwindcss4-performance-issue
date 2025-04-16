<template>
  <div :class="['item_card_horizontal', `item_card_horizontal--${size}`]">
    <div class="item_card_horizontal__preview">
      <slot name="preview" />
    </div>
    <div class="item_card_horizontal__content">
      <slot v-if="slots.content" name="content" />
      <template v-else>
        <component :is="url ? RouterLink : 'div'" :to="url" class="item_card_horizontal__info">
          <span class="item_card_horizontal__title">
            {{ title }}
          </span>
          <div class="item_card_horizontal__meta">
            <slot name="meta" />
          </div>
        </component>
      </template>
      <div class="item_card_horizontal__actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSlots } from 'vue'

const slots = useSlots()

type CardSize = 'sm' | 'md' | 'lg'

interface Props {
  title: string
  url?: string
  size?: CardSize
}

withDefaults(defineProps<Props>(), {
  size: 'md',
})
</script>

<style scoped>
@reference "@/style.css";

.item_card_horizontal {
  @apply flex items-center gap-3 w-full transition-colors;
}

.item_card_horizontal__preview {
  @apply min-w-25 shrink-0;
}

/* Small size */
.item_card_horizontal--sm .item_card_horizontal__title {
  @apply text-sm;
}

.item_card_horizontal--sm .item_card_horizontal__meta {
  @apply text-xs;
}

/* Medium size (default) */
.item_card_horizontal--md .item_card_horizontal__title {
  @apply text-base;
}

.item_card_horizontal--md .item_card_horizontal__meta {
  @apply text-sm;
}

/* Large size */
.item_card_horizontal--lg .item_card_horizontal__title {
  @apply text-lg;
}

.item_card_horizontal--lg .item_card_horizontal__meta {
  @apply text-base;
}

/* Common styles */
.item_card_horizontal__content {
  @apply flex justify-between items-center flex-grow min-w-0;
}

.item_card_horizontal__info {
  @apply flex flex-col min-w-0;
}

.item_card_horizontal__title {
  @apply font-bold text-base-content truncate;
}

.item_card_horizontal__meta {
  @apply text-mu-9;
}

.item_card_horizontal__actions {
  @apply flex-shrink-0;
}
</style>
