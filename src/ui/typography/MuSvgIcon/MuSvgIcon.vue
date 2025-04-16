<template>
  <IconComponent class="icon" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

interface Props {
  name: string
}

const props = defineProps<Props>()

const IconComponent = defineAsyncComponent(() =>
  import(`@icons/${props.name}.svg`).catch(() => {
    console.error(`Failed to load icon: ${props.name}`)
    return import('@icons/fallback.svg')
  })
)
</script>
