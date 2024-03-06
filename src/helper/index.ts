export function setup() {
  jQuery(() => {
    jQuery(`body>*`).each((_, el) => {
      if (jQuery(el).data('v-app') != '') {
        jQuery(el).remove()
      }
    })
    jQuery(document.body).attr('class', '')
  })
}