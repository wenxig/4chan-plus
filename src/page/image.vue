<script setup lang='ts'>
import jQuery from 'jquery';
const isOnSelectImagePage = !(location.pathname.includes('/art/detail/id') || location.pathname.includes('/b/bd.php'))
jQuery(document.body).addClass('image')
if (isOnSelectImagePage) {
  jQuery('.lazy').each((_, e) => {
    const p = jQuery(e).parent()
    const src = jQuery(e).attr('data-original')
    const newIamge = new Image()
    newIamge.src = src!
    p.append(newIamge)
    jQuery(e).remove()
  })
  jQuery(document.body).addClass('select-image')
} else {
  jQuery(document.body).addClass('watch-image')
  let isHeader = true
  jQuery('.mymenu').each((_index, el) => {
    jQuery(el).addClass(isHeader ? 'header-menu' : 'fooder-menu')
    isHeader = false
  })
}
</script>

<template></template>

<style lang='scss'>
@import url('@/styles/img/index.scss');
@import url('@/styles/img/phone.scss');
</style>