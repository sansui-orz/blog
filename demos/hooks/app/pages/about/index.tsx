import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';

export default function About() {
  const history = useHistory();
  function handleClick() {
    history.push('/');
  }

  return (
    <div className="about">
      about <span onClick={handleClick}>to Home.</span>
      <br/>
      使用useReducer与useContext简单实现全局状态管理。
    </div>
  );
}