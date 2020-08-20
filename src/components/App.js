import React, { useState } from 'react';
import '../styles/App.css';
import UserList from './UserList';
import TodoList from './TodoList';

const App = () => {

  const [ viewTasks, setViewTasks ] = useState( true );

  return (
    <>
      <UserList />

      <button onClick={ () => setViewTasks( ( prevViewTasks ) => !prevViewTasks ) }>
        { viewTasks
          ? 'Ocultar'
          : 'Ver' } lista de tareas
      </button>
      {
        viewTasks && <TodoList />
      }
    </>
  );
};

export default App;

