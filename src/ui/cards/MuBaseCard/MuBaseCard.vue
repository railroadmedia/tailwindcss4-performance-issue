<template>
  <div class="base-card"><slot /></div>
</template>

<style>
@reference "@/style.css";

.base-card {
  @apply p-4 sm:p-6 bg-mu-1 rounded-none sm:rounded-lg;
}
</style>
