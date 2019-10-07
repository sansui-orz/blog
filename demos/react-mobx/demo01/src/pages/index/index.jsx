import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer} from 'mobx-react';

@observer
class Index extends Component {
  render() {
    return (
      <div>
        <h1>this is index page.</h1>
        <p>{this.props.loadPageTime.time}</p>
        <Link to="/about">go to about page.</Link>
      </div>
    );
  }
}

export default Index;