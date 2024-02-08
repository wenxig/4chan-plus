<script setup lang='ts'>
import jQuery from 'jquery';
import { ref, watch } from 'vue';
jQuery(document.body).addClass('video')
const isShowTagbar = ref(false)
watch(isShowTagbar, () => jQuery('.div1').toggle())
const isOnSelectVideoPage = location.pathname.includes('index.php/vod/type/id')
if (isOnSelectVideoPage) {
  jQuery(document.body).addClass('select-video')
  try {
    jQuery(`.btnaaa111.on`).remove()
    jQuery(`.uzsrhm>button`)[0].id = 'searchButton'
    jQuery(`.srh button`)[0].id = 'searchButton2'
    jQuery(`.uzsrhm button`)[0].innerHTML = ''
    jQuery(`.wrap>p`)[0].id = 'showTagChoose'
  } catch { }
} else {
  jQuery(document.body).addClass('watch-video')
  let isHeader = true
  jQuery('.mymenu').each((_index, el) => {
    jQuery(el).addClass(isHeader ? 'header-menu' : 'fooder-menu')
    isHeader = false
  })
}
const is2StylePage = !!jQuery('.tagsuy')[0]
if (is2StylePage) {
  jQuery(document.body).addClass('video-style2')
}
if (location.pathname.includes('/vod/detail/id')) {
  jQuery('.mymenua a:nth-child(3)')[0].id = "change-video-line"
}
</script>

<template>
  <template v-if="isOnSelectVideoPage">
    <Teleport to="#showTagChoose" v-if="jQuery('#showTagChoose')[0]">
      <label>
        <input type="checkbox" v-model="isShowTagbar" />
      </label>
    </Teleport>
    <Teleport to="#searchButton" v-if="jQuery('#searchButton')[0]">
      <svg xmlns=" http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" viewBox="0 0 200 200"
        version="1.1">
        <g class="transform-group">
          <g transform="scale(0.1953125, 0.1953125)">
            <path
              d="M125.872291 465.670835c0-189.738365 153.796782-343.535147 343.535147-343.535147 189.738365 0 343.535147 153.797805 343.535147 343.535147 0 189.737342-153.796782 343.535147-343.535147 343.535147C279.669072 809.205982 125.872291 655.408177 125.872291 465.670835zM722.799542 779.406283l182.254927 182.204785 52.816926-52.832276L776.346085 727.201294c60.066027-70.406536 96.341209-161.732521 96.341209-261.530458 0-222.731804-180.549076-403.28088-403.28088-403.28088S66.126558 242.939031 66.126558 465.670835c0 222.730781 180.549076 403.289066 403.28088 403.289066C565.398676 868.958878 653.558551 835.409784 722.799542 779.406283z"
              fill="#fff" />
          </g>
        </g>
      </svg>
    </Teleport>
    <Teleport to="#searchButton2" v-if="jQuery('#searchButton2')[0]">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" viewBox="0 0 200 200"
        version="1.1">
        <g class="transform-group">
          <g transform="scale(0.1953125, 0.1953125)">
            <path
              d="M125.872291 465.670835c0-189.738365 153.796782-343.535147 343.535147-343.535147 189.738365 0 343.535147 153.797805 343.535147 343.535147 0 189.737342-153.796782 343.535147-343.535147 343.535147C279.669072 809.205982 125.872291 655.408177 125.872291 465.670835zM722.799542 779.406283l182.254927 182.204785 52.816926-52.832276L776.346085 727.201294c60.066027-70.406536 96.341209-161.732521 96.341209-261.530458 0-222.731804-180.549076-403.28088-403.28088-403.28088S66.126558 242.939031 66.126558 465.670835c0 222.730781 180.549076 403.289066 403.28088 403.289066C565.398676 868.958878 653.558551 835.409784 722.799542 779.406283z"
              fill="#fff" />
          </g>
        </g>
      </svg>
    </Teleport>
  </template>
</template>
<style lang='scss'>
@import url('@/styles/video/index.scss');
@import url('@/styles/video/phone.scss');
</style>