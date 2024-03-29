<script setup lang="ts">
import { setup } from '@/helper';
import { useAppStore } from '@/store';
setup()
const appData = useAppStore()
console.log(appData.threads)
</script>

<template>
  <div :id="`p${thread.id}`" :class="$route.hash.includes(`p${thread.id}`) && '!bg-opacity-75'"
    class="h-auto w-[90%] relative flex overflow-hidden rounded-lg mb-2 bg-white bg-opacity-35 p-3 shadow-lg transition-all hover:bg-opacity-80"
    v-for="thread of [appData.threads[0], ...appData.threads[0].reply]" :key="thread.date.getTime()">
    <div v-if="thread.cover_perview" class="w-[10%]">
      <NImage lazy :intersection-observer-options="{ root: $refs.boxDiv }" :src="thread.cover_perview"
        :preview-src="thread.cover" object-fit="contain" class="w-full h-auto"
        :img-props="{ class: 'w-full h-full' }" />
    </div>
    <div class="ml-1 flex h-full w-[65%] flex-col pl-3"
      :class="[!!thread.cover_perview ? 'w-[70%]' : ' ml-[5%] w-[95%]']">
      <div class="h-[10%] text-nowrap">
        <span class="h-full text-lg" v-html="thread.title"></span>
        <span class="ml-2 h-full !text-gray-600">{{ thread.from }}</span>
        <NTime class="ml-2 h-full !text-gray-600" :time="thread.date"></NTime>
      </div>
      <div v-html="thread.main" class="mt-3 max-w-full overflow-auto"></div>
    </div>
  </div>
</template>