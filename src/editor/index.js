/**
 *
 * * [getConfig](#getconfig)
 * * [getHtml](#gethtml)
 * * [getHead](#gethead)
 * * [getCss](#getcss)
 * * [getJs](#getjs)
 * * [getComponents](#getcomponents)
 * * [setComponents](#setcomponents)
 * * [addComponents](#addcomponents)
 * * [getStyle](#getstyle)
 * * [setStyle](#setstyle)
 * * [getSelected](#getselected)
 * * [setDevice](#setdevice)
 * * [getDevice](#getdevice)
 * * [runCommand](#runcommand)
 * * [stopCommand](#stopcommand)
 * * [store](#store)
 * * [load](#load)
 * * [getContainer](#getcontainer)
 * * [refresh](#refresh)
 * * [on](#on)
 * * [trigger](#trigger)
 * * [render](#render)
 *
 * Editor class contains the top level API which you'll probably use to custom the editor or extend it with plugins.
 * You get the Editor instance on init method
 *
 * ```js
 * var editor = grapesjs.init({...});
 * ```
 *
 * **Available events**
 * component:add - Triggered when a new component is added to the editor, the model is passed as an argument to the callback
 * component:update - Triggered when a component is, generally, updated (moved, styled, etc.)
 * component:update:{propertyName} - Listen any property change
 * component:styleUpdate - Triggered when the style of the component is updated
 * component:styleUpdate:{propertyName} - Listen for a specific style property change
 * canvasScroll - Triggered when the canvas is scrolled
 * run:{commandName} - Triggered when some command is called to run (eg. editor.runCommand('preview'))
 * stop:{commandName} - Triggered when some command is called to stop (eg. editor.stopCommand('preview'))
 * load - When the editor is loaded
 *
 * @module Editor
 * @param {Object} config Configurations
 * @param {string} config.container='' Selector for the editor container, eg. '#myEditor'
 * @param {string|Array<Object>} [config.components=''] HTML string or object of components
 * @param {string|Array<Object>} [config.style=''] CSS string or object of rules
 * @param {Boolean} [config.fromElement=false] If true, will fetch HTML and CSS from selected container
 * @param {Boolean} [config.copyPaste=true] Enable/Disable the possibility to copy(ctrl + c) & paste(ctrl + v) components
 * @param {Boolean} [config.undoManager=true] Enable/Disable undo manager
 * @param {Boolean} [config.autorender=true] If true renders editor on init
 * @param {Boolean} [config.noticeOnUnload=true] Enable/Disable alert message before unload the page
 * @param {string} [config.height='900px'] Height for the editor container
 * @param {string} [config.width='100%'] Width for the editor container
 * @param {Object} [config.storage={}] Storage manager configuration, see the relative documentation
 * @param {Object} [config.styleManager={}] Style manager configuration, see the relative documentation
 * @param {Object} [config.commands={}] Commands configuration, see the relative documentation
 * @param {Object} [config.domComponents={}] Components configuration, see the relative documentation
 * @param {Object} [config.panels={}] Panels configuration, see the relative documentation
 * @param {Object} [config.showDevices=true] If true render a select of available devices inside style manager panel
 * @param {string} [config.defaultCommand='select-comp'] Command to execute when no other command is running
 * @param {Array} [config.plugins=[]] Array of plugins to execute on start
 * @param {Object} [config.pluginsOpts={}] Custom options for plugins
 * @example
 * var editor = grapesjs.init({
 *   container : '#gjs',
 *   components: '<div class="txt-red">Hello world!</div>',
 *   style: '.txt-red{color: red}',
 * });
 */

