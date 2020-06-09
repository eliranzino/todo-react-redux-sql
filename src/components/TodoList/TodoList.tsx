import React from 'react';
import { ITodo } from '../../models/todo';
import { Todo } from '../Todo/Todo';
import { State } from '../../store';
import { connect } from 'react-redux';
import { createGetTodosAction } from '../../actions';
import './TodoList.css';

interface TodoListProps {
    todos: ITodo[];
    getTodos(): void;
    isLoading: boolean;
    isLoggedIn: boolean;
}

class _TodoList extends React.Component<TodoListProps> {

    render() {
        const { isLoading, todos } = this.props;
        console.log('those are the todos', todos)
        if (isLoading) {
            return 'Getting TODO list...';
        }

        return (
            <div >
                {todos.map((todo, i) =>
                    <div key={i} className='theTask'>
                        <Todo key={todo.ID} {...todo} />
                    </div>
                )}
            </div>
        );
    }
    componentDidMount() {
        console.log('componentDidMount')
        const { getTodos,isLoggedIn } = this.props;
        if(isLoggedIn){
            console.log(isLoggedIn,'and go to GET tasks')
            getTodos();
        }
    }
}

const mapStateToProps = (state: State) => ({
    todos: state.todos,
    isLoading: state.isGettingTodos,
    isLoggedIn: state.isLoggedIn
});

const mapDispatchToProps = {
    getTodos: createGetTodosAction,
}
/*
 what this object does is actually this:
  const mapDispatchToProps = (dispatch) => ({
    getTodos: () => dispatch(createGetTodosAction()),
  });
*/

export const TodoList = connect(mapStateToProps, mapDispatchToProps)(_TodoList);
