import { defineStore } from 'pinia'
import { map, isEmpty } from 'lodash-es'
let boardNav_nowGroup = 0

export const useAppStore = defineStore('app', () => {
  const boardNav = map(jQuery('#boardNavDesktop .boardList')[0].childNodes, (v) => {
    if (v instanceof HTMLElement) {
      return {
        text: v.innerText,
        link: (<any>v).href,
        type: 'link',
        group: NaN
      }
    }
    return {
      text: v.nodeValue!,
      type: 'text',
      group: NaN
    }
  })
    .map((v) => {
      if (!v.text) return
      if (v.text == '[Edit]') return
      if (v.text.replaceAll(' ', '') == '][') {
        boardNav_nowGroup++
        return
      }
      if (!(v.text.replaceAll(' ', '') == '[' || v.text.replaceAll(' ', '') == ']' || v.text.replaceAll(' ', '') == '/')) {
        v.group = boardNav_nowGroup
        v.text = v.text.replaceAll('/', '')
        return v
      }
    })
    .filter((v) => !isEmpty(v)) as {
    text: string
    link: string
    type: string
    group: number
  }[]

  const board = {
    coverSrc: jQuery(`.title.desktop img`).attr('src'),
    title: jQuery(`.boardBanner .boardTitle`).text()
  }
  const threads: Thread[] = map(jQuery('.thread'), ({ id }) => ({
    title: jQuery(`#${id} .subject`).html() || 'no-title',
    main: jQuery(`#${id} .postMessage`).html(),
    cover_perview: jQuery(`#${id} .fileThumb img`).attr('src') || '',
    cover: jQuery(`#${id} a.fileThumb`).attr('href'),
    isSticky: !!jQuery(`#${id} .stickyIcon`)[0],
    isClosed: !!jQuery(`#${id} .closedIcon`)[0],
    date: new Date(jQuery(`#${id} .dateTime`)[0].innerText.replace(/\s.*/g, '')),
    id: id.match(/\d+/g)![0],
    from: jQuery(jQuery(`#${id} .postInfo span.name`)[0]).text(),
    reply: map(jQuery(`#${id} .replyContainer`), ({ id }) => ({
      title: '',
      main: jQuery(`#${id} .postMessage`).html(),
      cover_perview: jQuery(`#${id} .fileThumb img`).attr('src') || '',
      cover: jQuery(`#${id} a.fileThumb`).attr('href'),
      isSticky: false,
      isClosed: false,
      date: new Date(jQuery(`#${id} .dateTime`)[0].innerText.replace(/\s.*/g, '')),
      id: id.match(/\d+/g)![0],
      from: jQuery(jQuery(`#${id} .postInfo span.name`)[0]).text(),
      reply: []
    } as Thread))
  }))
  return { boardNav, board, threads }
})
