var StyleManager = require('style_manager');

module.exports = {

  run(em, sender) {
    this.sender  = sender;
    if(!this.$cn){
      var config    = em.getConfig(),
          panels    = em.Panels;
      // Main container
      this.$cn = $('<div/>');
      // Secondary container
      this.$cn2 = $('<div/>');

      // Secondary container
      this.$cn3 = $('<div/>');

      // Secondary container
      this.$cn4 = $('<div/>');

      this.$cn.append(this.$cn2);
      this.$cn.append(this.$cn3);
      this.$cn.append(this.$cn4);

      // Device Manager
      var dvm = em.DeviceManager;
      if(dvm && config.showDevices){
        var devicePanel = panels.addPanel({ id: 'devices-c'});
        devicePanel.set('appendContent', dvm.render()).trigger('change:appendContent');
      }

      var hvm = em.HugoManager;
      if(hvm){
        var hugoPanel = panels.addPanel({ id: 'hugo-c'});
        hugoPanel.set('appendContent', hvm.render()).trigger('change:appendContent');
      }

      // Class Manager container
      var clm = em.SelectorManager;
      if(clm) {
        this.$cn2.append(clm.render([]));
        this.$cn3.append(clm.render([]));
        this.$cn4.append(clm.render([]));
      }

      this.$cn2.append(em.StyleManager.render());
      var smConfig = em.StyleManager.getConfig();
      // Create header
      this.$header  = $('<div>', {
        class: smConfig.stylePrefix + 'header',
        text: smConfig.textNoElement,
      });

      console.error('SELECTOR ELEMENT A');
      //this.$cn = this.$cn.add(this.$header);
      this.$cn.append(this.$header);

      // this.$cn3.append(em.StyleManager.render());
      // this.$cn4.append(em.StyleManager.render());

      // Create panel if not exists
      if(!panels.getPanel('views-container'))
        this.panel  = panels.addPanel({ id: 'views-container'});
      else
        this.panel  = panels.getPanel('views-container');

      // Add all containers to the panel
      this.panel.set('appendContent', this.$cn).trigger('change:appendContent');

      this.target = em.editor;
      this.listenTo( this.target ,'change:selectedComponent', this.toggleSm);
    }
    this.toggleSm();
  },

  /**
   * Toggle Style Manager visibility
   * @private
   */
  toggleSm() {

      try {
        console.error('SELECTOR ELEMENT B');
      } catch (ezz) {
          console.error(ezz.stack);
      }
      console.log(this.sender);
      console.log(this.target);

      if(!this.sender.get('active'))
        return;

      console.log('active a');
      console.log('select AA');
      if(this.target.get('selectedComponent')){
          console.log('select BB');
          //At this point an element is selected... but ??? what are our state ?
          if (window.editor.getConfig().tagEditorOnly) {
            console.log('active tag only');
            console.log('select CC');

            /*
            sectors: [{
                name: 'General',
                open: false,
                buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom'],
               }
            */

              console.error('init aaa b');

              var ss = require('hugo_item')();
              console.error(ss);
              var ff = ss.init({
              });

            /*
            console.error(this.$cn2);
            this.$cn2.empty();
            window.editor.StyleManager.init({

              sectors: [{
                  name: 'General',
                  open: false,
                  buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom'],
                },{
                  name: 'Dimension',
                  open: false,
                  buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
                },{
                  name: 'Typography',
                  open: false,
                  buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-shadow'],
                  properties: [{
                      property: 'text-align',
                      list        : [
                          {value: 'left', className: 'fa fa-align-left'},
                          {value: 'center', className: 'fa fa-align-center' },
                          {value: 'right', className: 'fa fa-align-right'},
                          {value: 'justify', className: 'fa fa-align-justify'}
                      ],
                  }]
                },{
                  name: 'Decorations',
                  open: false,
                  buildProps: ['border-radius-c', 'background-color', 'border-radius', 'border', 'box-shadow', 'background'],
                },{
                  name: 'Extra',
                  open: false,
                  buildProps: ['transition', 'perspective', 'transform'],
                }],

            });
            this.$cn2.append(window.editor.StyleManager.render());
            */
            this.$cn2.hide();

            this.$cn3.empty();
            this.$cn3.append(ff.render());

            // this.$cn3.append("<div>alalkjlkja</div>");hvm.render());
            this.$cn3.show();


            // this.$cn4.show();
            // this.$cn2.show();

            this.$header.hide();

            // this.$cn2.hide();
            // this.$header.show();
          } else {
            console.log('active bb');
            console.log('select DD');
            this.$cn2.show();
            this.$header.hide();
          }
      }else{
          console.log('select EE');
          console.log('active cc');
          this.$cn2.hide();
          this.$cn3.hide();
          this.$cn4.hide();
          this.$header.show();
      }
      console.log('active dd');
  },

  stop() {
    // Hide secondary container if exists
    if(this.$cn2)
      this.$cn2.hide();

    // Hide header container if exists
    if(this.$header)
      this.$header.hide();
  }
};
