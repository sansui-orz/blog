import React, { Component } from 'react';

interface IProps {
  text: string;
  img?: string;
  /* 下面这两个方法由无限滚动高阶组件提供，注意使用时判断是否存在 */
  emitReportHeight?: Function; // 主动调用更新元素高度，应用场景（1. 当组件高度是异步内容决定的，2. 高度变化时主动更新父元素高度）
}

class Item extends Component<IProps> {
  ref = React.createRef<HTMLDivElement>();
  render() {
    const { text, img } = this.props;
    return (
      <div className="item" ref={this.ref}>
        <div className="user">
          <div className="username">123</div>
        </div>
        <p className="text">{text}</p>
        {img ? <img className="img" src={img} alt="" onLoad={this.imgLoad}/> : null}
      </div>
    );
  }

  private imgLoad = () => {
    const height = this.ref.current.getBoundingClientRect().height;
    this.props.emitReportHeight && this.props.emitReportHeight(height);
  };
}


export default Item;