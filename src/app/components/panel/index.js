'use strict';

require('./index.less');

module.exports = {
  className: 'pv-panel',
  template: require('./template.html'),
  components: {
    description:   require('./components/description'),
    bookmark:      require('./components/bookmark'),
    follow:        require('./components/follow'),
    comments:      require('./components/comments'),
    configuration: require('./components/configuration'),
    help:          require('./components/help')
  },
  computed: {
    illustUrl: function illustUrl() {
      var prefix = 'http://www.pixiv.net/member_illust.php?mode=medium&illust_id=',
          id;

      if (id = this.$get('pix.illust.id')) {
        return prefix + id;
      }
      return '#';
    },
    authorUrl: function authorUrl() {
      var prefix = 'http://www.pixiv.net/member_illust.php?id=',
          id;

      if (id = this.$get('pix.author.id')) {
        return prefix + id;
      }
      return '#';
    }
  }
};
