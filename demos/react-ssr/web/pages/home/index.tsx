import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component<{}, { list: number[]; }> {
  state = {
    list: [0, 1, 2, 3, 4],
  };

  render() {
    return (
      <div>123456789
        <Link to="/about">about</Link>
        <ul>
          {this.state.list.map((index) => {
            return (<li key={index}>{index}</li>);
          })}
        </ul>
        <button onClick={this.addItem}>add</button>
      </div>
    );
  }

  private addItem = () => {
    this.setState({
      list: [...this.state.list, this.state.list.length],
    });
  }
}