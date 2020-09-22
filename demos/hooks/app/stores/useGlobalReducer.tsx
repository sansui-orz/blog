import React, { useReducer, useContext, ReactNode } from 'react';

let _dispatch = null;

const context = React.createContext({});

export const dispatch = (params) => {
  if (_dispatch) {
    _dispatch(params);
  }
};

export function connect<P>(mapStore: (state: any) => any): (Component: React.ComponentClass<P> | React.FunctionComponent<P>) => React.FunctionComponent<P> {
  return function(Component: React.ComponentClass<P> | React.FunctionComponent<P>): React.FunctionComponent<P>{
    return function connectComponent(props: P & { children?: ReactNode }) {
      const c = useContext(context);
      const _state = mapStore(c);
      return <Component {...props} _context={_state}></Component>;
    }
  }
}

export default function Provider(props: {
  children: JSX.Element;
  innitalState: any;
  reducer: any;
}) {
  const [state, dispatch] = useReducer(props.reducer, props.innitalState);
  _dispatch = dispatch;
  return (<context.Provider value={state}>
    {props.children}
  </context.Provider>);
};
