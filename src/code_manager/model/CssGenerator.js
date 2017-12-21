var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

  initialize() {
    this.compCls = [];
  },

  /**
   * Get CSS from component
   * @param {Model} model
   * @return {String}
   */
  buildFromModel(model) {
    var code = '';
    var style = model.get('style');
    var classes = model.get('classes');


    // Let's know what classes I've found
    if(classes) {
      classes.each(function(model){
        //alert(model.get('name'));
        /*
        if (model.get('name') == model.id) {
          if (window.preventUpdates === undefined) { //window.preventUpdates == false) {
            this.compCls.push('gen_' + window.editor.md5prefix+"_" +model.id);
          } else {
            this.compCls.push('g_' + window.editor.md5prefix+"_" +model.id);
          }
        } else {
          this.compCls.push(model.get('name'));
        }
        */
        this.compCls.push(model.get('name'));
      }, this);
    }

    if(style && Object.keys(style).length !== 0) {
      //if (window.editor !== undefined) {
      /*if (window.preventUpdates === undefined) { //window.preventUpdates == false) {
        code += '.gen_' + window.editor.md5prefix+"_" +model.id + '{';
        for(var prop in style){
          if(style.hasOwnProperty(prop))
            code += prop + ':' + style[prop] + ';';
        }
        code += '}';
      } else {
        code += '.g_' + window.editor.md5prefix+"_" +model.id + '{';
        for(var prop in style){
          if(style.hasOwnProperty(prop))
            code += prop + ':' + style[prop] + ';';
        }
        code += '}';
      }

      */
      //code += ".aaaaaaaaaaaaaaA{}"
      // console.error("THEKEKJLKS");
      // console.error(model);
      if (!(model.get('name') === undefined)) {
          code += "." + model.get('name') + '{';
          for(var prop in style){
            if(style.hasOwnProperty(prop))
              code += prop + ':' + style[prop] + ';';
          }
          code += '}';
      } else {
        if (window.editor !== undefined) {
          code += "." + 'gId_' + window.editor.md5prefix + "-" + model.cid + '{';
          for(var prop in style){
            if(style.hasOwnProperty(prop))
              code += prop + ':' + style[prop] + ';';
          }
          code += '}';
        }
      }
      //} else {

      //}

      //} else {
        /*if (window.editorInitialized) {
          code += '.g_' + window.editor.md5prefix+"_" +model.cid + '{';
          for(var prop in style){
            if(style.hasOwnProperty(prop))
              code += prop + ':' + style[prop] + ';';
          }
          code += '}';
        }*/
      //}
    }

    // // console.error("CODE IS");
    // // console.error(code);
    return code;
  },

  /**
   * Get CSS from components
   * @param {Model} model
   * @return {String}
   */
  buildFromComp(model) {
    var coll = model.get('components') || model,
      code = '';

    coll.each(function(m) {
      var cln = m.get('components');
      code += this.buildFromModel(m);

      if(cln.length){
        code += this.buildFromComp(cln);
      }

    }, this);

    return code;
  },

  /** @inheritdoc */
  build(model, cssc) {
    this.compCls = [];
    var code = this.buildFromModel(model);
    code += this.buildFromComp(model);
    var compCls = this.compCls;

    if(cssc){
      var rules = cssc.getAll();
      var mediaRules = {};
      rules.each(function(rule) {
        var width = rule.get('mediaText');

        // If width setted will render it later
        if(width){
          var mRule = mediaRules[width];
          if(mRule)
            mRule.push(rule);
          else
            mediaRules[width] = [rule];
          return;
        }

        code += this.buildFromRule(rule);
      }, this);

      // Get media rules
      for (var ruleW in mediaRules) {
        var meRules = mediaRules[ruleW];
        var ruleC = '';
        for(var i = 0, len = meRules.length; i < len; i++){
          ruleC += this.buildFromRule(meRules[i]);
        }

        if (ruleC) {
          code += '@media ' + ruleW + '{' + ruleC + '}';
        }
      }

    }
    return code;
  },

  /**
   * Get CSS from the rule model
   * @param {Model} rule
   * @return {string} CSS string
   */
  buildFromRule(rule) {
    var result = '';
    var selectorsAdd = rule.get('selectorsAdd');
    var selectors = rule.get('selectors');
    var ruleStyle = rule.get('style');
    var state = rule.get('state');
    var strSel = '';
    var found = 0;
    var compCls = this.compCls;

    // Get string of selectors
    selectors.each(selector => {
      //// console.error("TTT" + '.' + selector.get('name'));
      // console.error(selector);

      strSel += '.';// + selector.get('name');
      /*
      // console.error(selector.attributes.name +" vs" + selector.attributes.name + " and " + selector.id);
      if (selector.get('name') == selector.id) {
        if (window.preventUpdates === undefined) { //window.preventUpdates == false) {
          strSel += 'gen_' + window.editor.md5prefix+"_"+selector.id;
        } else {
          //this.compCls.push('g_' + window.editor.md5prefix+"_" +selector.id);
          strSel += 'g_' + window.editor.md5prefix+"_"+selector.id;
        }
      } else {
        strSel += selector.get('name');  //.c999  cid = id =
      }
      */
      // console.error(selector);
      // console.error("NAME IS :"+ selector.get('name'));
      strSel += selector.get('name');  //.c999  cid = id =


      if(compCls.indexOf(selector.get('name')) > -1)
        found = 1;
    });

    // With 'found' will skip rules which selectors are not found in
    // canvas components.
    if ((strSel && found) || selectorsAdd) {
      strSel += state ? ':' + state : '';
      strSel += selectorsAdd ? (strSel ? ', ' : '') + selectorsAdd : '';
      var strStyle = '';

      // Get string of style properties
      if(ruleStyle && Object.keys(ruleStyle).length !== 0){
        for(var prop2 in ruleStyle){
          if(ruleStyle.hasOwnProperty(prop2))
            strStyle += prop2 + ':' + ruleStyle[prop2] + ';';
        }
      }

      if(strStyle)
        result += strSel + '{' + strStyle + '}';
    }

    return result;
  },

});
