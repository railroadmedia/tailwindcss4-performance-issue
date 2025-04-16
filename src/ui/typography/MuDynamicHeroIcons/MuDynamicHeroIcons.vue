<template>
  <component :is="iconComponent" v-if="iconComponent" v-bind="attrs" />
  <div v-else>
    <span class="text-red">404</span>
  </div>
</template>

<script setup>
import { computed, useAttrs } from 'vue'
import * as solidIcons from '@heroicons/vue/24/solid'
import * as outlineIcons from '@heroicons/vue/24/outline'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  iconStyle: {
    type: String,
    default: 'outline',
    validator: (value) => ['solid', 'outline'].includes(value),
  },
})

const attrs = useAttrs()

const iconComponent = computed(() => {
  const icons = props.iconStyle === 'solid' ? solidIcons : outlineIcons
  return icons[`${props.name}Icon`] || null
})
</script>
