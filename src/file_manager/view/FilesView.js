var Backbone = require('backbone');
//var AssetView = require('./AssetView');
//var AssetImageView = require('./AssetImageView');

//var FileUploader = require('./FileUploader');
var assetsTemplate = `
<div class="<%= pfx %>files-cont">
  <div class="<%= pfx %>assets-header">
    <form class="<%= pfx %>add-asset">
      <div class="<%= ppfx %>label">Page title</div>
      <br/>
      <div class="<%= ppfx %>field <%= pfx %>add-field">
        <input name="title" placeholder="Insert page title here"/>
      </div>
      <br/>
      <br/>&nbsp;<br/>
      <div class="<%= ppfx %>label">Filename</div>
      <div class="<%= ppfx %>field <%= pfx %>add-field">
        <input name="filename" placeholder="index.html"/>
      </div>
      <button class="<%= ppfx %>btn-prim"><%= btnText %></button>
      <div style="clear:both"></div>
    </form>
    <div class="<%= pfx %>dips" style="display:none">
      <button class="fa fa-th <%= ppfx %>btnt"></button>
      <button class="fa fa-th-list <%= ppfx %>btnt"></button>
    </div>
  </div>
  <div class="<%= pfx %>assets"></div>
  <div style="clear:both"></div>
</div>

`;

module.exports = Backbone.View.extend({

  template: _.template(assetsTemplate),

  initialize(o) {
    this.options = o;
    this.config = o.config;
    this.pfx = this.config.stylePrefix || '';
    this.ppfx = this.config.pStylePrefix || '';
    this.listenTo( this.collection, 'add', this.addToAsset );
    this.listenTo( this.collection, 'deselectAll', this.deselectAll );
    this.className  = this.pfx + 'assets';

    this.events = {};
    this.events.submit = 'addFromStr';
    this.delegateEvents();
  },

  /**
   * Add new asset to the collection via string
   * @param {Event} e Event object
   * @return {this}
   * @private
   */
  addFromStr(e) {
    console.error("ADD FROM STR");
    e.preventDefault();

    var title = this.getTitle();
    var input = this.getInputUrl();


    var url = input.value.trim();
    var titleStr = title.value.trim();

    if(!url)
      return;

    this.createFile(url, { title: titleStr });//this.collection.addImg(url, {at: 0});

    //this.getAssetsEl().scrollTop = 0;
    input.value = '';
    title.value = '';

    return this;
  },


  /**
   * Create a new empty
   * @param  {Object}  e Header informations such as title, page etc..
   * @private
   * */
  createFile(filetmp, opts) {
    console.error("Received createFile for file :" + filetmp);
    console.error( opts );

    var file = filetmp;
    var ctr = 0;

    while (filetmp[ctr++] == '/') {
        file = filetmp.substring(1);
    }
    console.error("Post data");
    console.error(postData);
    var postData = {
      filename: file,
      headers: opts
    }

    $("#cms-save").text("Saving");
    $("#cms-save").prop('disabled', true);    
    $.ajax({
      url      : this.config.upload,
      type    : 'POST',
      data    : JSON.stringify(postData),
      beforeSend  : this.config.beforeSend,
      complete  : this.config.onComplete,
      xhrFields  : {
        onprogress(e) {
          if (e.lengthComputable) {
            /*var result = e.loaded / e.total * 100 + '%';*/
          }
        },
        onload(e) {
            //progress.value = 100;
        }
      },
      cache: false, contentType: 'application/json', processData: false
    }).done(data => {
      //target.add(data.data);

      //TODO: Do ajax calls until file gets created / update ?
      $("#cms-save").text("Reloading Page");
      $("#cms-save").prop('disabled', true);

      setTimeout(function() {
        window.location.href = "/" + file;
      }, 2000);

    }).always(() => {
      //turnOff loading
      $("#cms-save").text("Save");
      $("#cms-save").prop('disabled', false);
    });
  },


  /**
   * Returns assets element
   * @return {HTMLElement}
   * @private
   */
  getAssetsEl() {
    //if(!this.assets) // Not able to cache as after the rerender it losses the ref
    this.assets = this.el.querySelector('.' + this.pfx + 'assets');
    return this.assets;
  },

  /**
   * Returns input url element
   * @return {HTMLElement}
   * @private
   */
  getInputUrl() {
    if(!this.inputUrl || !this.inputUrl.value)
      this.inputUrl = this.el.querySelector('.'+this.pfx+'add-asset input[name=filename]');
    return this.inputUrl;
  },

  getTitle() {
    if(!this.title || !this.title.value)
      this.title = this.el.querySelector('.'+this.pfx+'add-asset input[name=title]');
    return this.title;
  },

  /**
   * Add asset to collection
   * @private
   * */
  addToAsset(model) {
    this.addAsset(model);
  },

  /**
   * Add new asset to collection
   * @param Object Model
   * @param Object Fragment collection
   * @return Object Object created
   * @private
   * */
  addAsset(model, fragmentEl) {
    console.log("add asset test");
    /*
    var fragment  = fragmentEl || null;
    var viewObject  = AssetView;

    if(model.get('type').indexOf("image") > -1)
      viewObject  = AssetImageView;

    var view     = new viewObject({
      model,
      config  : this.config,
    });
    var rendered  = view.render().el;

    if(fragment){
      fragment.appendChild( rendered );
    }else{
      var assetsEl = this.getAssetsEl();
      if(assetsEl)
        assetsEl.insertBefore(rendered, assetsEl.firstChild);
    }

    return rendered;
    */
    return null;
  },

  /**
   * Deselect all assets
   * @private
   * */
  deselectAll() {
    this.$el.find('.' + this.pfx + 'highlight').removeClass(this.pfx + 'highlight');
  },

  render() {
    var fragment = document.createDocumentFragment();
    this.$el.empty();

    this.collection.each(function(model){
      this.addAsset(model, fragment);
    },this);

    this.$el.html(this.template({
      pfx: this.pfx,
      ppfx: this.ppfx,
      btnText: this.config.addBtnText,
    }));

    this.$el.find('.'+this.pfx + 'assets').append(fragment);
    return this;
  }
});
