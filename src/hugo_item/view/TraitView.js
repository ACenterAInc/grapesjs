var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  events:{
    'change': 'onChange'
  },

  initialize(o) {
    console.error('init here a');
    var md = this.model;
    console.error('MODEL? TEST FIX?');
    console.error(md);
    if (md === undefined) {
      console.error(md);
      md = window.editor.editor.get('selectedComponent');
    }

    this.config = o.config || {};
    this.pfx = this.config.stylePrefix || '';
    this.ppfx = this.config.pStylePrefix || '';
    console.error('init here b');
    this.target = md.target;
    this.className = this.pfx + 'trait';
    console.error('init here c');
    this.labelClass = this.ppfx + 'label';
    this.fieldClass = this.ppfx + 'field ' + this.ppfx + 'field-' + md.get('type');
    this.inputhClass = this.ppfx + 'input-holder';
    console.error('init here d');
    md.off('change:value', this.onValueChange);

    console.error('init here g');

    var label = this.getLabel();
    if (label == 'CId') { // cid 'c999' cid =  id =

    } else {
      this.listenTo(md, 'change:value', this.onValueChange);
    }
    console.error('init here h');
    this.tmpl = '<div class="' + this.fieldClass +'"><div class="' + this.inputhClass +'"></div></div>';
  },

  /**
   * Fires when the input is changed
   * @private
   */
  onChange() {
    this.model.set('value', this.getInputEl().value);
  },

  getValueForTarget() {
    return this.model.get('value');
  },

  /**
   * On change callback
   * @private
   */
  onValueChange() {
    var m = this.model;
    var trg = this.target;
    var name = m.get('name');
    name = 'Text';
    var value = this.getValueForTarget();
    // Chabge property if requested otherwise attributes
    console.error(m);
    console.error('changing ?');
    console.error(value);
    if(m.get('changeProp')){
      m.set(name,value);//set(name, value);
      m['content']=value;
      alert('a2');
    }else{
      var attrs = _.clone(trg.get('attributes'));
      console.error(attrs);
      attrs[name] = value;
      attrs['content']=value;
      trg['content']=value;
      alert('a1');
      trg.set('attributes', attrs);
    }
    trg.view.$el[0].innerHTML=value;
    //console.error(trg.view);
    //console.error(trg.view.$el);
    console.error(trg);
  },

  /**
   * Render label
   * @private
   */
  renderLabel() {
    this.$el.html('<div class="' + this.labelClass + '">' + this.getLabel() + '</div>');
  },

  /**
   * Returns label for the input
   * @return {string}
   * @private
   */
  getLabel() {
    try {
      console.error('model?');
      var model = this.model;
      var label = model.get('label') || model.get('name');
      var labelN = label.charAt(0).toUpperCase() + label.slice(1).replace(/-/g,' ');
      if (labelN == 'Id') {
        return 'CId';
      }
      return labelN;
    } catch (ef) {
      return 'undef';
    }
  },

  /**
   * Returns input element
   * @return {HTMLElement}
   * @private
   */
  getInputEl() {
    if(!this.$input) {
      console.error('modeltest');
      var md = this.model;
      console.error('modeltest a');
      console.error(md);
      var trg = this.target;
      console.error('trait aa');
      console.error(md);
      console.error(md.attributes);
      console.error(md.attributes.traits);
      // if (trg === null) {
        trg= md.attributes.traits.target;
        this.target = trg;
        trg.set('name','innerHTML');
      // }
      console.error('modeltest b');
      console.error(trg);
      var name = md.get('name');
      var opts = {
        placeholder: md.get('placeholder') || md.get('default'),
        type: md.get('type') || 'text'
      };

      var label = this.getLabel();
      if (label == 'CId') {
        opts['readonly']=true;
        opts['placeholder']= this.target.get('attributes')['custom-name'] || md.cid;
      }

      if(md.get('changeProp')){
        opts.value = trg.get(name);
      }else{
        var attrs = trg.get('attributes');
        opts.value = md.get('value') || attrs[name];
      }
      if(md.get('min'))
        opts.min = md.get('min');
      if(md.get('max'))
        opts.max = md.get('max');
      this.$input = $('<input>', opts);
    }
    return this.$input.get(0);
  },

  getModelValue() {
    var value;
    var model = this.model;
    var target = this.target;
    var name = model.get('name');

    if (model.get('changeProp')) {
      value = target.get(name);
    } else {
      var attrs = target.get('attributes');
      value = model.get('value') || attrs[name];
    }

    return value;
  },

  /**
   * Renders input
   * @private
   * */
  renderField() {
    if(!this.$input){
      this.$el.append(this.tmpl);
      var el = this.getInputEl();



      this.$el.find('.' + this.inputhClass).prepend(el);
    }
  },

  render() {

    console.error('rendering a');

    this.renderLabel();
    console.error('rendering b');
    this.renderField();
    console.error('rendering c');

    this.el.className = this.className;
    return this;
  },

});
