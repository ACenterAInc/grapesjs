module.exports = () => {
  var c = {},
  defaults = require('./config/config'),
  Leftmenu = require('./model/Leftmenu'),
  LeftmenuView = require('./view/LeftmenuView');
  var leftmenu;

  return {

    /**
     * Used inside RTE
     * @private
     */
    getLeftmenuView() {
      return LeftmenuView;
    },

    /**
     * Name of the module
     * @type {String}
     * @private
     */
    name: 'Leftmenu',

    /**
     * Initialize module. Automatically called with a new instance of the editor
     * @param {Object} config Configurations
     */
    init(config) {
      c = config || {};
      for (var name in defaults) {
        if (!(name in c))
          c[name] = defaults[name];
      }

      var ppfx = c.pStylePrefix;
      if(ppfx)
        c.stylePrefix = ppfx + c.stylePrefix;

      leftmenu = new Leftmenu(config);
      LeftmenuView	= new LeftmenuView({
        model: leftmenu,
        config: c,
      });

      var cm = c.em.get('DomComponents');
      if(cm)
        this.setWrapper(cm);

      return this;
    },

    /**
     * Add wrapper
     * @param	{Object}	wrp Wrapper
     *
     * */
    setWrapper(wrp) {
      leftmenu.set('wrapper', wrp);
    },

    /**
     * Returns canvas element
     * @return {HTMLElement}
     */
    getElement() {
      return LeftmenuView.el;
    },

    /**
    /**
     * Render canvas
     * */
    render() {
      return LeftmenuView.render().el;
    },

    /**
     * Get frame position
     * @return {Object}
     * @private
     */
    getOffset() {
      /*
      var frameOff = this.offset(this.getFrameEl());
      var canvasOff = this.offset(this.getElement());
      return {
        top: frameOff.top - canvasOff.top,
        left: frameOff.left - canvasOff.left
      };
      */
    },

    /**
    * Get the offset of the element
    * @param  {HTMLElement} el
    * @return {Object}
    * @private
    */
    offset(el) {
      /*
      var rect = el.getBoundingClientRect();
      return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
      };
      */
    },

    /**
     * Get element position relative to the canvas
     * @param {HTMLElement} el
     * @return {Object}
     */
    getElementPos(el, opts) {
      //return CanvasView.getElementPos(el, opts);
      return;
    },

    /**
     * This method comes handy when you need to attach something like toolbars
     * to elements inside the canvas, dealing with all relative position,
     * offsets, etc. and returning as result the object with positions which are
     * viewable by the user (when the canvas is scrolled the top edge of the element
     * is not viewable by the user anymore so the new top edge is the one of the canvas)
     *
     * The target should be visible before being passed here as invisible elements
     * return empty string as width
     * @param {HTMLElement} target The target in this case could be the toolbar
     * @param {HTMLElement} element The element on which I'd attach the toolbar
     * @param {Object} options Custom options
     * @param {Boolean} options.toRight Set to true if you want the toolbar attached to the right
     * @return {Object}
     */
    getTargetToElementDim(target, element, options) {
      /*
      var opts = options || {};
      var canvasPos = CanvasView.getPosition();
      var pos = opts.elPos || CanvasView.getElementPos(element);
      var toRight = options.toRight || 0;
      var targetHeight = opts.targetHeight || target.offsetHeight;
      var targetWidth = opts.targetWidth || target.offsetWidth;
      var eventToTrigger = opts.event || null;

      var elTop = pos.top - targetHeight;
      var elLeft = pos.left;
      elLeft += toRight ? pos.width : 0;
      elLeft = toRight ? (elLeft - targetWidth) : elLeft;

      var leftPos = elLeft < canvasPos.left ? canvasPos.left : elLeft;
      var topPos = elTop < canvasPos.top ? canvasPos.top : elTop;
      topPos = topPos > (pos.top + pos.height) ? (pos.top + pos.height) : topPos;

      var result = {
        top: topPos,
        left: leftPos,
        elementTop: pos.top,
        elementLeft: pos.left,
        elementWidth: pos.width,
        elementHeight: pos.height,
        targetWidth: target.offsetWidth,
        targetHeight: target.offsetHeight,
        canvasTop: canvasPos.top,
        canvasLeft: canvasPos.left,
      };

      // In this way I can catch data and also change the position strategy
      if(eventToTrigger && c.em) {
        c.em.trigger(eventToTrigger, result);
      }

      return result;
      */
    },
    /**
     * Returns wrapper element
     * @return {HTMLElement}
     * ????
     */
    getFrameWrapperEl() {
      //return CanvasView.frame.getWrapper();
      return;
    },
  };
};
