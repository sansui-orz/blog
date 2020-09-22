import React, { useEffect } from 'react';
import { connect } from '../../stores/useGlobalReducer';

interface Iprops {
  _context?: {
    all: number;
    completed: number;
    uncomplete: number;
  };
}

function DataPanel(props: Iprops) {
  useEffect(() => {
    console.log('DataPanel did updated');
  });
  const context = props._context;
  return (
  <div>all: <strong>{context.all}</strong>, completed: <strong>{context.completed}</strong>, uncomplete: <strong>{context.uncomplete}</strong></div>
  );
}

export default connect<Iprops>((state) => {
  return {
    all: state.all,
    completed: state.completed,
    uncomplete: state.uncomplete,
  };
})(React.memo(DataPanel, (preProps, nxtProps) => {
  const {all, completed, uncomplete} = preProps._context;
  const {all: a, completed: c, uncomplete: u} = nxtProps._context;
  return all === a && completed === c && uncomplete === u;
}));