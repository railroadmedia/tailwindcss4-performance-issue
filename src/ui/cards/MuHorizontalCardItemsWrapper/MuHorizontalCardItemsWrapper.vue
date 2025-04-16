<template>
  <div class="horizontal-card-items-wrapper">
    <header v-if="$slots.title" class="horizontal-card-items-wrapper__header">
      <h2 v-if="$slots.title" class="horizontal-card-items-wrapper__title">
        <slot name="title" />
      </h2>
      <slot name="actions" />
    </header>
    <section
      class="horizontal-card-items-wrapper__content"
      :class="{ 'has-header': $slots.title || $slots.actions }"
    >
      <slot />
    </section>
  </div>
</template>

<style scoped>
@reference "@/style.css";

.horizontal-card-items-wrapper {
  @apply flex flex-col self-start;
}

.horizontal-card-items-wrapper__content {
  @apply flex flex-col gap-4;
}

.horizontal-card-items-wrapper__content.has-header {
  @apply mt-4;
}

.horizontal-card-items-wrapper__header {
  @apply flex justify-between items-center h-12 w-full;
}

.horizontal-card-items-wrapper__title {
  @apply text-mu-10 text-xl font-extrabold;
}
</style>
