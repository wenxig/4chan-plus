<script setup lang="ts">
import { useAppStore } from '@/store'
import Thread from './tread.c.vue'
import { setup } from '@/helper'
const app = useAppStore()
setup()
</script>

<template>
  <Thread v-for="thread of app.threads" :thread="thread" />
</template>
