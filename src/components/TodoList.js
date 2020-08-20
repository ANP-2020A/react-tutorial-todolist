/**
 * Created by chalosalvador on 8/2/20
 */
import React, { useEffect, useState } from 'react';
import '../styles/todo-list.css';
import Spinner from './Spinner';
import UserInfo from './UserInfo';
import UserTaskForm from './UserTaskForm';
import UserTaskList from './UserTaskList';

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

      <UserInfo userInfo={ userInfo } />

      <button onClick={ handleDarkMode }>
        Cambiar a modo { darkMode
        ? 'claro'
        : 'oscuro' }
      </button>

      <UserTaskForm onAddTask={ handleAddTask } />

      <UserTaskList todos={ todos }
                    completed={ completed }
                    onCompleteTask={ handleCompleteTask }
                    onDeleteTask={ handleDeleteTask } />
    </div>
  );
};

export default TodoList;
