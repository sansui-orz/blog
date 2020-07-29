import React, { Component } from 'react';
import Item from './item';
import InfiniteScroll from 'react-infinite-auto-scroller';

export default class List extends Component<{}, {
  list: Array<{ id: string; text: string; img?: string; }>;
}> {
  private refList = React.createRef<HTMLDivElement>();

  private lock = false;

  state = {
    list: [],
  };
  
  componentDidMount() {
    this.setState({
      list: this.getList(50),
    });
    window.addEventListener('scroll', this.listenScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenScroll, false);
    // clearHeightCache();
  }

  render() {
    return (
      <div className="list" ref={this.refList}>
        {<InfiniteScroll
          id={'id'}
          list={this.state.list}
          renderItem={item => {
            return (
              <Item {...item} />
            );
          }}/>}
      </div>
    );
  }

  private listenScroll = () => {
    if (this.lock) return;
    // 防抖
    this.lock = true;
    setTimeout(() => {
      this.lock = false;
    }, 100);
    const targetEle = this.refList?.current;
    if (targetEle) {
      const { bottom } = targetEle.getBoundingClientRect();
      // 如果距离底部还有半屏
      if (bottom < window.innerHeight * 1.5) {
        const list: Array<{ id: string; text: string; img?: string; }> = this.state.list;
        this.setState({
          list: list.concat(this.getList(50)),
        });
      }
    }
  };

  private getList(len: number) {
    const _len = this.state.list.length;
    const list: Array<{ id: string; text: string; img?: string; }> = [];
    for (var i = 0; i < len; i++) {
      list.push(this.getItem(_len + i));
    }
    return list;
  }

  private getItem(len): { id: string, text: string, img?: string } {
    const t = '高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。';
    return {
      id: 'aa-' + len + '/' + Date.now(),
      text: t.substr(Math.floor(Math.random() * t.length / 2), t.length / 2 + Math.floor(Math.random() * t.length / 2)), // 随机截取一段文本
      img: Math.random() > 0.6 ? `http://iph.href.lu/200x${Math.floor(100 + Math.random() * 300)}` : '', // 随机添加一张图片
    };
  }
}