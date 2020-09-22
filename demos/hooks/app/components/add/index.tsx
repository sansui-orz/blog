import React, { useRef } from 'react';
import { dispatch } from '../../stores/useGlobalReducer';

function Add() {
  const inputRef = useRef(null);
  let input = '';
  const onChange = (e) => {
    input = e.target.value;
  };
  const onClick = () => {
    dispatch({type: 'add', value: input});
    input = '';
    inputRef.current.value = '';
  };
  return (
    <>
      <input type="text" ref={inputRef} onChange={onChange} />
      <button onClick={onClick}>添加</button>
    </>
  );
}

export default Add;