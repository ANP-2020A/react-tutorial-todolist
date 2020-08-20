/**
 * Created by chalosalvador on 8/2/20
 */
import React, { useEffect, useState } from 'react';
import '../styles/todo-list.css';
import Spinner from './Spinner';

const TodoList = () => {

  const [ todos, setTodos ] = useState( [] );
  const [ completed, setCompleted ] = useState( [] );
  const [ darkMode, setDarkMode ] = useState( false );
  const [ userInfo, setUserInfo ] = useState( null );
  const [ windowWith, setWindowWith ] = useState( window.innerWidth );

  useEffect( () => {
    const getData = async() => {
      const data = await fetch( 'https://jsonplaceholder.typicode.com/users/1' );
      const dataJson = await data.json();
      setUserInfo( dataJson );
    };
    getData();
  }, [] );

  useEffect( () => {
    console.log( 'efecto', todos.length );
    if( todos.length > 0 ) {
      document.title = `${ todos.length } tareas pendientes`;
    } else {
      document.title = `No tienes tareas pendientes`;
    }
  }, [ todos ] );

  useEffect( () => {
    console.log( 'El nuevo estado es: ', darkMode
      ? 'DARK MODE'
      : 'LIGHT  MODE' );
  }, [ darkMode ] );

  useEffect( () => {
    console.log( 'El COMPONENTE SE MONTO' );

    window.addEventListener( 'resize', handleResize );

    return () => {
      console.log( 'EL COMPONENTE SE DESMONTO' );
      window.removeEventListener( 'resize', handleResize );
    };
  } );

  const handleResize = () => {
    console.log( window.innerWidth );
    setWindowWith( window.innerWidth );
  };

  const handleAddTask = () => {
    const task = document.querySelector( '#task' ).value;
    setTodos( prevState => [ ...prevState, task ] );
    document.querySelector( '#task' ).value = '';
  };

  const handleDeleteTask = ( index ) => {
    setTodos( ( prevState ) => {
      return prevState.filter( ( task, i ) => i !== index );
    } );
  };

  const handleCompleteTask = ( index ) => {
    setCompleted( ( prevState ) => [
      ...prevState,
      todos[ index ]
    ] );

    handleDeleteTask( index );
  };

  const handleDarkMode = () => {
    setDarkMode( ( prevDarkMode ) => !prevDarkMode );
  };

  return (
    <div className={ darkMode
      ? 'dark-mode'
      : '' }>


      <h1>El ancho de la ventana es: { windowWith }</h1>


      <div>
        <h1>Información del usuario</h1>
        {
          userInfo
            ?
            <ul>
              <li>{ userInfo.name }</li>
              <li>{ userInfo.email }</li>
              <li>{ userInfo.website }</li>
              <li>{ userInfo.phone }</li>
            </ul>
            : <Spinner />
        }
      </div>


      <button onClick={ handleDarkMode }>
        Cambiar a modo { darkMode
        ? 'claro'
        : 'oscuro' }
      </button>

      <div>
        <label htmlFor='task'>Tarea</label>
        <input type='text' id='task' />

        <button onClick={ handleAddTask }>Agregar tarea</button>
      </div>
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
                  <button onClick={ () => handleDeleteTask( index ) }>Eliminar</button>
                </td>
                <td>
                  <button onClick={ () => handleCompleteTask( index ) }>Completada</button>
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
    </div>
  );
};

export default TodoList;
