import React from 'react';
import { Link } from 'react-router-dom';
import TodoList from '../../components/todoList';
import DatePanel from '../../components/dataPanel';
import Add from '../../components/add';

export default function home(props) {
  return (<div className="home">
    <Link to="/about">to about.</Link>
    <br/>
    <Add />
    <br/>
    <DatePanel />
    <br/>
    <TodoList />
  </div>);
}