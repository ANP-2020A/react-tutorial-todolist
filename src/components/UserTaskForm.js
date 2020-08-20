/**
 * Created by chalosalvador on 8/20/20
 */
import React from 'react';

const UserTaskForm = ({onAddTask}) => (
  <div>
    <label htmlFor='task'>Tarea</label>
    <input type='text' id='task' />

    <button onClick={ onAddTask }>Agregar tarea</button>
  </div>
);

export default UserTaskForm;
