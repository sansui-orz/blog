import { observable, action } from 'mobx';

const loadPageTime = observable({
  time: new Date().toLocaleTimeString()
});

loadPageTime.changeTime = action(() => {
  loadPageTime.time = new Date().toLocaleTimeString();
});

loadPageTime.asyncChangeTime = action(s => {
  setTimeout(() => {
    console.log('s -> ', s);
    appState.time = 'async time: ' + new Date().toLocaleTimeString();
  });
});

export default loadPageTime;