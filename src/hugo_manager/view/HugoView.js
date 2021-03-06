var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  template: _.template(`
    <div class="<%= ppfx %>hugo-label"></div>
    <button id='cms-save' style="display:block" class="<%= ppfx %>add-trasp">Save</button>`),

  events:{
      'click': 'handleClick'
  },


  initialize(o) {

    this.config = o.config || {};
    this.em = this.config.em;
    this.ppfx = this.config.pStylePrefix || '';

    //this.events['click .' + this.ppfx + 'add-trasp'] = this.startAdd;
    //this.listenTo(this.em, 'change:device', this.updateSelect);
    this.delegateEvents();
  },

  /**
   * Start adding new device
   * @return {[type]} [description]
   * @private
   */
  startAdd() {},

  handleClick() {
     var onClick = this.config.onClick;
     var model = this.model;
     //alert('save all the layouts ???');
     $("#cms-save").text("Saving");
     $("#cms-save").prop('disabled', true);
     console.log('handle click 111');
     if (window.preventUpdates !== undefined) {
         console.log('handle click 222');

        //will wrap between <html>
          //will wrap between <head>
          var headContent = editor.getHead();
          //will wrap between </head>
          //will wrap between <body>
          var htmlContent = editor.getHtml();
          //will wrap between </body>
        //will wrap between </html>

        //will wrap between <style>
        var cssContent = editor.getCss();
        ////will wrap between <style>

        console.error("Will save of : " + window.window.preventUpdates.get('name'))
        this.updateCssFile(window.window.preventUpdates.get('name'), htmlContent, cssContent);
        //this is the block name ie: window.window.preventUpdates.get('name') = b37  (for b37.yml)
        //console.error(window.component_edit.get('name'));
        //window.location.href=window.location.href;
     } else {
       console.log('handle click 333');
       console.log('is preview?');
       console.log(window.editor.getConfig().previewIframeVisible);
       if (window.editor.getConfig().tagEditorOnly) {
          alert('IN TAG ONLY MODE HUGO TEMPLATES');
          $("#cms-save").text("Save");
          $("#cms-save").prop('disabled', false);

          var modelsToSave = [];

          var recurFct = function(currentModels, acc) {
            var len = currentModels.length;
            // console.error('got curr models');
            // console.error(currentModels)
            for( var i = 0; i < len; i++) {
               var modelTmp = currentModels[i];
               // console.error('does it has change counmt?')
               //console.error(modelTmp.get('changesCount'))
               // console.error(modelTmp.attributes);
               if (modelTmp.get('changesCount')>0) {

                 console.log(modelTmp);
                 for(var k in modelTmp.changed) {
                   if (k === 'changesCount') {

                   } else {
                     alert("Model " + modelTmp.attributes.attributes['data-param'] + " was updated. TODO: Save the Config or parameter change of attribute " + k + " to " + modelTmp.changed[k]);
                   }
                 }

                 acc.push(modelTmp);
               }
               recurFct(modelTmp.components.models, acc)
            }
          }

          recurFct(grapesjs.editors[0].DomComponents.getComponents().models, modelsToSave)

          // console.error("FINAL");
          // console.error(modelsToSave);
          var lenSave = modelsToSave.length;
          for (var z = 0 ; z < lenSave; z++) {
            console.error('OBJECT IS MODIFIED')
            console.error(modelsToSave[z])
            console.error(modelsToSave[z].view)
            console.error(modelsToSave[z].view.$el)

          }
          /*var lstModels = grapesjs.editors[0].DomComponents.getComponents().models;
          var len = lstModels.length;


          for( var i = 0; i < len; i++) {
             var modelTmp = lstModels[i];

             //if (modelTmp.get('createdComponent')>0) {
            //   alert('created');
             //}
             console.error(modelTmp.attributes);
             if (modelTmp.get('changesCount')>0) {
               console.log("Model " + modelTmp.cid + " was updated. Will save ....");
               console.log(modelTmp);
               modelsToSave.push(modelTmp);
             }
          }
          */

       } else {

              if (window.editor.getConfig().previewIframeVisible) {
                    console.log('TODO: SUBMIT NEW YAML CONTENT');
                    // console.log($("#codeEditIframe").contents().find('body').find("#injectHere"));
                    // console.log($("#codeEditIframe").contents().find('body').find("#injectHere"));


                    var htmlContent = $("#codeEditIframe").contents().find('body').find("#injectHere").val();

                    this.updateWidgetFile(window.location.pathname.replace("/widgetedit/",""), headContent, htmlContent, cssContent);


              } else {
//$("#previewIframe")???
               console.log('handle click 444');
               /*
               $("#cms-save").text("Save");
               $("#cms-save").prop('disabled', false);
               */

               //will wrap between <html>
                 //will wrap between <head>
                 var headContent = editor.getHead();
                 //will wrap between </head>
                 //will wrap between <body>
                 var htmlContent = editor.getHtml();
                 //will wrap between </body>
               //will wrap between </html>

               //will wrap between <style>
               var cssContent = editor.getCss();
               ////will wrap between <style>


               console.error(this);
               //this is bad..
               var lstModels = grapesjs.editors[0].DomComponents.getComponents().models;
               var len = lstModels.length;
               var modelsToSave = [];


               //IN HERE WE GOT ALL COMPONENTS BY ARRAY
               //components_ori
               //IN HERE WE GOT ALL ORIG COMPONENTS BY HASH
               //components_ori_hash
               for( var i = 0; i < len; i++) {
                  var modelTmp = lstModels[i];
                  console.log("CREATED?");
                  modelTmp.get('createdComponent');
                  /*if (modelTmp.get('createdComponent')>0) {
                    alert('created');
                  } else {

                  }*/
                  if (modelTmp.get('changesCount')>0) {
                    console.log("Model " + modelTmp.cid + " was updated. Will save.");
                    modelsToSave.push(modelTmp);
                  }
               }
               //todo: Check any components that doesnt exists anymore from from the components_ori  ... by using the editor.getComponents() and comparing active one vs old ones?


               //Oh well we dont do incremental.. since this is static we fully update the HTML based on these getHtml, getCss and getHead content..
               this.updateStaticFile(window.location.pathname, headContent, htmlContent, cssContent);


               /*model.collection.trigger('deselectAll');
               this.$el.addClass(this.pfx + 'highlight');

               if (typeof onClick === 'function') {
                 onClick(model);
               } else {
                 this.updateTarget(model.get('src'));
               }
               */
             }
           }
       }
  },



  /**
   * Upload files
   * @param  {Object}  e Event
   * @private
   * */
  updateWidgetFile(filetmp, headContent, htmlContent, cssContent) {

    console.error("Received saveWigetFile for file :" + filetmp);

    var isOk = false;
    var file = filetmp;
    var ctr = 0;

    while (filetmp[ctr++] == '/') {
        file = filetmp.substring(1);
    }
    console.error("Update Widget file.");

    var elementType = 'widget'
    /*if (file.indexOf("widgetedit/") == 0) {
      file = file.substring(11)
      elementType = 'widget'
    }*/

    var postData = {
      filename: file,
      head: headContent,
      html: htmlContent,
      css: cssContent,
      type: elementType,
    }


    console.error(postData);

    // alert(window.editor.apiUrl);
    //widgetedit


    $.ajax({
      url      : window.editor.apiUrl + this.config.fileupdate,
      type    : 'POST',
      data    : JSON.stringify(postData),
      beforeSend  : this.config.beforeSend,
      complete  : function(e) {
      },
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

      isOk = true;
      $("#cms-save").text("Reloading...");
      $("#cms-save").prop('disabled', true);
      //TODO: Do ajax calls until file gets created / update ?
      setTimeout(function() {
        window.location.href = window.location.href;
      }, 2000);
    }).always(() => {
      //turnOff loading
      if (!isOk) {
        $("#cms-save").text("Save");
        $("#cms-save").prop('disabled', false);
      }
    });
  },
  /**
   * Upload files
   * @param  {Object}  e Event
   * @private
   * */
  updateStaticFile(filetmp, headContent, htmlContent, cssContent) {

    console.error("Received saveStaticFile for file :" + filetmp);

    var isOk = false;
    var file = filetmp;
    var ctr = 0;

    while (filetmp[ctr++] == '/') {
        file = filetmp.substring(1);
    }
    console.error("Update Static data.");

    var elementType = 'static_html'
    if (file.indexOf("widgetedit/") == 0) {
      file = file.substring(11)
      elementType = 'widget'
    }
    var postData = {
      filename: file,
      head: headContent,
      html: htmlContent,
      css: cssContent,
      type: elementType,
    }


    console.error(postData);

    // alert(window.editor.apiUrl);
    //widgetedit


    $.ajax({
      url      : window.editor.apiUrl + this.config.fileupdate,
      type    : 'POST',
      data    : JSON.stringify(postData),
      beforeSend  : this.config.beforeSend,
      complete  : function(e) {
      },
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

      isOk = true;
      $("#cms-save").text("Reloading...");
      $("#cms-save").prop('disabled', true);
      //TODO: Do ajax calls until file gets created / update ?
      setTimeout(function() {
        window.location.href = window.location.href;
      }, 2000);
    }).always(() => {
      //turnOff loading
      if (!isOk) {
        $("#cms-save").text("Save");
        $("#cms-save").prop('disabled', false);
      }
    });
  },

  /**
   * Upload files
   * @param  {Object}  e Event
   * @private
   * */
  updateCssFile(filetmp, htmlContent, cssContent) {

    console.error("Received createFile for file :" + filetmp);

    var isOk = false;
    var file = filetmp;
    var ctr = 0;

    while (filetmp[ctr++] == '/') {
        file = filetmp.substring(1);
    }
    console.error("Update Block data.");
    console.error(postData);
    var postData = {
      filename: file,
      html: htmlContent,
      css: cssContent,
      type: 'static_block'
    }

    $.ajax({
      url      : window.editor.apiUrl + this.config.fileupdate,
      type    : 'POST',
      data    : JSON.stringify(postData),
      beforeSend  : this.config.beforeSend,
      complete  : function(e) {
      },
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

      isOk = true;
      $("#cms-save").text("Reloading...");
      $("#cms-save").prop('disabled', true);
      //TODO: Do ajax calls until file gets created / update ?
      setTimeout(function() {
        window.location.href = window.location.href;
      }, 2000);

    }).always(() => {
      //turnOff loading
      if (!isOk) {
        $("#cms-save").text("Save");
        $("#cms-save").prop('disabled', false);
      }
    });
  },

  /**
   * Return devices options
   * @return {string} String of options
   * @private
   */
  getOptions() {
    var result = '';
    this.collection.each(device => {
      var name = device.get('name');
      result += '<option value="' + name+ '">' + name + '</option>';
    });
    return result;
  },

  render() {
    var pfx = this.ppfx;
    this.$el.html(this.template({
      ppfx: pfx
      //deviceLabel: this.config.deviceLabel
    }));
    //this.devicesEl = this.$el.find('.' + pfx + 'hugo_add');
    this.el.className = pfx + 'hugo-c';
    return this;
  },

});
