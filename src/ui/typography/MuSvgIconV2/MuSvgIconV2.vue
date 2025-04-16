<template>
  <IconComponent class="icon" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

interface Props {
  name: string
  variant?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'outline',
})

const IconComponent = defineAsyncComponent(() =>
  import(`@iconsv2/${props.variant}/${props.name}.svg`).catch(() => {
    console.error(`Failed to load icon: ${props.name}`)
    return import('@iconsv2/fallback.svg')
  })
)
</script>
