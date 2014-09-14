var _ = require("lodash");

/**
 * @constructor
 */
var EasyExtender = function (defaults) {
    this.plugins  = {};
    this.pluginOptions  = {};
    this.defaults = defaults;
    return this;
};

/**
 * @returns {EasyExtender}
 */
EasyExtender.prototype.init = function () {

    var required = Object.keys(this.defaults);
    required.forEach(function (name) {
        if (_.isUndefined(this.plugins[name])) {
            this.plugins[name] = this.defaults[name];
        }
    }, this);

    return this;
};

/**
 * @param {String} name
 * @returns {Function|Boolean}
 */
EasyExtender.prototype.get = function (name) {

    if (!_.isUndefined(this.plugins[name])) {
        return this.plugins[name].plugin || false;
    }

    return false;
};

/**
 * @param {Object} module
 * @param {Object} [opts]
 * @param {Function} [cb]
 */
EasyExtender.prototype.registerPlugin = function (module, opts, cb) {

    var pluginOptions;

    if (!_.isFunction(module.plugin)) {
        return _.isFunction(cb) ? cb("Module must implement a .plugin() method") : false;
    }

    if (!cb && opts) {
        if (_.isFunction(opts)) {
            cb = opts;
        } else {
            pluginOptions = opts;
        }
    }

    var name = _.isUndefined(module["plugin:name"]) ? _.uniqueId() : module["plugin:name"];

    this.pluginOptions[name] = pluginOptions;

    this.plugins[name] = module;

    if (_.isFunction(cb)) {
        cb(null);
    }

    return this;
};

module.exports = EasyExtender;