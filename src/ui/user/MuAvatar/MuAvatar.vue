<template>
  <div
    class="mu-avatar"
    :class="{
      'mu-avatar--online': online,
      'cursor-pointer': !!$attrs.onClick || !!$attrs.onclick || !!$attrs['onUpdate:click'],
    }"
  >
    <div class="rounded-full" :style="`width: ${size}`">
      <img :alt="alt" :src="imageUrl" />
    </div>

    <div v-if="$slots.badge" class="mu-avatar__badge-container">
      <slot name="badge"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  imageUrl: string
  size?: string
  online?: boolean
  alt?: string
}

withDefaults(defineProps<Props>(), {
  imageUrl: '',
  size: '100px',
  alt: 'avatar',
})
</script>

<style>
@reference "@/style.css";

.mu-avatar {
  --mu-online-color: #34c759;
  --mu-avatar-bage-outline-color: var(--color-mu-1);
  --mu-avatar-bage-outline-width: 2px;

  @apply avatar self-center relative;
}

.mu-avatar--online {
  @apply avatar-online;
  &:before {
    @apply top-auto bottom-0 right-0 w-[25%] h-[25%];
    @apply bg-[var(--mu-online-color)];
    outline: var(--mu-avatar-bage-outline-width) solid var(--mu-avatar-bage-outline-color);
  }
}

.mu-avatar__badge-container {
  @apply absolute bottom-0 right-0;
}
</style>
