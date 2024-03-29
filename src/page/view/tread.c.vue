<script setup lang="tsx">
import { computed, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const $props = defineProps<{
  thread: Thread
}>()
const goto = (v: string) => (window.location.href = v)
const $route = useRoute()

const isFocus = ref(false)

let timeOut = NaN
let isClick = false
function goTouchStart(payload: TouchEvent | MouseEvent) {
  isClick = true
  clearTimeout(timeOut)
  timeOut = !jQuery(payload.target!).is('img')
    ? setTimeout(function () {
      isFocus.value = true
      isClick = false
    }, 500)
    : NaN
}
function goTouchEnd(payload: TouchEvent | MouseEvent) {
  clearTimeout(timeOut)
  if (isClick && !jQuery(payload.target!).is('img') && isFocus.value == false) goto(`/${$route.params.name}/thread/${$props.thread.id}`)
}
function goTouchMove() {
  clearTimeout(timeOut)
  isClick = false
}
onUnmounted(() => clearTimeout(timeOut))

const boxDiv = ref<HTMLDivElement>()
const styleOfDiv = computed(() => ({
  left: `${isFocus.value ? boxDiv.value?.getBoundingClientRect().left : 0}px`,
  top: `${isFocus.value ? boxDiv.value?.getBoundingClientRect().top : 0}px`
}))
</script>

<template>
  <div class="fixed left-0 top-0 z-[55] h-full w-full bg-black bg-opacity-30" @click="isFocus = false" v-if="isFocus"
    ref="boxDiv">
  </div>
  <div class="relative mb-5 h-[150px] w-[60%] p-3">
    <div @mousedown="goTouchStart" @touchstart="goTouchStart" @mousemove="goTouchMove" @touchmove="goTouchMove"
      @touchend="goTouchEnd" @mouseup="goTouchEnd"
      class="relative flex h-full w-full overflow-hidden rounded-lg bg-white bg-opacity-35 p-3 shadow-lg transition-all hover:bg-opacity-80"
      :class="isFocus && '!fixed !left-[5vw] !top-[5vh] z-[60] !h-[90vh] !w-[90vw] overflow-hidden !bg-opacity-90 backdrop-blur-sm'"
      :style="styleOfDiv">
      <div class="h-full w-[30%] flex-1"
        :class="[isFocus && 'w-[15%]', !!thread.cover_perview ? 'w-[30%]' : ' ml-[5%] w-[95%]']">
        <NImage lazy :intersection-observer-options="{ root: boxDiv }" :src="thread.cover_perview"
          v-if="thread.cover_perview" :preview-src="thread.cover" object-fit="contain" class="w-full"
          :img-props="{ class: 'w-full' }" :class="isFocus ? 'h-[30%]' : ' h-full'" />
        <div v-if="isFocus" class="mt-1 h-[70%] w-full">
          <div v-for="reply of thread.reply" class="flex h-20 w-3/4 rounded-lg bg-white bg-opacity-35 p-3 shadow-lg">
            <template v-if="reply.id">
              <!-- reply begin -->
              <NImage v-if="reply.cover_perview"
                :src="reply.cover_perview" :preview-src="reply.cover" object-fit="contain" class="w-[30%]"
                :img-props="{ class: 'w-full' }" />
              <div class="flex h-full w-[70%] flex-col pl-3"
                :class="[!!reply.cover_perview ? 'w-[70%]' : ' ml-[5%] w-[95%]']">
                <div class="h-[10%]">
                  <span class="h-full text-lg" v-html="reply.title"></span>
                  <span class="ml-2 h-full !text-gray-600">{{ reply.from }}</span>
                  <NTime class="ml-2 h-full !text-gray-600" :time="reply.date"></NTime>
                </div>
                <n-performant-ellipsis v-html="reply.main" class="mt-[5%] h-[85%] max-w-full"> </n-performant-ellipsis>
              </div>
              <!-- reply end -->
            </template>
          </div>
        </div>
      </div>
      <div class="ml-1 flex h-full w-[65%] flex-col pl-3"
        :class="[!!thread.cover_perview ? 'w-[70%]' : ' ml-[5%] w-[95%]', isFocus && '!w-[85%]']">
        <div class="h-[10%] text-nowrap">
          <span class="h-full text-lg" v-html="thread.title"></span>
          <span class="ml-2 h-full !text-gray-600">{{ thread.from }}</span>
          <NTime class="ml-2 h-full !text-gray-600" :time="thread.date"></NTime>
        </div>
        <n-performant-ellipsis v-html="thread.main" class="mt-[5%] h-[85%] max-w-full" v-if="!isFocus"></n-performant-ellipsis>
        <div v-else v-html="thread.main" class="mt-[0%] h-[85%] max-w-full overflow-auto"></div>
      </div>
      <div class="absolute right-3 flex">
        <NIcon size="20" v-if="thread.isClosed">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <path fill="currentColor"
              d="M224 448a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V480a32 32 0 0 0-32-32zm0-64h576a96 96 0 0 1 96 96v384a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V480a96 96 0 0 1 96-96">
            </path>
            <path fill="currentColor"
              d="M512 544a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V576a32 32 0 0 1 32-32m192-160v-64a192 192 0 1 0-384 0v64zM512 64a256 256 0 0 1 256 256v128H256V320A256 256 0 0 1 512 64">
            </path>
          </svg>
        </NIcon>
        <NIcon size="20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" v-if="thread.isSticky">
            <path fill="currentColor"
              d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384m0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512"></path>
            <path fill="currentColor" d="M512 512a32 32 0 0 1 32 32v256a32 32 0 1 1-64 0V544a32 32 0 0 1 32-32"></path>
            <path fill="currentColor"
              d="M384 649.088v64.96C269.76 732.352 192 771.904 192 800c0 37.696 139.904 96 320 96s320-58.304 320-96c0-28.16-77.76-67.648-192-85.952v-64.96C789.12 671.04 896 730.368 896 800c0 88.32-171.904 160-384 160s-384-71.68-384-160c0-69.696 106.88-128.96 256-150.912">
            </path>
          </svg>
        </NIcon>
      </div>
    </div>
  </div>
</template>
