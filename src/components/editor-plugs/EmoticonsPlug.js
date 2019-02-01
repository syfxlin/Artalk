import $ from 'jquery'
import './EmoticonsPlug.scss'

export default class EmoticonsPlug {
  constructor (editor) {
    this.editor = editor
    this.artalk = editor.artalk

    this.emoticons = this.artalk.opts.emoticons
    this.initElem()
  }

  initElem () {
    this.elem = $(require('./EmoticonsPlug.ejs')(this))

    this.listWrapElem = this.elem.find('.artalk-emoticons-list-wrap')
    this.typesElem = this.elem.find('.artalk-emoticons-types')

    // 绑定切换类型按钮
    this.typesElem.find('span').click((evt) => {
      let btnElem = $(evt.currentTarget)
      let key = btnElem.attr('data-key')
      this.openType(key)
    })

    // 默认打开第一个类型
    this.openType(Object.keys(this.emoticons)[0])

    // 绑定点击表情
    this.listWrapElem.find('.artalk-emoticons-item').click((evt) => {
      let elem = $(evt.currentTarget)
      let inputType = elem.parents('.artalk-emoticons-list').attr('data-input-type')

      let title = elem.attr('title')
      let content = elem.attr('data-content')
      if (inputType === 'image') {
        this.editor.addContent(`![${title}](${content})`)
      } else {
        this.editor.addContent(content)
      }
    })
  }

  openType (key) {
    this.listWrapElem.children().each((i, elem) => {
      elem = $(elem)
      if (elem.attr('data-key') !== key) {
        elem.css('display', 'none')
      } else {
        elem.css('display', '')
      }
    })

    this.typesElem.find('span.active').removeClass('active')
    this.typesElem.find(`span[data-key="${key}"]`).addClass('active')

    this.changeListHeight()
  }

  getName () {
    return 'emoticons'
  }

  getBtnHtml () {
    return '表情'
  }

  getElem () {
    return this.elem
  }

  onShow () {
    this.changeListHeight()
  }

  changeListHeight () {
    this.elem.parent().css('height', this.listWrapElem.height() > 150 ? this.listWrapElem.height() : 150)
  }
}
