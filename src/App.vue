<script setup lang="ts">
import { useAppStore } from '@/store';
import { useScroll } from '@vueuse/core';
import { groupBy } from 'lodash-es';
import { zhCN as nZhCn, dateZhCN as nDateZhCN } from 'naive-ui'
const app = useAppStore()

const { y } = useScroll(document)

const goto = (v: string) => window.location.href = v

</script>

<template>
  <img class="pointer-events-none fixed top-0 left-0 w-full h-full object-cover z-[-1]"
    src="@/assets/background.jpg?inline">
  <header
    class="w-full h-[60px] z-50 flex bg-white items-center fixed left-0 top-0 duration-[0.5s] transition-colors border-[--i-border-color]  border-[0px] border-b border-solid"
    :class="y <= 5 && '!border-none bg-opacity-0'">
    <div class="text-xl ml-3">{{ app.board.title }}</div>
    <div x-scrollableiv class="absolute right-0 h-full flex items-center max-w-[50%] overflow-x-auto flex-nowrap">
      <div v-for="group of groupBy(app.boardNav, 'group')"
        class="flex bg-gray-300 rounded-lg bg-opacity-30 h-[90%] mr-1">
        <button v-for="total of group" @click="goto(total.link)"
          class="border-none bg-white bg-opacity-0 text-lg h-full px-3 transition-colors first:rounded-l-lg last:rounded-r-lg hover:bg-opacity-50 flex justify-center items-center active:bg-gray-300 active:bg-opacity-30">{{ total.text }}</button>
      </div>
    </div>
  </header>
  <n-config-provider :locale="nZhCn" :date-locale="nDateZhCN" class="w-full min-h-full">
    <main class="min-h-[100vh] w-full bg-white bg-opacity-55 py-[90px] pl-[5%]">
      <RouterView />
    </main>
  </n-config-provider>
</template>
