import React, { Component } from 'react';
import { render, ReactDOM } from 'react-dom';
import { Redirect } from 'react-router-dom'

class NotFound extends Component {
  render() {
    console.log('not found');
    return <Redirect to="/" />
  }
}

export default NotFound
