// main entrypoint for browserify

'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var React = require('react');

var HomeView = require('./home/home.react.js');
var InstagramTriggerView = require('./instagram-trigger/instagram-trigger.react.js');

var BackboneMixin = {
  componentDidMount: function() {
    this.getBackboneCollections().forEach(function(collection) {
      collection.on('add remove change', this.forceUpdate.bind(this, null));
    }, this);
  },

  componentWillUnmount: function() {
    this.getBackboneCollections().forEach(function(collection) {
      collection.off(null, null, this);
    }, this);
  }
};

var App = React.createClass({
  mixins: [BackboneMixin],

  authInstagram: function() {
    window.location.href = 'https://instagram.com/oauth/authorize/?client_id=bcb7ebb1c8824e0a89babaf0298bd67c&redirect_uri=http://0.0.0.0:3000&response_type=token';
  },

  getInitialState: function() {
    return {instagramActive: null};
  },

  componentDidMount: function() {
    var Router = Backbone.Router.extend({
      routes: {
        '': 'home'
      }
    });

    new Router();
    Backbone.history.start();

    this.props.friends.fetch();
  },

  render: function() {
    return (
      <button onClick={this.authInstagram}>Connect To Instagram</button>
    );
  }
});

React.render(<App />, document.getElementById('app'));
