"use strict";

var EE     = require("../index");
var sinon  = require("sinon");
var assert = require("chai").assert;

describe("Enable/Disable plugins on the fly", function(){

    it.only("can disable a registered plugin", function(){

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

        console.log(plugins.plugins["HTML"]);
    });
});