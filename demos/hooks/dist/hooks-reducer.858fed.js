!function(e){function t(t){for(var a,c,o=t[0],u=t[1],i=t[2],s=0,m=[];s<o.length;s++)c=o[s],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&m.push(r[c][0]),r[c]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);for(p&&p(t);m.length;)m.shift()();return l.push.apply(l,i||[]),n()}function n(){for(var e,t=0;t<l.length;t++){for(var n=l[t],a=!0,o=1;o<n.length;o++){var u=n[o];0!==r[u]&&(a=!1)}a&&(l.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},r={0:0},l=[];function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var o=window.webpackJsonp=window.webpackJsonp||[],u=o.push.bind(o);o.push=t,o=o.slice();for(var i=0;i<o.length;i++)t(o[i]);var p=u;l.push([26,1]),n()}({26:function(e,t,n){"use strict";function a(e){s.fn&&s.fn(e)}n.r(t);var r=n(0),l=n.n(r),c=n(15),o=n.n(c),u=n(6),i=n(1),p=n(7),s={fn:null},m=l.a.createContext({});function f(e){return function(t){return function(n){var a=Object(r.useContext)(m),c=e(a);return l.a.createElement(t,Object(p.a)({},n,{_context:c}))}}}var d,b=f((function(e){return{tasks:e.tasks}}))((function(e){var t=e._context;return l.a.createElement("ul",null,t.tasks.map((function(e,t){return l.a.createElement("li",{key:t},e.description," -- ",l.a.createElement("span",{onClick:function(){e.completed||a({type:"complete",value:t})}},e.completed?"已完成":"未完成")," ",l.a.createElement(u.b,{to:"/detail/"+t},"编辑"))})))})),v=f((function(e){return{all:e.all,completed:e.completed,uncomplete:e.uncomplete}}))(l.a.memo((function(e){var t=e._context;return l.a.createElement("div",null,"all: ",l.a.createElement("strong",null,t.all),", completed: ",l.a.createElement("strong",null,t.completed),", uncomplete: ",l.a.createElement("strong",null,t.uncomplete))}),(function(e,t){var n=e._context,a=n.all,r=n.completed,l=n.uncomplete,c=t._context,o=c.all,u=c.completed,i=c.uncomplete;return a===o&&r===u&&l===i}))),E=function(){var e=Object(r.useRef)(null),t="";return l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{type:"text",ref:e,onChange:function(e){t=e.target.value}}),l.a.createElement("button",{onClick:function(){a({type:"add",value:t}),t="",e.current.value=""}},"添加"))};function h(e){return l.a.createElement("div",{className:"home"},l.a.createElement(u.b,{to:"/about"},"to about."),l.a.createElement("br",null),l.a.createElement(E,null),l.a.createElement("br",null),l.a.createElement(v,null),l.a.createElement("br",null),l.a.createElement(b,null))}function y(){var e=Object(i.g)();return l.a.createElement("div",{className:"about"},"about ",l.a.createElement("span",{onClick:function(){e.push("/")}},"to Home."),l.a.createElement("br",null),"使用useReducer与useContext简单实现全局状态管理。")}function k(e){var t=d.call(this,e)||this;return t.taskId=0,t.textareaRef=l.a.createRef(),t.submit=function(){var e=t.textareaRef.current.value;e&&(a({type:"edit",index:t.taskId,value:e}),t.props.history.push("/"))},t.taskId=e.match.params.id,t}var x=f((function(e){return{tasks:e.tasks}}))((d=r.Component,Object(p.b)(k,d),k.prototype.render=function(){var e=this.props._context.tasks[this.taskId];return l.a.createElement("div",{className:"detail"},l.a.createElement(u.b,{to:"/"},"back home."),l.a.createElement("br",null),e?l.a.createElement(l.a.Fragment,null,l.a.createElement("textarea",{ref:this.textareaRef,defaultValue:e.description}),l.a.createElement("button",{onClick:this.submit},"提交")):l.a.createElement("p",null,"Can't find task by ID: ",this.taskId))},k)),O={all:0,completed:0,uncomplete:0,tasks:[]};t.default=o.a.render(l.a.createElement((function(e){var t=Object(r.useReducer)(e.reducer,e.inintState),n=t[0],a=t[1];return s.fn=a,l.a.createElement(m.Provider,{value:n},e.children)}),{inintState:O,reducer:function(e,t){switch(void 0===e&&(e=O),t.type){case"add":return e.all+=1,e.uncomplete+=1,e.tasks.push({description:t.value,completed:!1}),Object(p.a)({},e);case"complete":return e.completed+=1,--e.uncomplete,e.tasks[t.value].completed=!0,Object(p.a)({},e);case"edit":return e.tasks[t.index].description=t.value,Object(p.a)({},e);default:return console.warn("Can't find type. -- "+t.type),e}}},l.a.createElement((function(){return l.a.createElement(u.a,null,l.a.createElement(i.d,null,l.a.createElement(i.b,{path:"/about",component:y}),l.a.createElement(i.b,{path:"/detail/:id",component:x}),l.a.createElement(i.b,{path:"/",component:h}),l.a.createElement(i.a,{to:"/"})))}),null)),document.querySelector("#app"))}});