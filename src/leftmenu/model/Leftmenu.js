var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

  defaults :{
    wrapper: '',
  },

  initialize(config) {
    var conf = this.conf || {};
  },

});
