module.exports = {

  run(editor, sender, opts) {
    var opt = opts || {};
    var config = editor.getConfig();
    var modal = editor.Modal;
    var fileManager = editor.FileManager;

    console.error("GOT FILE MNAAGER");
    console.error(fileManager);
    fileManager.onClick(opt.onClick);
    fileManager.onDblClick(opt.onDblClick);

    // old API
    fileManager.setTarget(opt.target);
    fileManager.onSelect(opt.onSelect);

    modal.setTitle(opt.modalTitle || 'Enter filename');
    modal.setContent(fileManager.render());
    modal.open();
  },

};
