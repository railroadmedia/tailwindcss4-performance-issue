<template>
  <div class="form-field">
    <label v-if="label" class="form-field__label">
      <span class="label-text">{{ $t(label) }}</span>
      <span v-if="required" class="text-error">*</span>
    </label>

    <!-- Main field content -->
    <div class="form-field__content">
      <slot />
    </div>

    <!-- Error message -->
    <div v-if="error" class="form-field__error">
      {{ error }}
    </div>

    <!-- Help text / Description -->
    <div v-if="description" class="form-field__description">
      {{ description }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  error?: string
  description?: string
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  label: '',
  error: '',
  description: '',
  required: false,
})
</script>

<style scoped>
@reference "@/style.css";

.form-field {
  @apply flex flex-col gap-2;
}

.form-field__label {
  @apply flex gap-1 text-sm font-medium text-base-content;
}

.form-field__error {
  @apply text-sm text-error;
}

.form-field__description {
  @apply text-sm text-base-content/70;
}
</style>
