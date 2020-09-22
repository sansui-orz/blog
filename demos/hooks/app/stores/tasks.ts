export const task = {
  all: 0,
  completed: 0,
  uncomplete: 0,
  tasks: [],
};

export function reducer(state = task, action) {
  switch(action.type) {
    case 'add':
      state.all += 1;
      state.uncomplete += 1;
      state.tasks.push({ description: action.value, completed: false });
      return {...state};
    case 'complete':
      state.completed += 1;
      state.uncomplete -= 1;
      state.tasks[action.value].completed = true;
      return {...state};
    case 'edit':
      state.tasks[action.index].description = action.value;
      return {...state};
    default:
      console.warn('Can\'t find type. -- ' + action.type);
      return state;
  }
}