import React, { ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loginAction } from '../../actions';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';



interface LoginProps {
    login(userName: string, password: string): void;
    isLoggedIn: boolean;
}

interface LoginState {
    userName: string;
    password: string;
}

class _Login extends React.Component<LoginProps, LoginState> {
    state: LoginState = {
        userName: '',
        password: '',
    }

    render() {
        const { userName, password } = this.state;
        const { isLoggedIn } = this.props;
        
            if (isLoggedIn) {
                return <Redirect to="/Tasks" />;
            } 
        
        return (
            <div>
                <h1>Login:</h1>
                <form onSubmit={this.onSubmit}>
                    <input name="userName" value={userName} onChange={this.handleInputChange} placeholder="enter userName..." required />
                    <br />
                    <input className='input' name="password" value={password} onChange={this.handleInputChange} type="password" placeholder="enter password..." required />
                    <br />
                    <Button type="submit">Login</Button>
                </form>
            </div>
        );
    }
    onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const { userName, password } = this.state;
        const { login } = this.props;
        login(userName, password);
   
    }
    handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value,
        } as any);
    }

}
const mapDispatchToProps = {
    login: loginAction,
}
const mapStateToProps = (state: any) => {
    return {
        isLoggedIn: state.isLoggedIn
    };
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);