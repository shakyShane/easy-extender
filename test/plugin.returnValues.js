"use strict";

var EE     = require("../index");
var sinon  = require("sinon");
var assert = require("chai").assert;

describe("Storing/retrieving return values", function(){

    it("can retrieve a previously returned value", function(){

        var userSpy    = sinon.spy(function () {
            return "SHANE";
        });

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

        assert.equal(plugins.getReturnValues("HTML")[0].value, "SHANE");
    });
    it("just returns empty array for none-existent plugin", function(){
        var defaults = {};
        var plugins = new EE(defaults);
        assert.isArray(plugins.getReturnValues("HTML"));
        assert.equal(plugins.getReturnValues("HTML").length, 0);
    });
});