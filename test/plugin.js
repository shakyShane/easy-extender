"use strict";

var EE  = require("../index");
var sinon  = require("sinon");
var assert = require("chai").assert;

describe("Using default plugins", function(){

    it("can be instantiated with defaults", function(){

        var spy = sinon.spy();

        var defaults = {
            "myplugin": {
                plugin: spy
            }
        };

        var plugins = new EE(defaults);
        plugins.init().get("myplugin")();

        sinon.assert.calledOnce(spy);
    });

    it("registers a plugin", function(){

        var spy     = sinon.spy();
        var userSpy = sinon.spy();
        var userCb  = sinon.spy();

        var defaults = {
            "myplugin": {
                plugin: spy
            }
        };

        var userPlugin = {
            "plugin:name": "HTML",
            "plugin": userSpy
        };

        var plugins = new EE(defaults);

        plugins.registerPlugin(userPlugin, {}, userCb)
            .init(); // init plugins

        assert.equal(Object.keys(plugins.plugins).length, 2);
    });

    it("calls registered plugins", function(){

        var spy     = sinon.spy();
        var userSpy = sinon.spy();
        var userCb  = sinon.spy();

        var defaults = {
            "myplugin": {
                plugin: spy
            }
        };

        var userPlugin = {
            "plugin:name": "HTML",
            "plugin": userSpy
        };

        var plugins = new EE(defaults);

        plugins.registerPlugin(userPlugin, {}, userCb)
            .init()
            .get("HTML")();

        sinon.assert.calledOnce(userSpy);
        sinon.assert.calledOnce(userCb);
    });
    it("Overrides default plugins", function(){

        var spy     = sinon.spy();
        var userSpy = sinon.spy();

        var defaults = {
            "myplugin": {
                plugin: spy
            }
        };

        var userPlugin = {
            "plugin:name": "myplugin",
            "plugin": userSpy
        };

        var plugins = new EE(defaults);

        plugins.registerPlugin(userPlugin, {})
            .init();

        assert.equal(Object.keys(plugins.plugins).length, 1);

        plugins.get("myplugin")();

        sinon.assert.called(userSpy);
        sinon.assert.notCalled(spy);
    });
});