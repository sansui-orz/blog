import React from 'react';
import { dispatch, connect } from '../../stores/useGlobalReducer';
import { Link } from 'react-router-dom';

interface Iprops {
  _context?: {
    tasks: Array<{ description: string; completed: boolean; }>;
  };
}

function TodoList(props: Iprops) {
  const context = props._context;
  return (
    <ul>
      {context.tasks.map((item, index) => {
        return (<li key={index}>{item.description} -- <span onClick={() => {
          !item.completed && dispatch({ type: 'complete', value: index });
        }}>{item.completed ? '已完成' : '未完成'}</span> <Link to={"/detail/" + index}>编辑</Link></li>)
      })}
    </ul>
  );
}

export default connect<Iprops>((state) => {
  return { tasks: state.tasks };
})(TodoList);