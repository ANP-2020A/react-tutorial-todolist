/**
 * Created by chalosalvador on 8/20/20
 */
import React from 'react';

const UserTaskList = ( { todos, completed, onCompleteTask, onDeleteTask } ) => (
  <>
    <h1>Lista de tareas pendientes ({ todos.length } en total)</h1>
    <table>
      <thead>
      <tr>
        <th>Nombre</th>
        <th>Eliminar</th>
        <th>Completar</th>
      </tr>
      </thead>
      <tbody>
      {
        todos.map( ( task, index ) => (
            <tr key={ index }>
              <td>{ task }</td>
              <td>
                <button onClick={ () => onDeleteTask( index ) }>Eliminar</button>
              </td>
              <td>
                <button onClick={ () => onCompleteTask( index ) }>Completada</button>
              </td>
            </tr>
          )
        )
      }
      </tbody>
    </table>

    <h1>Lista de tareas completadas ({ completed.length } en total)</h1>
    <table>
      <thead>
      <tr>
        <th>Nombre</th>
      </tr>
      </thead>
      <tbody>
      {
        completed.map( ( task, index ) => (
            <tr key={ index }>
              <td>{ task }</td>
            </tr>
          )
        )
      }
      </tbody>
    </table>
  </>
);

export default UserTaskList;
