'use strict';

var api = require('api'),
    Vue = require('vue'),
    pixiv = window.pixiv;

var Cmp = Vue.extend({
  attached: function attached() {
    var $el = window.$(this.$el);

    $el.find('.ui-counter').counter();
    pixiv.bookmarkTag.setup('.tag-cloud-container');
    pixiv.tag.setup();
    $el.on('click', '.tag', function() {
      pixiv.tag.toggle(this.dataset.tag);
      return false;
    });
    $el.find('input[name="comment"]').focus();
  }
});

module.exports = {
  bind: function() {
    var parent = this.el.parentNode;

    this.ref = document.createComment('v-include');
    parent.insertBefore(this.ref, this.el);
    parent.removeChild(this.el);
  },
  unbind: function() {
    if (this.childVM) {
      this.childVM.$destroy();
    }
  },
  update: function(value) {
    if (!value) { return; }

    var dir = this;

    this.unbind();
    api.getBookmark(value).then(function(el) {
      if (!dir.compiler) { return; }

      var btn = el.querySelector('input[type="submit"]'),
          form = el.querySelector('form');

      btn.setAttribute('v-attr', 'disabled:loading');
      form.setAttribute('v-on', 'submit:update');

      dir.childVM = new Cmp({parent: dir.vm, el: el });
      dir.el = dir.childVM.$el;

      if (dir.compiler.init) {
        dir.ref.parentNode.insertBefore(dir.el, dir.ref);
      } else {
        dir.childVM.$before(dir.ref);
      }
    }).catch(function(err) {
      if (!dir.compiler) { return; }

      dir.el = createErrBox(err.message);
      dir.ref.parentNode.insertBefore(dir.el, dir.ref);
    });
  }
};

function createErrBox(msg) {
  var box = document.createElement('div');

  box.className = 'pv-panel-item';
  box.textContent = msg;
  return box;
}
