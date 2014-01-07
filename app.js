/*jslint node:true, nomen: true*/

'use strict';

var express = require('express'),
    expview = require('express-view'),
    expyui  = require('express-yui'),
    LocatorYUI = require('locator-yui'),
    Locator = require('locator'),
    LocatorHandlebars = require('locator-handlebars'),
    app = express(),
    locator;

locator = new Locator({buildDirectory: __dirname + '/build'});
// tell express-yui about locator so that app can use the `app.yui.ready` api
app.set('locator', locator);
// tell express-view to use this layout
app.set('layout', 'main');

// extend express app with `express-yui` and `express-view`
expyui.extend(app);
expview.extend(app);

// serving modules from app origin - demo only
app.use(expyui['static'](__dirname + '/build'));
app.yui.setCoreFromAppOrigin();
app.yui.applyConfig({
    debug: true,
    combine: false
});

// creating a page with YUI embeded
app.get('/hello', expyui.expose(), function (req, res, next) {
    res.render('home', {
        body: 'Modown hello world'
    });
});

// locator initialiation
locator.plug(new LocatorHandlebars({format: 'yui'}))
    .plug(new LocatorYUI({}))
    .parseBundle(__dirname, {});

app.yui.ready(function (err) {

    if (err) {
        console.log(err);
        console.log(err.stack);
        return;
    }

    // listening for traffic only after locator finishes the walking process
    app.listen(5000, function () {
        console.log("Server listening on port 3000");
    });
});
