"use strict";

var EE     = require("../index");
var sinon  = require("sinon");
var assert = require("chai").assert;

describe("Wrapping modules", function(){

    it("can wrap any module", function(){
        var plugins = new EE();
        plugins.wrap(require("fs"), "my:fs");
        plugins.init();
        var fs = plugins.get("my:fs")();
        assert.isFunction(fs.readFile);
    });
    it("can overwrite a wrapped module", function(){
        var spy = sinon.spy();
        var plugins = new EE();

        plugins.wrap(require("fs"), "my:fs");
        plugins.init();

        plugins.registerPlugin({
            "plugin:name": "my:fs",
            "plugin": spy
        });

        plugins.get("my:fs")();
        sinon.assert.called(spy);
    });
});