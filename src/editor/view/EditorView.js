var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  initialize() {
    this.pn = this.model.get('Panels');
    this.conf = this.model.config;
    this.className = this.conf.stylePrefix + 'editor';
    this.model.on('loaded', function(){
      console.log('on loaded here aa')
      this.pn.active();
      this.model.runDefault();
      this.model.trigger('load');

      console.error('COMPONENT GET COMPONENTS DONE');
      console.error(window.editor.DomComponents.getComponents())
      window.editor.DomComponents.setComponentOrig(window.editor.DomComponents.getComponents());
      window.editor.DomComponents.setHeadComponentOrig(window.editor.DomComponents.getHeadComponents());
      window.editorInitialized=true;
    }, this);
  },

  render() {
    var model = this.model;
    var um = model.get('UndoManager');
    var dComps = model.get('DomComponents');
    var config = model.get('Config');

    if(config.loadCompsOnRender) {
      if (config.clearOnRender) {
        dComps.clear();
      }

//<<<<< HEAD FIX HERE
      dComps.getComponents().reset();//config.components);
      // console.error('add component here components...');
      // console.error(config.components);
      dComps.getComponents().add(config.components);
      dComps.getHeadComponents().add(config.headers);
      model.loadOnStart();

      um.clear();
      // This will init loaded components
      dComps.onLoad();
    }

    var conf = this.conf;
    var contEl = $(conf.el || ('body ' + conf.container));
    this.$el.empty();

    if(conf.width)
      contEl.css('width', conf.width);

    if(conf.height)
      contEl.css('height', conf.height);

    // Left Menu ( nah... )
    //this.$el.append(model.get('Leftmenu').render());

    // Canvas
    this.$el.append(model.get('Canvas').render());

    // Panels
    var styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.type = 'text/css';
    styles.media = 'screen';
    //styles.href = '/css/grapes.min.css';

    // alert(model.get('locationprefix'));
    // alert(window.editoradminprefix)
    styles.href = model.get('locationprefix') + '/css/grapes.min.css';
    //headTag.appendChild(styles);
    this.$el.append(styles);
    this.$el.append(this.pn.render());
    this.$el.attr('class', this.className);

    contEl.addClass(conf.stylePrefix + 'editor-cont');
    contEl.html(this.$el);


    return this;
  }
});
