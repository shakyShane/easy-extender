"use strict";

var EE     = require("../index");
var sinon  = require("sinon");
var assert = require("chai").assert;

describe("Calling user-specified plugins's .plugin() method", function(){

    it("can call the .plugin() method of all registered plugins", function(){

        var defaultSpy = sinon.spy();
        var userSpy    = sinon.spy();

        var defaults = {
            "myplugin": {
                plugin: defaultSpy
            }
        };

        var userPlugin = {
            "plugin:name": "HTML",
            "plugin": userSpy
        };

        var plugins = new EE(defaults);
        plugins.registerPlugin(userPlugin);
        plugins.init();

        plugins.initUserPlugins({});

        sinon.assert.calledOnce(userSpy);
    });
    it("can init plugins with args", function(done){

        var defaultSpy = sinon.spy();

        var defaults = {
            "myplugin": {
                plugin: defaultSpy
            }
        };

        var userPlugin = {
            "plugin:name": "HTML",
            "plugin": function (options) {
                assert.equal(options.name, "kittie");
                done();
            }
        };

        var plugins = new EE(defaults);
        plugins.registerPlugin(userPlugin, {"name": "kittie"})
            .init()
            .initUserPlugins();
    });

    it("can init plugins with args + lib-specified args", function(done){

        var defaultSpy = sinon.spy();

        var defaults = {
            "myplugin": {
                plugin: defaultSpy
            }
        };

        var userPlugin = {
            "plugin:name": "HTML",
            "plugin": function (options, names, extra) {
                assert.equal(options.name, "kittie");
                assert.equal(names[0], "shane");
                assert.equal(extra, "and another arg");
                done();
            }
        };

        var plugins = new EE(defaults);
        plugins.registerPlugin(userPlugin, {"name": "kittie"})
            .init()
            .initUserPlugins(["shane"], "and another arg");
    });
});