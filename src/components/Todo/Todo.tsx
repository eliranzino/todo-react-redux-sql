import React from 'react';
import { connect } from 'react-redux';
import './Todo.css';
import { Button } from 'react-bootstrap';
import { deleteAction, updateAction } from '../../actions';

interface TodoProps {
    deleteTodo(ID: number): void;
    updateTodo(ID: number): void;
    date: Date;
    Description: string;
    ID: number;
    Complete: boolean;
}

class _Todo extends React.Component<TodoProps> {
    render() {
        const { date, Description, Complete } = this.props;
        return (
            <div className="todo">
                <h4>TODO</h4>
                <Button variant="danger" className="deleteButton" onClick={this.handleDelete} >X</Button>
                <p>{Description}</p>
                <p>{date}</p>
                {Complete ? <input type="checkbox" defaultChecked className="isComplete" onClick={this.handlePut}/> :
                <input type="checkbox" className="isComplete" onClick={this.handlePut}/> }
            </div>
        )
    }
    handleDelete = () => {
        const {ID, deleteTodo} = this.props;
        console.log('THIS IS THE ID', ID)
        deleteTodo(ID)
    }

    handlePut = () => {
        const {ID, updateTodo} = this.props;
        updateTodo(ID)
    }
}

const mapDispatchToProps = {
    deleteTodo: deleteAction,
    updateTodo: updateAction,
}

export const Todo = connect(null, mapDispatchToProps)(_Todo);