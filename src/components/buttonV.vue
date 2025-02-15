<script setup lang="ts">
import { withDefaults, computed } from 'vue'
interface Props {
  title?: string,
  modifer?: string,
  outline?: boolean,
  block?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  title: 'click me',
  modifer: 'btn-primary',
  outline: false,
  block: false
})
const btnClass = computed(() => (props.modifer))
</script>
<template>

  <button class="btn" :class="[block ? 'btn-block' : '', outline ? 'btn-outline' : '', btnClass]">{{ title }}
  </button>
</template>