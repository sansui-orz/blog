import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import Provider from './stores/useGlobalReducer';
import { reducer, task } from './stores/tasks';

export default ReactDOM.render(<Provider innitalState={task} reducer={reducer}><Router /></Provider>, document.querySelector('#app'));