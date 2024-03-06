<script setup lang="ts">
import { ref } from 'vue'
import { onLongPress } from '@vueuse/core'
import { setup } from '@/helper';
setup()

const htmlRefHook = ref<HTMLElement >(null)
const longPressedHook = ref(false)

const onLongPressCallbackHook = (e: PointerEvent) => {
  longPressedHook.value = true
}
const resetHook = () => {
  longPressedHook.value = false
}
const alert = window.alert

onLongPress(
  htmlRefHook,
  onLongPressCallbackHook,
  { modifiers: { prevent: true }, delay: 5000 }
)
onLongPress(
  htmlRefHook,
  () => alert(),
  { modifiers: { prevent: true }, delay: 100 }
)
</script>

<template>
  <p>Long Pressed: {{ longPressedHook }}</p>

  <button ref="htmlRefHook" class="ml-2 button small" @click="alert">
    Press long
  </button>

  <button class="ml-2 button small" @click="resetHook">
    Reset
  </button>
</template>