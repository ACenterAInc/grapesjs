var Backbone = require('backbone');
var ComponentsView = require('./ComponentsView');

module.exports = Backbone.View.extend({

  events: {
    'click': 'initResize',
  },

  className() {
    return this.getClasses();
  },

  tagName() {
    return this.model.get('tagName');
  },

  initialize(opt) {
    var model = this.model;
    this.opts = opt || {};
    this.config = this.opts.config || {};
    this.em = this.config.em || '';
    this.pfx = this.config.stylePrefix || '';
    this.ppfx = this.config.pStylePrefix || '';
    this.components = model.get('components');
    this.attr = model.get("attributes");
    this.classe = this.attr.class || [];
    this.listenTo(model, 'destroy remove', this.removeTmp);
    this.listenTo(model, 'change:style', this.updateStyle);
    this.listenTo(model, 'change:attributes', this.updateAttributes);
    this.listenTo(model, 'change:status', this.updateStatus);
    this.listenTo(model, 'change:state', this.updateState);
    this.listenTo(model, 'change:script', this.render);
    this.listenTo(model, 'change', this.handleChange);
    this.listenTo(model.get('classes'), 'add remove change', this.updateClasses);
    this.$el.data('model', model);
    model.view = this;
    this.$el.data("collection", this.components);

    if(model.get('classes').length)
      this.importClasses();

    this.init();
  },

  removeTmp: function() {
    //alert('got removed obj');
    this.remove();
  },
  /**
   * Initialize callback
   */
  init() {},

  /**
   * Handle any property change
   * @private
   */
  handleChange() {
    var em = this.em;
    if(em) {
      var model = this.model;
      em.trigger('component:update', model);

      for(var prop in model.changed) {
        em.trigger('component:update:' + prop, model);
      }
    }
  },

  /**
   * Import, if possible, classes inside main container
   * @private
   * */
  importClasses() {
    var clm = this.config.em.get('SelectorManager');

    if(clm){
      this.model.get('classes').each(m => {
          clm.add(m.get('name'));
      });
    }
  },

  /**
   * Fires on state update. If the state is not empty will add a helper class
   * @param  {Event} e
   * @private
   * */
  updateState(e) {
    var cl = 'hc-state';
    var state = this.model.get('state');

    if(state){
      this.$el.addClass(cl);
    }else{
      this.$el.removeClass(cl);
    }
  },

  /**
   * Update item on status change
   * @param  {Event} e
   * @private
   * */
  updateStatus(e) {
    var el = this.el;
    var status = this.model.get('status');
    var pfx = this.pfx;
    var ppfx = this.ppfx;
    var selectedCls = pfx + 'selected';
    var selectedParentCls = selectedCls + '-parent';
    var freezedCls = `${ppfx}freezed`;
    var actualCls = el.getAttribute('class') || '';
    var cls = '';

    console.log('TEST SEL')
    switch (status) {
        case 'selected':

          // HERE FIX SELECTED
          console.log('<<<<< HEAD selected of a')
          console.log('selected of a')
          console.log('selected of a 1')
          console.log('selected of a 1')
          console.log(this.model);
          console.log(this.model.$el);
          try {
              if (window.editor.getConfig().tagEditorOnly) {
                console.log('CLOSES PARTIAL IS')
                var thePartial = $($("#editorIframe").contents().find(this.model.view.$el).closest("[partial]")).attr('partial')
                console.log('DATA PARAM IS')

                var theDataParamObj = $($("#editorIframe").contents().find(this.model.view.$el).closest("[data-param]"));
                var theObject = theDataParamObj.attr('data-param');

                if (! $(".gjs-pn-btn.fa.fa-paint-brush").hasClass('gjs-pn-active') ) {
                  $(".gjs-pn-btn.fa.fa-paint-brush").trigger('click');
                }

                console.error('Partial is:');
                console.error(thePartial + " [ " + theObject + " ] ");
              }
          } catch (ew) {
              console.error('COULDNT SELECT ELEMENT TO EDIT...');
              console.error(ew.stack);
          }

          /*
          console.log('selected of a')
          console.log(this.$el)
          console.log(this.model)

          console.log("MOUSE OVER");
          var isValid = true;
          if (window.editor.getConfig().tagEditorOnly) {
            console.log('selected of b')
            console.log('selected of d')
            console.log(this);
            //if (!(this.attr.hasOwnProperty('data-param')('data-highlightable') >= 0)) {
            console.log(this.$el);
            if (!(this.$el.attr('data-highlightable') >= 0)) {
              isValid = false;
            }
          }

          if (isValid) {
            // only allow selection if tagEditor restriction then validate its highlitable ...
            console.log("IS VALID YEAH...");
            this.$el.addClass(pfx + 'selected');
          } else {
            console.log('not sel');
          }


          console.log('CLOSES PARTIAL IS')
          console.log($($("#editorIframe").contents().find(".gjs-comp-selected").closest("[partial]")).attr('partial'))
          console.log('DATA PARAM IS')
          console.log($($("#editorIframe").contents().find(".gjs-comp-selected").closest("[data-param]")).attr('data-param'))

            break;
        case 'moving':
            break;
*/

          cls = `${actualCls} ${selectedCls}`;
          break;
        case 'selected-parent':
          cls = `${actualCls} ${selectedParentCls}`;
          break;
        case 'freezed':
          cls = `${actualCls} ${freezedCls}`;
          break;
        default:
          this.$el.removeClass(`${selectedCls} ${selectedParentCls} ${freezedCls}`);
    }

    cls = cls.trim();

    if (cls) {
      el.setAttribute('class', cls);
    }
  },

  /**
   * Get classes from attributes.
   * This method is called before initialize
   *
   * @return  {Array}|null
   * @private
   * */
  getClasses() {
    var attr = this.model.get("attributes"),
      classes  = attr['class'] || [];
    if(classes.length){
      return classes.join(" ");
    }else
      return null;
  },

  /**
   * Update attributes
   * @private
   * */
  updateAttributes() {
    var model = this.model;
    var attributes = {},
      attr = model.get("attributes");
    for(var key in attr) {
        if(attr.hasOwnProperty(key))
          attributes[key] = attr[key];
    }

    // Update src
    if(model.get('src'))
      attributes.src = model.get('src');

    //if(model.get('highlightable')) {
      if (window.editor.getConfig().tagEditorOnly) {
        console.log('component model');
        console.log(model);
        console.log(attributes);
        attributes['component-hash'] = model.cid;
        window.components_hash = window.components_hash || {};

        attr['component-hash'] = model.cid;
        window.components_hash[model.cid] = model;

        console.log('test highlight of')
          try {
           //if (attr.hasOwnProperty('this.$el.length > 0) {

            //Mark highlightable only if has data-param

            if (this.attr.hasOwnProperty('partial')) {
              attributes['data-highlightable'] = 1;
              model.set('editable', true)
              model.set('highlightable', true);//default value
              model.set('draggable',false);
              model.set('resizable',false);
              model.set('removable',false);
              model.set('copyable',false);
              model.set('badgable',false);

            } else if (this.attr.hasOwnProperty('data-param')) {
              console.log('does it has data-highlightable YESS?')
              attributes['data-highlightable'] = 1;
              model.set('editable', true);
              model.set('highlightable', true);//default value
              model.set('draggable',false);
              model.set('resizable',false);
              model.set('removable',false);
              model.set('copyable',false);
              model.set('badgable',false);
            } else {
              model.set('editable', false);
              model.set('highlightable', false);
              /*model.set('draggable',false);
              model.set('resizable',false);
              model.set('removable',false);
              model.set('copyable',false);
              model.set('badgable',false);
              */
            }

          //}
        } catch (eea) {
          console.error(eea.stack);
        }
      } else {
        //mark all items highlitable defualt behavior
        attributes['data-highlightable'] = 1;
      }
  //  }

    var styleStr = this.getStyleString();

    if(styleStr)
      attributes.style = styleStr;

    this.$el.attr(attributes);
  },

  /**
   * Update style attribute
   * @private
   * */
  updateStyle() {
    this.$el.attr('style', this.getStyleString());
  },

  /**
   * Return style string
   * @return  {string}
   * @private
   * */
  getStyleString() {
    var style  = '';
    this.style = this.model.get('style');
    for(var key in this.style) {
        if(this.style.hasOwnProperty(key))
          style += key + ':' + this.style[key] + ';';
    }

    return style;
  },

  /**
   * Update classe attribute
   * @private
   * */
  updateClasses() {
    var str = '';

    this.model.get('classes').each(model => {
      str += model.get('name') + ' ';
    });
    str = str.trim();

    if(str)
      this.$el.attr('class', str);
    else
      this.$el.removeAttr('class');

    // Regenerate status class
    this.updateStatus();
  },

  /**
   * Reply to event call
   * @param object Event that generated the request
   * @private
   * */
  eventCall(event) {
    event.viewResponse = this;
  },

  /**
   * Init component for resizing
   */
  initResize() {
    /*
    console.log('INIT RESIZE HERE A');
    console.log(this);
    console.log(this.model);
    console.log(this.model.get('highlightable'));*/
    if (!this.model.get('highlightable')) {
        return;
    }

    var em = this.opts.config.em;
    var editor = em ? em.get('Editor') : '';
    var config = em ? em.get('Config') : '';
    var pfx = config.stylePrefix || '';
    var attrName = 'data-' + pfx + 'handler';
    var resizeClass = pfx + 'resizing';
    var model = this.model;
    var modelToStyle;

    var toggleBodyClass = (method, e, opts) => {
      var handlerAttr = e.target.getAttribute(attrName);
      var resizeHndClass = pfx + 'resizing-' + handlerAttr;
      var classToAdd = resizeClass;// + ' ' +resizeHndClass;
      if (opts.docs) {
        opts.docs.find('body')[method](classToAdd);
      }
    };

    if(editor && this.model.get('resizable')) {
      editor.runCommand('resize', {
        el: this.el,
        options: {
          onStart(e, opts) {
            toggleBodyClass('addClass', e, opts);
            modelToStyle = em.get('StyleManager').getModelToStyle(model);
          },
          // Update all positioned elements (eg. component toolbar)
          onMove() {
            editor.trigger('change:canvasOffset');
          },
          onEnd(e, opts) {
            toggleBodyClass('removeClass', e, opts);
            editor.trigger('change:canvasOffset');
          },
          updateTarget(el, rect, store) {
            if (!modelToStyle) {
              return;
            }
            var unit = 'px';
            var style = _.clone(modelToStyle.get('style'));
            var width = rect.w + (store ? 1 : 0);
            style.width = width + unit;
            style.height = rect.h + unit;
            modelToStyle.set('style', style, {avoidStore: 1});
            em.trigger('targetStyleUpdated');

            // This trick will trigger the Undo Manager. To trigger "change:style"
            // on the Model you need to provide a new object and after that
            // Undo Manager will trigger only if values are different (this is why
            // above I've added + 1 to width if store required)
            if(store) {
              var style3 = _.clone(style);
              style3.width = (width - 1) + unit;
              modelToStyle.set('style', style3);
            }
          }
        }
      });
    }
  },

  /**
   * Prevent default helper
   * @param  {Event} e
   * @private
   */
  prevDef(e) {
    e.preventDefault();
  },

  /**
   * Render component's script
   * @private
   */
  updateScript() {
    if (!this.model.get('script')) {
      return;
    }

    var em = this.em;
    if(em) {
      var canvas = em.get('Canvas');
      canvas.getCanvasView().updateScript(this);
    }
  },

  /**
   * Return children container
   * Differently from a simple component where children container is the
   * component itself
   * <my-comp>
   *  <!--
   *    <child></child> ...
   *   -->
   * </my-comp>
   * You could have the children container more deeper
   * <my-comp>
   *  <div></div>
   *  <div></div>
   *  <div>
   *    <div>
   *      <!--
   *        <child></child> ...
   *      -->
   *    </div>
   *  </div>
   * </my-comp>
   * @return HTMLElement
   * @private
   */
  getChildrenContainer() {
    var container = this.el;

    if (typeof this.getChildrenSelector == 'function') {
      container = this.el.querySelector(this.getChildrenSelector());
    } else if (typeof this.getTemplate == 'function') {
      // Need to find deepest first child
    }

    return container;
  },

  /**
   * Render children components
   * @private
   */
  renderChildren() {
    var view = new ComponentsView({
      collection: this.model.get('components'),
      config: this.config,
      defaultTypes: this.opts.defaultTypes,
      componentTypes: this.opts.componentTypes,
    });

    var container = this.getChildrenContainer();
    var childNodes = view.render($(container)).el.childNodes;
    childNodes = Array.prototype.slice.call(childNodes);

    for (var i = 0, len = childNodes.length ; i < len; i++) {
      container.appendChild(childNodes.shift());
    }

    // If the children container is not the same as the component
    // (so likely fetched with getChildrenSelector()) is necessary
    // to disable pointer-events for all nested components as they
    // might prevent the component to be selected
    if (container !== this.el) {
      var disableNode = el => {
        var children = Array.prototype.slice.call(el.children);
        children.forEach(el => {
          el.style['pointer-events'] = 'none';
          if (container !== el) {
            disableNode(el);
          }
        });
      };
      disableNode(this.el);
    }
  },

  renderAttributes() {
    this.updateAttributes();
    this.updateClasses();
  },

  render() {
    this.renderAttributes();
    var model = this.model;
    var container = this.getChildrenContainer();
    container.innerHTML = model.get('content');
    this.renderChildren();
    this.updateScript();
    return this;
  },

});
