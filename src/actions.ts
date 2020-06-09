import { Actions, Action } from "./store";
import { Dispatch } from "redux";
import axios from 'axios';
import { ITodo } from "./models/todo";
import { RegisterResult } from "./models/registerResult";
import { LoginResult } from "./models/loginResult";
import { Delete } from "./models/delete";

// this is an action creator
// action creators are functions that return an action object
export const loginAction = (userName: string, password: string) => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const { data: result } = await axios.post<LoginResult>('http://localhost:4000/users/login', {
                userName,
                password,
            });
            console.log(userName, password)
            if (result.success) {
                localStorage.setItem('token', result.token);

                dispatch({
                    type: Actions.Login,
                    payload: {
                        msg: result.msg
                    }
                });
            }
            console.log('this is the token, im in LOGIN action', result.token)
        } catch{
            dispatch({
                type: Actions.LoginFail,
                payload: {
                    msg: 'user name or password are incorrect!'
                }
            });

        }
    }
}
export const createGetTodosAction = () => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: Actions.GetTodosPending,
            payload: {},
        });

        const token = localStorage.getItem('token');
        console.log('im in get, and the token is:', token)
        try {
            const response = await axios.get<ITodo[]>('http://localhost:4000/todos', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            const todos = response.data;
            console.log({ todos })
            dispatch({
                type: Actions.GetTodosSuccess,
                payload: {
                    todos,
                }
            });
        }
        catch {
            dispatch({
                type: Actions.GetTodosFail,
                payload: {},
            });
            console.log("you couldnt get the tasks")
        }
    }
}
export const createTodosAction = (Description: string, date: string) => {
    const taskDetails = { Description, date }
    return async (dispatch: Dispatch<Action>) => {
        const token = localStorage.getItem('token');
        try {
            axios({
                method: 'post',
                url: 'http://localhost:4000/todos',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(taskDetails)

            }).then((content) => {
                console.log('this is what i get from post',content.data)
                dispatch({
                    type: Actions.CreateTodo,
                    payload: {
                        newTask: content.data,
                    }
                });

            })
        }
        catch {
            dispatch({
                type: Actions.PostTodosFail,
                payload: {},
            });
        }
    }
}


export const signOutAction = () => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: Actions.SignOut,
            payload: {
                msg: ""
            }
        });
    }
}

export const registerAction = (userName: string, password: string) => {
    return async (dispatch: Dispatch<Action>) => {
        try {
            const { data: result } = await axios.post<RegisterResult>('http://localhost:4000/users/register', {
                userName,
                password,
            });

            if (result.success) {
                localStorage.setItem('token', result.token);

                dispatch({
                    type: Actions.Register,
                    payload: {
                        msg: result.msg
                    }
                });
            }
        }
        catch(err){
            if(err.response){
                dispatch({
                    type: Actions.RegisterFail,
                    payload: {
                        msg: 'User is already exist!'
                    }
                });

            }
        }
    }
}

export const deleteAction = (ID: number) => {
    const token = localStorage.getItem('token');
    console.log('this is the id:', ID, 'and this is the token:', token)
    return async (dispatch: Dispatch<Action>) => {
        const { data } = await axios.delete<Delete>(`http://localhost:4000/todos/${ID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        console.log('this is the data in payload when i delete:', data, 'and the id is;', data.id)
        dispatch({
            type: Actions.DeleteTodo,
            payload: {
                ID: data.id
            }
        });
    }
}
export const updateAction = (ID: number) => {
    const token = localStorage.getItem('token');
    console.log('this is the id:', ID, 'and this is the token:', token)
    return async (dispatch: Dispatch<Action>) => {
        axios({
            method: 'put',
            url: `http://localhost:4000/todos/${ID}/toggleComplete`,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        }).then((content) => {
            console.log({content})
            console.log(content.data)
            dispatch({
                type: Actions.UpdateTodo,
                payload: {
                    result: content.data
                }
            });
            
        })

    }
}

