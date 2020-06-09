import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createTodosAction, signOutAction } from '../../actions';
import "bootstrap/dist/css/bootstrap.min.css"
import { Button } from 'react-bootstrap';

interface CreateTasksProps {
    createTask(Description: string, date: string): void;
    signOut(): void;
}

interface CreateTasksState {
    Description: string;
    date: string;
    isLogout: boolean;
}

class _CreateTasks extends React.Component<CreateTasksProps, CreateTasksState> {
    state: CreateTasksState = {
        Description: '',
        date: '',
        isLogout: false,
    }
    render() {
        const { Description, date, isLogout } = this.state;
        if (isLogout) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <form onSubmit={this.onSubmit} >
                    <h1>Add a task:</h1>
                    <textarea value={Description} onChange={this.handleInputChange} required name="Description"
                        placeholder="Write here your task..."></textarea>
                    <br />
                    <input value={date} onChange={this.handleInputChange} name="date" type="date" />
                    <br />
                    <Button type="submit" >SAVE</Button>
                    <br/>
                    <Button onClick={this.handleSignOut} variant="danger">Sign out</Button>
                </form>
            </div>
        )
    }
    handleSignOut = () => {
        const { signOut } = this.props;
        localStorage.setItem('token', "");
        this.setState({
            isLogout: true,
        })
        signOut();
    }

    handleInputChange = (e: any) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value,
        } as any);
    }

    onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const { Description, date } = this.state;
        const { createTask } = this.props;
        console.log(Description, date)
        createTask(Description, date);
    }
}
const mapDispatchToProps = {
    createTask: createTodosAction,
    signOut: signOutAction,
}

export const CreateTasks = connect(null, mapDispatchToProps)(_CreateTasks);