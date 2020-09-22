import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { dispatch, connect } from '../../stores/useGlobalReducer';

interface IProps {
  _context?: { tasks: { description: string; compeled: boolean; } };
  history: any;
}

class Detail extends Component<IProps> {
  taskId = 0;

  textareaRef = React.createRef<HTMLTextAreaElement>();

  constructor(props) {
    super(props);
    this.taskId = props.match.params.id;
  }

  submit = () => {
    const value = this.textareaRef.current.value;
    if (!value) return;
    dispatch({ type: 'edit', index: this.taskId, value: value });
    this.props.history.push('/');
  };

  render() {
    const tasks = this.props._context.tasks;
    const task = tasks[this.taskId];
    return (<div className="detail">
      <Link to="/">back home.</Link>
      <br/>
      {!task ? (<p>Can't find task by ID: {this.taskId}</p>) : (<>
        <textarea ref={this.textareaRef} defaultValue={task.description}></textarea>
        <button onClick={this.submit}>提交</button>
      </>)}
    </div>);
  }
};

export default connect<IProps>((store) => {
  return { tasks: store.tasks };
})(Detail);