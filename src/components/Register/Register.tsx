import React, { ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerAction } from '../../actions';
import { Button } from 'react-bootstrap';
import './Register.css'
import { Redirect } from 'react-router-dom';



interface RegisterProps {
    register(userName: string, password: string): void;
    isLoggedIn:Boolean;
}

interface RegisterState {
    userName: string;
    password: string;
    isLoggin: boolean;
}

class _Register extends React.Component<RegisterProps, RegisterState> {
    state: RegisterState = {
        userName: '',
        password: '',
        isLoggin: false,
    }

    render() {
        const { userName, password } = this.state;
        const { isLoggedIn } = this.props;

            if (isLoggedIn) {
                return <Redirect to="/Tasks" />;
            } 
        
        return (
            <div>
                <h1>Register:</h1>
                <form onSubmit={this.onSubmit}>
                    <input name="userName" value={userName} onChange={this.handleInputChange} placeholder="enter userName..." required />
                    <br/>
                    <input className='input' name="password" value={password} onChange={this.handleInputChange} type="password" placeholder="enter password..." required />
                    <br/>
                    <Button type="submit">REGISTER</Button>
                </form>
            </div>
        );
    }

    handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value,
        } as any);
    }

    onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const { userName, password } = this.state;
        this.setState({
            isLoggin: true,
        })
        const { register } = this.props;
        register(userName, password);
    }
}

const mapDispatchToProps = {
    register: registerAction,
}

const mapStateToProps = (state: any) => {
    return {
        isLoggedIn: state.isLoggedIn
    };
}

export const Register = connect(mapStateToProps, mapDispatchToProps)(_Register);