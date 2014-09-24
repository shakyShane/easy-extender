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
    it("warns about missing .plugin() method", function(done){

        var spy     = sinon.spy();
        var userSpy = sinon.spy();

        var defaults = {
            "myplugin": {
                plugin: spy
            }
        };

        var userPlugin = {
            "plugin:name": "myplugin",
            "main": userSpy
        };

        var plugins = new EE(defaults);

        plugins.registerPlugin(userPlugin, {}, function (err) {
            assert.equal(err, "Module must implement a .plugin() method");
            done();
        });
    });
    it("returns false if plugin does not exist", function(){

        var defaults = {};

        var plugins = new EE(defaults);

        var actual = plugins.get("shane");
        assert.isFalse(actual, false);
    });
    it("can add with modules + callback (no config)", function(done){

        var defaults = {};
        var userSpy = sinon.spy();

        var plugins = new EE(defaults);

        var userPlugin = {
            "plugin:name": "myplugin",
            "plugin": userSpy
        };

        plugins.registerPlugin(userPlugin, done); // success if callback called
    });
    it("can add a module and extract returned result", function(){

        var defaults = {};
        var userSpy = sinon.spy(function () {
            return "SHANE";
        });

        var plugins = new EE(defaults);

        var userPlugin = {
            "plugin:name": "myplugin",
            "plugin": userSpy
        };

        plugins.registerPlugin(userPlugin); // success if callback called
        var returned = plugins.get("myplugin")();
        assert.equal(returned, "SHANE");
    });
    it("can start a module & retrieve the return value at a later date", function(){

        var defaults = {};
        var userSpy = sinon.spy(function (input) {
            return input;
        });

        var plugins = new EE(defaults);

        var userPlugin = {
            "plugin:name": "myplugin",
            "plugin": userSpy
        };

        plugins.registerPlugin(userPlugin); // success if callback called
        var instance = plugins.get("myplugin")("input");
        var later    = plugins.get("myplugin");
        assert.equal(later, "input");
    });
});