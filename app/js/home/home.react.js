'use strict';

var React = require('react');

var HelloMessage = React.createClass({
  handleClick: function() {
    debugger;
  },

  render: function() {
    return (
      <div>
        <p>Hello my man <button onClick={this.handleClick}>{this.props.name}</button></p>
        <p>This is a cool little test</p>
      </div>
    )
  }
});

module.exports = HelloMessage;
