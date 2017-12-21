var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  initialize(o) {
    this.opts = o || {};
    this.config = o.config || {};
    this.listenTo( this.collection, 'add', this.addTo );
    this.listenTo( this.collection, 'reset', this.render );
  },

  /**
   * Add to collection
   * @param  {Object} Model
   *
   * @return  void
   * @private
   * */
  addTo(model) {
    var i  = this.collection.indexOf(model);
    /*console.error("AafafDD TTAT");console.error("AafafDD TTAT");console.error("AafafDD TTAT");console.error("AafafDD TTAT");console.error("AafafDD TTAT");
    console.error(model);
    try {
      dsfsf();
    } catch (z) {
      console.error(z.stack);
    }*/
    if (window.editor !== undefined) {
      model.customid = model.cid + "_" + editor.md5prefix;
      console.error("ADDDDDDDDDED");
      console.error(model);
    }

    //'gen_'
    /*var len = model.attributes.classes.models;
    for (var k = 0; k < len; k++) {
      model.attributes.classes.models[k].customid=model.cid + "_" + editor.md5prefix;
    }*/
    //model.attributes.classes.models[0].customid= model.cid + "_" + editor.md5prefix;

    this.addToCollection(model, null, i);


    var em = this.config.em;
    if(em) {
      // OLD
      em.trigger('add:component', model);
      em.trigger('component:add', model);
    }
  },

  /**
   * Add new object to collection
   * @param  {Object}  Model
   * @param  {Object}   Fragment collection
   * @param  {Integer}  Index of append
   *
   * @return   {Object}   Object rendered
   * @private
   * */
  addToCollection(model, fragmentEl, index) {
    if(!this.compView)
      this.compView  =  require('./ComponentView');
    var fragment  = fragmentEl || null,
    viewObject  = this.compView;
    //console.log('Add to collection', model, 'Index',i);

    var dt = this.opts.defaultTypes;
    var ct = this.opts.componentTypes;

    var type = model.get('type');

    for (var it = 0; it < dt.length; it++) {
      var dtId = dt[it].id;
      if(dtId == type) {
        viewObject = dt[it].view;
        break;
      }
    }
    //viewObject = dt[type] ? dt[type].view : dt.default.view;

    var view = new viewObject({
      model,
      config: this.config,
      defaultTypes: dt,
      componentTypes: ct,
    });
    var rendered  = view.render().el;
    if(view.model.get('type') == 'textnode')
      rendered =  document.createTextNode(view.model.get('content'));

    if(fragment){
      fragment.appendChild(rendered);
    }else{
      var p  = this.$parent;
      var pc = p.children;
      if(typeof index != 'undefined'){
        var method  = 'before';
        // If the added model is the last of collection
        // need to change the logic of append
        if(pc && p.children().length == index){
          index--;
          method  = 'after';
        }
        // In case the added is new in the collection index will be -1
        if(index < 0) {
          p.append(rendered);
        }else {
          if(pc) {
            p.children().eq(index)[method](rendered);
          }
        }
      }else{
        p.append(rendered);
      }
    }

    return rendered;
  },

  render($p) {
    var fragment   = document.createDocumentFragment();
    this.$parent  = $p || this.$el;
    this.$el.empty();
    this.collection.each(function(model){
      this.addToCollection(model, fragment);
    },this);
    this.$el.append(fragment);

    return this;
  }

});
