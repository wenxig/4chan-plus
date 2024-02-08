<script setup lang="ts">
import { GM_getValue, GM_setValue } from '$';
import { ref, watch } from 'vue';
import jQuery from 'jquery';
import Image from './page/image.vue';
import Video from './page/video.vue';
import Video2 from './page/video2.vue';
import { useDraggable } from '@vueuse/core';
const isLightTheme = ref<boolean>((GM_getValue('isLightTheme') ?? false))
watch(isLightTheme, val => {
  jQuery(document.body).toggleClass('light-mode', val)
  GM_setValue('isLightTheme', val)
}, { immediate: true })

const isOnVideoPage = location.pathname.includes('vod/type') || location.pathname.includes('adk.php') || location.pathname.includes('/kk-tt.php') || location.pathname.includes('/vod/detail/id') || location.pathname.includes('/kkkss.php') || location.pathname.includes('avb.php') || location.pathname.includes('/abbc.php')
const isOnVideoPage2 = isOnVideoPage ? false : !!jQuery('section>.items')[0]
const themeChanegButton = ref<HTMLElement | null>(null)
const { style } = useDraggable(themeChanegButton, {
  initialValue: { x: window.innerWidth - 10 - 50, y: window.innerHeight - 10 - 50 },
})
</script>

<template>
  <button :style="style" ref="themeChanegButton" type="button" class="theme-change" @click="isLightTheme = !isLightTheme">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" v-if="isLightTheme">
      <path fill="currentColor"
        d="M512 704a192 192 0 1 0 0-384 192 192 0 0 0 0 384m0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512m0-704a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 768a32 32 0 0 1 32 32v64a32 32 0 1 1-64 0v-64a32 32 0 0 1 32-32M195.2 195.2a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 1 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm543.104 543.104a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 0 1-45.248 45.248l-45.248-45.248a32 32 0 0 1 0-45.248M64 512a32 32 0 0 1 32-32h64a32 32 0 0 1 0 64H96a32 32 0 0 1-32-32m768 0a32 32 0 0 1 32-32h64a32 32 0 1 1 0 64h-64a32 32 0 0 1-32-32M195.2 828.8a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248L240.448 828.8a32 32 0 0 1-45.248 0zm543.104-543.104a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248l-45.248 45.248a32 32 0 0 1-45.248 0">
      </path>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" v-else>
      <path fill="currentColor"
        d="M240.448 240.448a384 384 0 1 0 559.424 525.696 448 448 0 0 1-542.016-542.08 390.592 390.592 0 0 0-17.408 16.384zm181.056 362.048a384 384 0 0 0 525.632 16.384A448 448 0 1 1 405.056 76.8a384 384 0 0 0 16.448 525.696">
      </path>
    </svg>
  </button>
  <Image v-if="!isOnVideoPage && !isOnVideoPage2" />
  <Video v-if="isOnVideoPage" />
  <Video2 v-if="isOnVideoPage2" />
</template>

