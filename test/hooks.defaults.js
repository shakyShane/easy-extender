"use strict";

var EE      = require("../index");
var assert  = require("chai").assert;

describe("Using default hooks", function(){

    it("can be instantiated with defaults", function(){

        var defaults = {
            "myplugin": {
                plugin: function () {}
            }
        };

        var hooks = {
            "client:js": function (hooks, args2, args3) {
                var out = args2 + args3;
                hooks.forEach(function (hook) {
                    out += hook();
                });
                return out;
            }
        };

        var userModule = {
            "plugin:name": "HTML",
            "plugin": function () {},
            hooks: {
                "client:js": function () {
                    return " god";
                }
            }
        };

        var plugins = new EE(defaults, hooks);

        plugins.registerPlugin(userModule);

        plugins.init();

        var out = plugins.hook("client:js", "oh", " my");

        assert.equal(out, "oh my god");
    });
});