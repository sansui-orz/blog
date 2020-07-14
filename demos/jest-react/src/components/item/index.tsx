import React, { Component } from 'react';

import './index.css';

export default class Item extends Component<{
  name: string;
  complete: boolean;
  index: number;
  toggleStatus: (index: number) => void;
  deleteItem: (index: number) => void;
}> {
  render() {
    return (
      <div
        className={`item ${this.props.complete ? 'checked' : ''}`}
        onClick={this.toggleStatus}
      >
        {this.props.name}
        <div className="delete" onClick={this.deleteItem}>删除</div>
      </div>
    );
  }

  private toggleStatus = () => {
    this.props.toggleStatus(this.props.index);
  };

  private deleteItem = (e) => {
    e.stopPropagation();
    this.props.deleteItem(this.props.index);
  };
}