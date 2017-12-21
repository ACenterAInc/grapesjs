var Backbone = require('backbone');
var Frame = require('./Frame');

module.exports = Backbone.Model.extend({

  defaults :{
    frame: '',
    wrapper: '',
    wrapperPreview: '',
    wrapperCodeEdit: '',
    rulers: false,
  },

  initialize(config) {
    var conf = this.conf || {};
    try {
      initaa();
    } catch (zz) {
      console.error(zz.stack);
    }
    this.set('frame', new Frame(conf.frame));
    this.set('framePreview', new Frame(conf.frame));
    this.set('frameCodeEdit', new Frame(conf.frame));
  },

});
