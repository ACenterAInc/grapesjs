var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  template: _.template(`
    <div class="<%= ppfx %>hugo-label"></div>
    <div>Hugo item view: <%= elem %> <div>`),

  events:{
      // 'click': 'handleClick'
  },


  initialize(o) {

    this.config = o.config || {};
    this.em = this.config.em;
    this.ppfx = this.config.pStylePrefix || '';

    //this.events['click .' + this.ppfx + 'add-trasp'] = this.startAdd;
    //this.listenTo(this.em, 'change:device', this.updateSelect);

    // alert('initilize here');
    // The taget that will emit events for properties
    this.propTarget   = {};

    _.extend(this.propTarget, Backbone.Events);
    this.listenTo( this.collection, 'add', this.addTo);
    this.listenTo( this.collection, 'reset', this.render);
    this.listenTo( this.target, 'change:selectedComponent targetClassAdded targetClassRemoved targetClassUpdated ' +
      'targetStateUpdated targetStyleUpdated change:device', this.targetUpdated);
      console.error('test target');
      console.error(this.target);
      console.error(this);

      console.error('selected object');
      console.error(window.editor.editor.get('selectedComponent'));
      this.target = window.editor.editor.get('selectedComponent');
      this.targetUpdated();
    // this.delegateEvents();
  },

  /**
   * Start adding new device
   * @return {[type]} [description]
   * @private
   */
  startAdd() {},

  targetUpdated() {
      console.error('target updated...');
      console.error(this.target);
  },

  handleClick() {
      // alert('clicked');
  },

  render() {
    var pfx = this.ppfx;
    console.error('rendering here');
    // alert(this.target.attributes.attributes['data-param']);
    // this.target.set('content','aaaa');
    // this.target.parseRender();

    this.$el.html(this.template({
      ppfx: pfx,
      elem: this.target.cid
      //deviceLabel: this.config.deviceLabel
    }));
    //this.devicesEl = this.$el.find('.' + pfx + 'hugo_add');
    this.el.className = pfx + 'hugo-c';

    return this;
  },

});
