var Layers = require('navigator');

module.exports = {

  run(editor, sender) {
    var config = editor.Config;
    var pfx = config.stylePrefix;
    var bm = editor.PageManager;
    var panelC;
    if(!this.blocks){
      this.blocks = $('<div class="page-view-selection"/>').get(0);
      this.blocks.appendChild(bm.render());
      var panels = editor.Panels;
      if(!panels.getPanel('views-container'))
        panelC = panels.addPanel({id: 'views-container'});
      else
        panelC = panels.getPanel('views-container');
      panelC.set('appendContent', this.blocks).trigger('change:appendContent');
    }

    this.blocks.style.display = 'block';
  },

  stop() {
    if(this.blocks)
      this.blocks.style.display = 'none';
  }
  /*
  run(em, sender) {
    if(!this.$layers) {
      var collection = em.DomComponents.getComponent().get('components'),
      config = em.getConfig(),
      panels = em.Panels,
      lyStylePfx = config.layers.stylePrefix || 'nv-';

      config.layers.stylePrefix = config.stylePrefix + lyStylePfx;
      config.layers.pStylePrefix = config.stylePrefix;
      config.layers.em 	= em.editor;
      config.layers.opened = em.editor.get('opened');
      var layers = new Layers(collection, config.layers);
      this.$layers = layers.render();

      // Check if panel exists otherwise crate it
      if(!panels.getPanel('views-container'))
        this.panel = panels.addPanel({id: 'views-container'});
      else
        this.panel = panels.getPanel('views-container');

      this.panel.set('appendContent', this.$layers).trigger('change:appendContent');
    }
    this.$layers.show();
  },

  stop() {
    if(this.$layers)
      this.$layers.hide();
  }
  */
};
