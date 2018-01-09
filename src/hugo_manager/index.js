/**
 * * [add](#add)
 * * [get](#get)
 * * [getAll](#getall)
 *
 * Before using methods you should get first the module from the editor instance, in this way:
 *
 * ```js
 * var deviceManager = editor.DeviceManager;
 * ```
 *
 * @module DeviceManager
 */
module.exports = () => {
  var c = {},
  defaults = require('./config/config'),
  HugoView = require('./view/HugoView');
  var view;

  return {

      /**
       * Name of the module
       * @type {String}
       * @private
       */
      name: 'HugoManager',

      /**
       * Initialize module. Automatically called with a new instance of the editor
       * @param {Object} config Configurations
       * @param {Array<Object>} [config.devices=[]] Default devices
       * @example
       * ...
       * {
       *    devices: [
       *      {name: 'Desktop', width: ''}
       *      {name: 'Tablet', width: '991px'}
       *    ],
       * }
       * ...
       * @return {this}
       */
      init(config) {
        console.error('a1');
        c = config || {};
        try {
          for (var name in defaults) {
            if (!(name in c))
              c[name] = defaults[name];
            }

        view = new HugoView({
          config: c
        });
      } catch (ee) {
        console.error(ee.stack);
      }
        return this;
      },

      /**
       * Add new device to the collection. URLs are supposed to be unique
       * @param {string} name Device name
       * @param {string} width Width of the device
       * @param {Object} opts Custom options
       * @return {Device} Added device
       * @example
       * deviceManager.add('Tablet', '900px');
       */
      add(name, width, opts) {
        var obj = opts || {};
        console.log("get add?");
        return null;
        /*
        obj.name = name;
        return devices.add(obj);
        */
      },

      /**
       * Return device by name
       * @param  {string} name Name of the device
       * @example
       * var device = deviceManager.get('Tablet');
       * console.log(JSON.stringify(device));
       * // {name: 'Tablet', width: '900px'}
       */
      get(name) {
        console.log("get name");
        return name;
        //return devices.get(name);
      },

      /**
       * Return all devices
       * @return {Collection}
       * @example
       * var devices = deviceManager.getAll();
       * console.log(JSON.stringify(devices));
       * // [{name: 'Desktop', width: ''}, ...]
       */
      getAll() {
        console.log("get all");
        return null;
      },

      /**
       * Render devices
       * @return {string} HTML string
       * @private
       */
      render() {
        try {
          dsflkjsdlf();
        } catch (z) {
            console.error(z.stack);
        }
        console.log("render here");
        return view.render().el;
      },

  };

};
