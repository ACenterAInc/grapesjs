var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  template: _.template(`
    <div class="<%= ppfx %>hugo-label"></div>
    <div>Hugo item view<div>`),

  events:{
      // 'click': 'handleClick'
  },


  initialize(o) {

    this.config = o.config || {};
    this.em = this.config.em;
    this.ppfx = this.config.pStylePrefix || '';

    //this.events['click .' + this.ppfx + 'add-trasp'] = this.startAdd;
    //this.listenTo(this.em, 'change:device', this.updateSelect);
    this.delegateEvents();
  },

  /**
   * Start adding new device
   * @return {[type]} [description]
   * @private
   */
  startAdd() {},

  handleClick() {
      alert('clicked');
  },

  render() {
    var pfx = this.ppfx;
    this.$el.html(this.template({
      ppfx: pfx
      //deviceLabel: this.config.deviceLabel
    }));
    //this.devicesEl = this.$el.find('.' + pfx + 'hugo_add');
    this.el.className = pfx + 'hugo-c';
    return this;
  },

});
