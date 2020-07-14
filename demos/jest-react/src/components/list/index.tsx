import React, { Component } from 'react';
import Item from '../item';
import { getUserName } from '../../utils/api';

import './index.css';

interface IState {
  list: IItem[];
  name: string;
}

interface IItem {
  name: string;
  complete: boolean;
}

export default class List extends Component<{}, IState> {
  private inputValue = '';

  private inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  constructor(props) {
    super(props);
    this.state = { list: [], name: '' };
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <p className="username">{this.state.name}</p>
        <div className="add">
          <input className="add-input" type="text" ref={this.inputRef} onChange={this.changeHandle}/>
          <button className="add-btn" onClick={this.addHandle}>添加</button>
        </div>
        <div className="list">
          {this.state.list.map((item: IItem, index) => {
            return (
              <Item
                key={index}
                name={item.name}
                complete={item.complete}
                index={index}
                toggleStatus={this.toggleStatus}
                deleteItem={this.deleteItem}
              />
            );
          })}
          <img src={require('../../assets/logo192.png')} alt="" />
        </div>
      </>
    );
  }

  private toggleStatus = (index: number) => {
    const list = this.state.list;
    list[index].complete = !list[index].complete;
    this.setState({ list });
  };

  private deleteItem = (index: number) => {
    const list = this.state.list;
    list.splice(index, 1);
    this.setState({ list });
  };

  private addHandle = () => {
    if (this.inputValue) {
      const list = this.state.list;
      list.push({
        name: this.inputValue,
        complete: false,
      });
      this.setState({ list });
      this.inputRef.current && (this.inputRef.current.value = '');
    }
  }

  private changeHandle = (e) => {
    this.inputValue = e.target.value;
  };

  private test = (a: number, b: number) => {
    return a + b * this.state.list.length;
  };

  private getUserInfo(id) {
    return getUserName(id).then(res => {
      this.setState({ name: res.name });
      return res;
    });
  }
}