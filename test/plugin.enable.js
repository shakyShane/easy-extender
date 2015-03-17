"use strict";

var EE     = require("../index");
var sinon  = require("sinon");
var assert = require("chai").assert;

describe("Enable/Disable plugins on the fly", function(){

    it("can disable a plugin & enable after initUserPlugins", function(){

        var userSpy    = sinon.spy();

        var defaults = {};

        var userPlugin = {
            "plugin:name": "HTML",
            "plugin": userSpy
        };

        var plugins = new EE(defaults);

        plugins.registerPlugin(userPlugin);

        plugins.init();

        assert.isFalse(plugins.plugins["HTML"]._enabled);

        plugins.initUserPlugins({});

        assert.isTrue(plugins.plugins["HTML"]._enabled);
    });
    it("can enable a plugin separately", function(){

        var userSpy    = sinon.spy();

        var defaults = {};

        var userPlugin = {
            "plugin:name": "HTML",
            "plugin": userSpy
        };

        var plugins = new EE(defaults);

        plugins.registerPlugin(userPlugin);

        plugins.init();

        assert.isFalse(plugins.getPlugin("HTML")._enabled);

        plugins.enablePlugin("HTML");

        assert.isTrue(plugins.getPlugin("HTML")._enabled);

        plugins.disablePlugin("HTML");

        assert.isFalse(plugins.getPlugin("HTML")._enabled);
    });
    it("can disable when given in options", function(){

        var userSpy    = sinon.spy();

        var defaults = {};

        var userPlugin = {
            "plugin:name": "HTML",
            "plugin": userSpy
        };

        var plugins = new EE(defaults);

        plugins.registerPlugin(userPlugin, {enabled: false});

        plugins.init();
        plugins.initUserPlugins();

        assert.isFalse(plugins.getPlugin("HTML")._enabled);
    });
    it("can enable when given in options", function(){

        var userSpy    = sinon.spy();

        var defaults = {};

        var userPlugin = {
            "plugin:name": "HTML",
            "plugin": userSpy
        };

        var plugins = new EE(defaults);

        plugins.registerPlugin(userPlugin, {enabled: true});

        plugins.init();
        plugins.initUserPlugins();

        assert.isTrue(plugins.getPlugin("HTML")._enabled);
    });
});