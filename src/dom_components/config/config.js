module.exports = {
  stylePrefix: 'comp-',

  wrapperId: 'wrapper',

  // Default wrapper configuration
  wrapper: {
    //classes: ['body'],
    removable: false,
    copyable: false,
    stylable: ['background','background-color','background-image', 'background-repeat','background-attachment','background-position'],
    draggable: false,
    badgable: false,

    heads: [],
    heads_ori: [],

    components: [],
    components_ori: [],
  },

  // Could be used for default components
  components: [],
  // Could be used for default components
  heads: [],

  rte: {},

  // Class for new image component
  imageCompClass  : 'fa fa-picture-o',

  // Open assets manager on create of image component
  oAssetsOnCreate  : true,

  // List of void elements
  voidElements: ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'],
};
