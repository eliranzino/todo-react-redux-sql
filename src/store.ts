import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { User } from './models/user';
import { ITodo } from './models/todo';

export interface State {
    isLoggedIn: boolean;
    user: User | null;
    isGettingTodos: boolean;
    todos: ITodo[];
    message: string;
}

const isLoggedIn = !!localStorage.getItem('token');

const initialState: State = {
    isLoggedIn,
    user: null,
    isGettingTodos: false,
    todos: [],
    message: "",
}

export interface Action {
    type: string;
    payload: Record<string, any>;
}

export enum Actions {
    Login = 'LOGIN',
    Register = 'REGISTER',
    SignOut = 'SIGN_OUT',
    CreateTodo = 'CREATE_TODO',
    GetTodosPending = 'GET_TODOS_PENDING',
    GetTodosSuccess = 'GET_TODOS_SUCCESS',
    GetTodosFail = 'GET_TODOS_FAIL',
    PostTodosFail = 'POST_TODOS_FAIL',
    DeleteTodo = 'DELETE_TODO',
    UpdateTodo = 'UPDATE_TODO',
    LoginFail = 'LOGIN_FAIL,',
    RegisterFail = 'REGISTER_FAIL',
}

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case Actions.Register: {
            const { msg } = action.payload;
            console.log({ msg })
            return {
                ...state,
                isLoggedIn: true,
                message: msg
            }
        }
        case Actions.DeleteTodo: {
            const { todos } = state;
            const modifiedTodos = todos.slice();
            const { ID } = action.payload;
            const cellIndexToDelete = todos.findIndex(todo => todo.ID.toString() === ID);
            const newArray = modifiedTodos.splice(cellIndexToDelete, 1)
            console.log({ newArray })
            return {
                ...state,
                isGettingTodos: false,
                todos: modifiedTodos,
            }
        }
        case Actions.Login: {
            const { msg } = action.payload;
            console.log({ msg })
            return {
                ...state,
                isGettingTodos: false,
                isLoggedIn: true,
                message: msg
            }
        }
        case Actions.SignOut: {
            const { msg } = action.payload;
            return {
                ...state,
                todos: [],
                isLoggedIn: false,
                message: msg,
            }
        }
        case Actions.GetTodosPending: {
            return {
                ...state,
                isGettingTodos: true,
            }
        }

        case Actions.GetTodosFail: {
            return {
                ...state,
                isGettingTodos: false,
            }
        }
        case Actions.PostTodosFail: {
            return {
                ...state,
                isGettingTodos: false,
            }
        }
        case Actions.LoginFail: {
            const { msg } = action.payload;
            return {
                ...state,
                message: msg
            }
        }
        case Actions.RegisterFail: {
            const { msg } = action.payload;
            return {
                ...state,
                message: msg
            }
        }
        case Actions.UpdateTodo: {
            const { todos } = state;
            const { result } = action.payload;
            console.log('this is the result', result)
            const idAsNumber = Number(result.id);
            console.log({idAsNumber})
            const modifiedTodos = todos.slice();
            const cellIndexUpdate = modifiedTodos.findIndex(task => task.ID === idAsNumber);
            const completedTask = modifiedTodos.find(task=> task.ID === idAsNumber);
            console.log({cellIndexUpdate})
            console.log({completedTask})
            //@ts-ignore
            modifiedTodos[cellIndexUpdate] = completedTask
            return {
                ...state,
                todos: modifiedTodos,
                message: result.msg,
            }
        }
        case Actions.GetTodosSuccess: {
            const { todos } = action.payload;
            return {
                ...state,
                isGettingTodos: false,
                todos,
            }
        }
        case Actions.CreateTodo: {
            const { todos } = state;
            const { newTask } = action.payload;
            const modifiedTodos = todos.concat();
            modifiedTodos.push(newTask)
            console.log("this is what i got from payload:", newTask)
            return {
                ...state,
                todos: modifiedTodos,
            }
        }

        default: {
            return state;
        }
    }
}

export function createReduxStore() {
    const logger = createLogger();
    const middleware = composeWithDevTools(applyMiddleware(thunk, logger));
    return createStore(reducer, middleware);
}