import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { TodoList } from './components/TodoList/TodoList';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { Display } from './components/Display/Display'
import { CreateTasks } from './components/CreateTasks/CreateTaks';

export class App extends React.Component {

  render() {
    return (
      <div className="App">
        <h1>Welcome to my todo list!</h1>
        <Display />
        <Switch>
          <Route path="/Tasks">
          <CreateTasks />
            <TodoList />
          </Route>
          <Route path="/">
            <Register />
            <Login />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
