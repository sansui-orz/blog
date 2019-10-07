import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class About extends Component {
  render() {
    return (
      <div>
        <h1>this is about page.</h1>
        <Link to="/">go to index page.</Link>
      </div>
    );
  }
}