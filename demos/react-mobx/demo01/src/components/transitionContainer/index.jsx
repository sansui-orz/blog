import React, { Component } from 'react';

import Article from './components/article';
import Channel from './components/channel';
import './index.css';

const windowHeight = window.innerHeight || document.documentElement.clientHeight;
const propsHeight = 150;
const defaultBodyTansY = windowHeight - propsHeight;
const limitHeight = windowHeight / 4;
let timeout = null;
let lock = false;

export default class Transition extends Component {
  head = null;
  body = null;

  bodyTouching = false;

  startY = 0;
  afterY = 0;

  state = {
    page: 1,
    bodyTrasilateY: defaultBodyTansY,
  }

  componentDidMount() {
    const body = this.body;
    body.addEventListener('touchstart', this.bodyTouchStart, true);
    body.addEventListener('touchmove', this.bodyTouchMove, true);
    body.addEventListener('touchend', this.bodyTouchEnd, true);
    body.addEventListener('touchcancel', this.bodyTouchEnd, true);
  }

  getY(e) {
    const touch = e.touches[0];
    if (touch) {
      return Math.floor(touch.clientY);
    } else {
      return 0;
    }
  }

  bodyTouchStart = (e) => {
    e.stopPropagation();
    this.bodyTouching = true;
    const y = this.getY(e);
    if (y) {
      this.startY = y;
      this.afterY = y;
    }
  }

  bodyTouchMove = (e) => {
    e.stopPropagation();
    if (lock) return;
    lock = true;
    setTimeout(() => lock = false, 100);
    const y = this.getY(e);
    if (this.bodyTouching && y) {
      if (this.state.page === 1) {
        if (y < this.startY) {
          const h = defaultBodyTansY - Math.pow(this.startY - y, 1/2) * 5;
          this.setState({
            bodyTrasilateY: h < 0 ? 0 : h,
          });
        } else if (this.state.bodyTrasilateY !== defaultBodyTansY) {
          this.setState({
            bodyTrasilateY: defaultBodyTansY,
          });
        }
      } else {
        if (this.body.scrollTop !== 0) {
          this.startY = y;
        }
        if (y > this.startY && this.body.scrollTop === 0) {
          const h = Math.pow(y - this.startY, 1/2) * 5;
          this.setState({
            bodyTrasilateY: h,
          });
        } else if (this.state.bodyTrasilateY !== 0) {
          this.setState({
            bodyTrasilateY: 0
          });
        }
      }
      this.afterY = y;
    }
  }

  bodyTouchEnd = (e) => {
    e.stopPropagation();
    if (this.bodyTouching) {
      if (this.state.page === 1) {
        if (this.startY - this.afterY > limitHeight) {
          this.setState({
            page: 2,
            bodyTrasilateY: 0,
          });
        } else {
          this.setState({
            bodyTrasilateY: defaultBodyTansY,
          });
        }
      } else {
        if (this.afterY - this.startY > limitHeight) {
          this.setState({
            page: 1,
            bodyTrasilateY: defaultBodyTansY,
          });
        } else {
          this.setState({
            bodyTrasilateY: 0,
          });
        }
      }
    }
    this.bodyTouching = false;
  }

  render() {
    const {page, bodyTrasilateY} = this.state;
    return (
        <div className="transition-container" style={{ overflowY: page === 2 ? 'hidden' : 'auto' }}>
          <div className="relative">
            <div
              className="transition-head"
              ref={ref => this.head = ref}
              style={{
                transform: page === 2 ? 'scale(0.9) translateY(100px)' : 'scale(1) translateY(0)',
                opacity: page === 2 ? 0.5 : 1,
              }}
            >
              <Article />
              <div style={{height: propsHeight}}></div>
            </div>
            <div
              className="transition-body"
              ref={ref => this.body = ref}
              style={{
                transform: `translateY(${bodyTrasilateY}px)`,
                overflowY: page === 2 ? 'auto' : 'hidden'
              }}
            >
              <Channel />
            </div>
          </div>
        </div>
      )
  }
}
