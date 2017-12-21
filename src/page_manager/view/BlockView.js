var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  events: {
    click: 'click'
  },

  initialize(o, config) {
    console.error("TTTAAA");
    console.error(this);
    //_.bindAll(this, 'onDrop');
    this.config = config || {};
    this.ppfx = this.config.pStylePrefix || '';
    const pfx = this.ppfx;
    this.em = this.config.em || {};

    if(this.em && this.em.get)
      this.commands  = this.em.get('Commands');

    if(this.em){
        this.config.getSorter = this.getSorter;
        this.canvas = this.em.get('Canvas');
    }

    this.listenTo(this.model, 'destroy', this.remove);
    //this.listenTo(this.model, 'click', this.click);//this.remove);


//var s = this;
  //  setTimeout(
    //  function() {
        //this.events[`click .${pfx}pagetitle`]  = 'click';
      //}, 1000);

    this.doc = $(document);


    //console.error("TET THIS");
    //console.error(this);
    this.delegateEvents();
  },

/**
 * Get sorter
 * @private
 */
getSorter() {
    if(!this.em)
      return;
    if(!this.sorter){
      var utils = this.em.get('Utils');
      var canvas = this.canvas;
      this.sorter = new utils.Sorter({
        container: canvas.getBody(),
        placer: canvas.getPlacerEl(),
        containerSel: '*',
        itemSel: '*',
        pfx: this.ppfx,
        onStart: this.onDrag,
        onEndMove: this.onDrop,
        onMove: this.onMove,
        document: canvas.getFrameEl().contentDocument,
        direction: 'a',
        wmargin: 1,
        nested: 1,
        em: this.em,
        canvasRelative: 1,
      });
    }
    return this.sorter;
  },


  onDrag(e) {
    //Right or middel click
    if (e.button !== 0) {
      return;
    }

    if(!this.config.getSorter) {
      return;
    }

    this.config.em.refreshCanvas();
    var sorter = this.config.getSorter();
    sorter.setDragHelper(this.el, e);
    sorter.startSort(this.el);
    sorter.setDropContent(this.model.get('content'));
  },

  click() {
    var model = this.model;
    console.error("GOT CLICK HERE");
    console.error(model);
    console.error(model.attributes);
    console.error(model.get('command'));
    console.error(this);
    //model.set('open', !model.get('open'));

    var commandName = this.model.get('command');
    var command;


    console.error("COMMAND IS" + commandName);
    console.error(this.commands);
    if (this.commands && typeof commandName === 'string') {
      console.error("TEYP IS STRING");
      command  = this.commands.get(commandName);
    } else if (commandName !== null && typeof commandName === 'object') {
      console.error("TEYP IS OBJ");
      command = commandName;
    } else if (typeof commandName === 'function') {
      console.error("TEYP IS FUNC");
      command = {run: commandName};
    }

    //console.error(command);
    //this.onDrag({button:0})
    command.run(editor, this.model, this.model.get('options'));
    editor.trigger('run:' + commandName);

    /*if(this.model.get('active')){

      this.model.collection.deactivateAll(this.model.get('context'));
      this.model.set('active', true, { silent: true }).trigger('checkActive');

      if(this.parentM)
        this.parentM.set('active', true, { silent: true }).trigger('checkActive');

      if(command && command.run){
      command.run(editor, this.model, this.model.get('options'));
      editor.trigger('run:' + commandName);
      }
    */

  },

  render() {
    var className = this.ppfx + 'pagetitle';
    console.error("ADDING OF :" + className);
    this.$el.addClass(className);
    this.el.innerHTML = '<div class="' + className + '-label">' + this.model.get('label') + '</div>';
/*
    this.el.innerHTML = this.template({
      pfx: this.pfx,
      label: this.model.get('label'),
    });
    this.el.className = this.className;
  */



    return this;
  },

});
