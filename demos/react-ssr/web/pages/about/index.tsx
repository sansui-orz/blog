import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class About extends Component {
  render() {
    return (
      <div>
        about.
        <Link to="/">Go Home</Link>
      </div>
    );
  }
}