module.exports = {


  run(editor, sender, opts) {
    var opt = opts || {};
    var config = editor.getConfig();

    //TODO:  Make sure if something was edited...
    delete window.components_ori;
    delete window.components_ori_hash;
    delete window.head_components_ori;
    delete window.head_components_ori_hash;
    window.editorInitialized=false;
    window.preventUpdates = sender;
    window.component_edit = sender;

    //reset components
    editor.setComponents("");
    editor.setHeadComponents("");

    var ee = {
      button: 0 //left click
    }
    console.error (sender);
    console.error(sender);

    if(this.em){
        this.config.getSorter = this.getSorter;
    }




    this.em.refreshCanvas();
    var sorter = this.config.getSorter();
    console.error("test this");
    console.error(this);
    console.error(this.el);
    var tgt = $("iframe").contents().find("#wrapper")[0];
    var created = function() {
      editor.DomComponents.setComponentOrig(editor.DomComponents.getComponents());
      editor.DomComponents.setHeadComponentOrig(editor.DomComponents.getHeadComponents());
      window.editorInitialized=true;
    };
    var dragEl = sorter.setDragHelper(this.el, { button:0, pageX:0, pageY:0, target: tgt });
    console.error(dragEl);

    var moved = 1;
    var target = tgt;
    var ev = "";
    var lastPos = { index: 0, method: 'after' };
    sorter.setDropContent(sender.get('content'));
    var tmpCr  = this.config.getSorter().move(target, ev, lastPos);
    console.error(this.config.getSorter());
    this.config.getSorter().onEndMove = created;
    this.config.getSorter().endMove()



    //adding default theme..
    //TODO: This should be coming from the editor.themeCssFile and also include a new object css info ???
    var headTag  = $("iframe").contents().find("head")[0];
    var styles = document.createElement('link');
    styles.ignore = "true";
    styles.rel = 'stylesheet';
    styles.type = 'text/css';
    styles.media = 'screen';
    styles.href = '/css/theme.css';
    headTag.appendChild(styles);

    /*
    //TODO: Show a code editors
    var commandName = "export-template";
    if(this.em && this.em.get)
      this.commands  = this.em.get('Commands');
    var command;

    console.error("EDIT BLOCK COMMAND IS" + commandName);
    if (this.commands && typeof commandName === 'string') {
      command  = this.commands.get(commandName);
    } else if (commandName !== null && typeof commandName === 'object') {
      command = commandName;
    } else if (typeof commandName === 'function') {
      command = {run: commandName};
    }

    command.run(editor, sender, sender.get('options'));
    editor.trigger('run:' + commandName);
    */
    //window.editorInitialized=true;
  },
  /**
   * Get sorter
   * @private
   */
  getSorter() {
      if(!this.em)
        return;
      if(!this.sorter){
        var utils = this.em.get('Utils');
        var canvas = this.em.get('Canvas');
        this.sorter = new utils.Sorter({
          container: canvas.getBody(),
          placer: canvas.getPlacerEl(),
          containerSel: '*',
          itemSel: '*',
          pfx: this.ppfx,
          onStart: this.onDrag,
          onEndMove: this.onDrop,
          onMove: this.onMove,
          document: canvas.getFrameEl().contentDocument,
          direction: 'a',
          wmargin: 1,
          nested: 1,
          em: this.em,
          canvasRelative: 1,
        });
      }
      return this.sorter;
    }
};