module.exports = config => {
  var c = config || {},
  defaults = require('./config/config'),
  EditorModel = require('./model/Editor'),
  MD5Model = require('./model/MD5'),
  EditorView = require('./view/EditorView');

  for (var name in defaults) {
    if (!(name in c))
      c[name] = defaults[name];
  }
  c.pStylePrefix = c.stylePrefix;

  var em = new EditorModel(c);

  var editorView = new EditorView({
      model: em,
      config: c,
  });

  return {

    /**
     * @property {EditorModel}
     * @private
     */
    editor: em,

    md5: MD5Model,

    md5prefix: MD5Model(window.location.pathname).substring(0,5),

    /**
     * @property {DomComponents}
     */
    DomComponents: em.get('DomComponents'),

    /**
     * @property {CssComposer}
     */
    CssComposer: em.get('CssComposer'),

    /**
     * @property {StorageManager}
     */
    StorageManager: em.get('StorageManager'),

    /**
     * @property {AssetManager}
     */
    AssetManager: em.get('AssetManager'),

    /**
     * @property {FileManager}
     */
    FileManager: em.get('FileManager'),

    /**
     * @property {BlockManager}
     */
    BlockManager: em.get('BlockManager'),

    /**
     * @property {PageManager}
     */
    PageManager: em.get('PageManager'),

    /**
     * @property {TraitManager}
     */
    TraitManager: em.get('TraitManager'),

    /**
     * @property {SelectorManager}
     */
    SelectorManager: em.get('SelectorManager'),

    /**
     * @property {CodeManager}
     */
    CodeManager: em.get('CodeManager'),

    /**
     * @property {Commands}
     */
    Commands: em.get('Commands'),

    /**
     * @property {Modal}
     */
    Modal: em.get('Modal'),

    /**
     * @property {Panels}
     */
    Panels: em.get('Panels'),

    /**
     * @property {StyleManager}
     */
    StyleManager: em.get('StyleManager'),

    /**
     * @property {Canvas}
     */
    Canvas: em.get('Canvas'),

    Leftmenu: em.get('Leftmenu'),

    //Text Area edit...
    injected: null,
    /**
     * @property {UndoManager}
     */
    UndoManager: em.get('UndoManager'),

    /**
     * @property {DeviceManager}
     */
    DeviceManager: em.get('DeviceManager'),

    /**
     * @property {HugoManager}
     */
    HugoManager: em.get('HugoManager'),

    /**
     * @property {RichTextEditor}
     */
    RichTextEditor: em.get('rte'),

    /**
     * @property {Utils}
     */
    Utils: em.get('Utils'),

    /**
     * @property {apiUrl}
     */
    apiUrl: em.get('apiUrl'),

    /**
     * @property {Utils}
     */
    Config: em.get('Config'),

    /**
     * Initialize editor model
     * @return {this}
     * @private
     */
    init() {
      em.init(this);
      return this;
    },

    /**
     * Returns configuration object
     * @return {Object}
     */
    getConfig() {
      return c;
    },

    /**
     * Returns HTML built inside canvas
     * @return {string} HTML string
     */
    getHtml() {
      console.log('get html aaaaa')
      console.log(this.injected)
      if (this.injected == null) {
        console.log('get html OKOK')
        return em.getHtml();
      } else {
         return this.injected.value
      }
    },

    /**
     * Returns HTML built inside canvas
     * @return {string} HTML string
     */
    getHead() {
      console.error("EM1:");
      // var disableLink = function(){ console.log('disabled'); return false;};
      // $("iframe").contents().find("body").find("a").bind('click', disableLink);
      // console.error(em);
      return em.getHead();
    },

    /**
     * Returns CSS built inside canvas
     * @return {string} CSS string
     */
    getCss() {
      return em.getCss();
    },

    /**
     * Returns JS of all components
     * @return {string} JS string
     */
    getJs() {
      return em.getJs();
    },

    /**
     * Returns components in JSON format object
     * @return {Object}
     */
    getComponents() {
      return em.get('DomComponents').getComponents();
    },

    getHeadComponents() {
      return em.get('DomComponents').getHeadComponents();
    },

    /**
     * Set components inside editor's canvas. This method overrides actual components
     * @param {Array<Object>|Object|string} components HTML string or components model
     * @return {this}
     * @example
     * editor.setComponents('<div class="cls">New component</div>');
     * // or
     * editor.setComponents({
     *  type: 'text',
     *   classes:['cls'],
     *   content: 'New component'
     * });
     */
    setComponents(components) {
      em.setComponents(components);
      return this;
    },
    setComponentsOrig(components) {
      //console.log(em);
      DomComponents.setComponentsOrig(components);
      return this;
    },

    setHeadComponents(components) {
      em.setHeadComponents(components);
      return this;
    },
    setHeadComponentsOrig(components) {
      DomComponents.setHeadComponentsOrig(components);
      return this;
    },


    /**
     * Add components
     * @param {Array<Object>|Object|string} components HTML string or components model
     * @return {Model|Array<Model>}
     * @example
     * editor.addComponents('<div class="cls">New component</div>');
     * // or
     * editor.addComponents({
     *  type: 'text',
     *   classes:['cls'],
     *   content: 'New component'
     * });
     */
    addComponents(components) {
      return this.getComponents().add(components);
    },

    /**
     * Returns style in JSON format object
     * @return {Object}
     */
    getStyle() {
      return em.get('CssComposer').getAll();
    },

    /**
     * Set style inside editor's canvas. This method overrides actual style
     * @param {Array<Object>|Object|string} style CSS string or style model
     * @return {this}
     * @example
     * editor.setStyle('.cls{color: red}');
     * //or
     * editor.setStyle({
     *   selectors: ['cls']
     *   style: { color: 'red' }
     * });
     */
    setStyle(style) {
      em.setStyle(style);
      return this;
    },

    /**
     * Returns selected component, if there is one
     * @return {grapesjs.Component}
     */
    getSelected() {
      return em.getSelected();
    },

    /**
     * Set device to the editor. If the device exists it will
     * change the canvas to the proper width
     * @return {this}
     * @example
     * editor.setDevice('Tablet');
     */
    setDevice(name) {
      return em.set('device', name);
    },

    /**
     * Return the actual active device
     * @return {string} Device name
     * @example
     * var device = editor.getDevice();
     * console.log(device);
     * // 'Tablet'
     */
    getDevice() {
      return em.get('device');
    },

    /**
     * Execute command
     * @param {string} id Command ID
     * @param {Object} options Custom options
     * @return {*} The return is defined by the command
     * @example
     * editor.runCommand('myCommand', {someValue: 1});
     */
    runCommand(id, options) {
      var result;
      var command = em.get('Commands').get(id);

      if(command){
        result = command.run(this, this, options);
        this.trigger('run:' + id);
      }
      return result;
    },

    /**
     * Stop the command if stop method was provided
     * @param {string} id Command ID
     * @param {Object} options Custom options
     * @return {*} The return is defined by the command
     * @example
     * editor.stopCommand('myCommand', {someValue: 1});
     */
    stopCommand(id, options) {
      var result;
      var command = em.get('Commands').get(id);

      if(command){
        result = command.stop(this, this, options);
        this.trigger('stop:' + id);
      }
      return result;
    },

    /**
     * Store data to the current storage
     * @param {Function} clb Callback function
     * @return {Object} Stored data
     */
    store(clb) {
      return em.store(clb);
    },

    /**
     * Load data from the current storage
     * @return {Object} Stored data
     */
    load() {
      return em.load();
    },

    /**
     * Returns container element. The one which was indicated as 'container'
     * on init method
     * @return {HTMLElement}
     */
    getContainer() {
      return c.el;
    },

    escapeHtml (string) {
      var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
      };

      return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
      });
    },

    updatePreviewContentHugo  (  ) {
      // jQuery is bad, but its ok for now .. jquery is already a dependency
      // Create child and get to the 1st child element

      // alert(em.get('apiUrl'));
      console.log('updatePreviewContentHugo')
        var that = this;

        try {
        var postData = {
          page: null,
          html: window.editor.getHtml()
        }

        $.ajax({
          url      : em.get('apiUrl') + '/widgetview?widget=' + this.getParameterByName('widget'),
          type    : 'POST',
          data    : JSON.stringify(postData),
          beforeSend  : function() {

          },
          error  : function (errr) {
              // error message might contains <> elements, so we must escape them...
              that.updatePreviewContent(that.escapeHtml(errr.responseJSON.error));
          },
          complete  : function () {

          },
          xhrFields  : {
            onprogress(e) {
              if (e.lengthComputable) {
                //var result = e.loaded / e.total * 100 + '%';//
              }
            },
            onload(e) {
                //progress.value = 100;
            }
          },
          cache: false, contentType: 'application/json', processData: false
        }).done(data => {
          //target.add(data.data);

          console.log('updated peview data off......')
          console.log(data)

          that.updatePreviewContent(data);// "<div>aaa</div>");

        }).always(() => {
          //turnOff loading
        });
      } catch (ezzz) {
        console.error(ezzz.stack)
      }

      // updatePreviewContent("<div>aaa</div>");
    },

    updatePreviewContent ( htmlStringContent ) {
      // jQuery is bad, but its ok for now .. jquery is already a dependency
      // Create child and get to the 1st child element

/*
      var arrDomElements = $.parseHTML("<div>" + this.escapeHtml(htmlStringContent) + "</div>");
      console.log('parsed')
      console.log(arrDomElements);
      */
      /*
      var child = document.createElement('div');
      child.innerHTML = htmlStringContent;

      var tmpChilds = child.childNodes;

      child = child.firstChild;

      console.log('update prefiew.... d')
      console.log(child)
      */

      //Remove exiting content
      var myNode = $("#previewIframe").contents().find('body')[0];
      console.log('update prefiew.... e')
      while (myNode.firstChild) {
          console.log('update prefiew.... remove')
          myNode.removeChild(myNode.firstChild);
      }
      /*
      var i = 0;
      var len = arrDomElements.length;
      console.log(arrDomElements);
      for(i = 0; i < len; i++) {
        $("#previewIframe").contents().find('body')[0].appendChild(arrDomElements[i])
      }
      */
      //$("#previewIframe").contents().find('body')[0].innerHTML = "<div><li>afafa</li>" + this.escapeHtml(htmlStringContent) + "</div>";//htmlStringContent;// appendChild(arrDomElements[i])
      $("#previewIframe").contents().find('body')[0].innerHTML = htmlStringContent;

/*
      console.log('update prefiew.... f')
      //append new content
      var i = 0;
      console.log(tmpChilds)
      console.log(tmpChilds.length)
      // console.log('update prefiew.... faa')
      for(i = 0; i < tmpChilds.length; i++) {
          console.log('fchiild a');
          console.log(tmpChilds[i])
          if (tmpChilds[i] === undefined) {

          } else {
            //if (tmpChilds[i].nodeType == 1) {
                $("#previewIframe").contents().find('body')[0].appendChild(tmpChilds[i])
            // }
          }
              // recurseAndAdd(t[i], alldescendants);
      }
      console.log('update prefiew.... ccc')
      // $("#previewIframe").contents().find('body')[0].appendChild(child);
      */
    },

    testStaticPreviewMode() {
      // jQuery is bad, but its ok for now .. jquery is already a dependency
      try {
        var child = window.document.createElement('div');
        child.innerHTML = '<div custom-name="Box_94a88-c256" >  <h1 custom-name="Text_94a88-c257" >Welcome to {{ if not .IsHome }}{{ .Title }} | {{ end }}{{ .Site.Title }}  </h1></div>';
        console.log('got child?')
        console.log(child);
        child = child.firstChild;
        console.log('got child 1?')
        var myNode = $("#previewIframe").contents().find('body')[0];
        if (myNode !== undefined && myNode !== null) {
          while (myNode.firstChild) {
              myNode.removeChild(myNode.firstChild);
          }
        }

        $("#previewIframe").contents().find('body')[0].appendChild(child);
      } catch (eee) {
        console.error(eee.stack);
      }
    },
    injectTimeout: null,

    enablePreviewMode() {

      /*var child = document.createElement('div');
      child.innerHTML = "<stile>.gjs-toolbar { display: none; } </style>"
      child = child.firstChild;

      var len = $("#editorIframe").contents().find('body')[0].appendChild(child);
      */
      var len = $("#editorIframe").contents().find('body').find("#injectHere").length
      if (len == 1) {
        var tmp = $("#editorIframe").contents().find('body').find("#injectHere").detach();
        $("#codeEditIframe").contents().find('body')[0].appendChild(tmp[0]);
        this.injected = tmp[0];
        $("#codeEditIframe").contents().find('body').css({'margin': '0px'});
        $("#codeEditIframe").contents().find('body').find("#injectHere").css({'width': '100%', 'min-height': '100%'});
        var that = this;

        //TODO: Set panel mode
        // $("#gjs-pn-views-container").hide();
        // $(".gjs-cv-canvas").addClass('fullwidth');
        $("#codeEditIframe").contents().find('body').find("#injectHere").on('keyup',function(){
            console.log('key up here');

            if(that.qr_timeout != null) {
                clearTimeout(that.qr_timeout);
            }
            console.log('key up here 1');
            that.qr_timeout = setTimeout(function(){
                 //Do your magic herewindow.editor.editor.updateBeforeUnload()
                 that.editor.updateBeforeUnload()
            }, 500);
        });

      }

      $("#codeEditIframe").addClass('half').removeClass('hidden')
      $("#editorIframe").addClass('hidden')
      $("#previewIframe").addClass('half').addClass('topborder').addClass('whitebg')
    },
    /**
     * Update editor dimensions and refresh data useful for positioning of tools
     *
     * This method could be useful when you update, for example, some position
     * of the editor element (eg. canvas, panels, etc.) with CSS, where without
     * refresh you'll get misleading position of tools (eg. rich text editor,
     * component highlighter, etc.)
     *
     * @private
     */
    refresh() {
      em.refreshCanvas();
    },

    /**
     * Replace the built-in Rich Text Editor with a custom one.
     * @param {Object} obj Custom RTE Interface
     * @example
     * editor.setCustomRte({
     *   // Function for enabling custom RTE
     *   // el is the HTMLElement of the double clicked Text Component
     *   // rte is the same instance you have returned the first time you call
     *   // enable(). This is useful if need to check if the RTE is already enabled so
     *   // ion this case you'll need to return the RTE and the end of the function
     *   enable: function(el, rte) {
     *     rte = new MyCustomRte(el, {}); // this depends on the Custom RTE API
     *     ...
     *     return rte; // return the RTE instance
     *   },
     *
     *   // Disable the editor, called for example when you unfocus the Text Component
     *  disable: function(el, rte) {
     *     rte.blur(); // this depends on the Custom RTE API
     *  }
     *
     * // Called when the Text Component is focused again. If you returned the RTE instance
     * // from the enable function, the enable won't be called again instead will call focus,
     * // in this case to avoid double binding of the editor
     *  focus: function (el, rte) {
     *   rte.focus(); // this depends on the Custom RTE API
     *  }
     * });
     */
    setCustomRte(obj) {
      this.RichTextEditor.customRte = obj;
    },

    /**
     * Attach event
     * @param  {string} event Event name
     * @param  {Function} callback Callback function
     * @return {this}
     */
    on(event, callback) {
      return em.on(event, callback);
    },

    /**
     * Trigger event
     * @param  {string} event Event to trigger
     * @return {this}
     */
    trigger(event) {
      return em.trigger(event);
    },

    /**
     * Returns editor element
     * @return {HTMLElement}
     * @private
     */
    getEl() {
      return editorView.el;
    },

    /**
     * Returns editor model
     * @return {Model}
     * @private
     */
    getModel() {
      return em;
    },

    /**
     * Render editor
     * @return {HTMLElement}
     */

    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    afterLoaded() {

      // this.editor.Canvas.getBody().className = this.ppfx + 'dashed';
      var that1 = this;
      var fctEnableCanvasEdit = function(newCtr) {
        if (newCtr  >= 100) {
          //ah
        //  console.log('HARD STOP')
          return
        }
        var tmp = $("#editorIframe").contents().find('body');
        var tmp1 = that1.Canvas;
        if (tmp.length <= 0) {
          setTimeout(function() {
            fctEnableCanvasEdit(++newCtr)
          }, 300);
        } else {



          /*
          var commands = that.Commands;
          var commandName = 'sw-visibility';
          var command;

          if (commands && typeof commandName === 'string') {
            command  = commands.get(commandName);
          } else if (commandName !== null && typeof commandName === 'object') {
            command = commandName;
          } else if (typeof commandName === 'function') {
            command = {run: commandName};
          }

          //console.error(command);
          //this.onDrag({button:0})
          command.run(that);
          that.trigger('run:' + commandName);
          that.refresh();*/

          console.log('TIGGER LOADED')
          that1.editor.trigger('loaded');
          return;

        }
      }
      setTimeout(fctEnableCanvasEdit(1), 500);

      if (this.getParameterByName('staticBlock') !== undefined && this.getParameterByName('staticBlock') !== null) {
        var staticBlock = this.getParameterByName('staticBlock');
        var allObj = this.PageManager.getAll().models;
        var allLen = allObj.length;
        for (var i = 0; i < allLen; i++) {
          // console.log(allObj[i].get('ref') + " === " + staticBlock + " ? " + (allObj[i].get('ref') === staticBlock));
          if (allObj[i].get('ref') === staticBlock) {
            console.log('GOT IT');

            console.log(allObj[i]);

            var commands = this.Commands;
            var commandName = allObj[i].get('command');
            var command;

            if (commands && typeof commandName === 'string') {
              command  = commands.get(commandName);
            } else if (commandName !== null && typeof commandName === 'object') {
              command = commandName;
            } else if (typeof commandName === 'function') {
              command = {run: commandName};
            }

            //console.error(command);
            //this.onDrag({button:0})
            command.run(this, allObj[i], allObj[i].get('options'));
            this.trigger('run:' + commandName);
            return;
          }
        }
      } else if (this.getParameterByName('editMode') !== undefined) {
          if (this.getParameterByName('editMode') === 'widget') {
              // em.set('editorPreview', true)
              this.editor.set('editorPreview', true);
              var that = this;

              var fctEnablePreview = function(newCtr) {
                if (newCtr  >= 100) {
                  //ah
                //  console.log('HARD STOP')
                  return
                }
                var tmp = $("#previewIframe").contents().find('body')
                console.log('tmp is')
                console.log(tmp)
                if (tmp.length <= 0) {
                  // console.log('tmp is NOT VALID')
                  setTimeout(function() {
                    fctEnablePreview(++newCtr)
                  }, 1200);
                } else {
                  // console.log('tmp is VALID')
                  that.enablePreviewMode();
                  that.editor.triggerPreviewMode();
                }
              }
              setTimeout(fctEnablePreview(1), 500);
          }
      }


      console.log('after load completed')
      console.log($("#previewIframe"));
//      $("#previewIframe").attr('src','http://www.google.ca')

      /*$("#editorIframe").css({ 'min-height': '50%', 'height': '50%!important' });
      $("#previewIframe").css({ 'min-height': '50%', 'height': '50%!important' });*/
    },

    render() {
      var tmp = editorView.render().el;
      window.editorInitialized=true;
      console.error("COP1");
      em.get('DomComponents').setComponentOrig(this.getComponents());
      em.get('DomComponents').setHeadComponentOrig(this.getHeadComponents());

      //this.setComponentsOrig(this.getComponents());
    },

  };

};
