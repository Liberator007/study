import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/loginRegistry.css';

export class Login extends Component {
    static displayName = Login.name;
    constructor(props) {
        super(props);
        this.state = {
            keyLogin: 'login',
            keyToken: 'token'
        };
    }

    async userLoginSubmit(data) {
        const response = await fetch('api/login/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            referrer: 'no-referrer',
        });

        const token = await response.json();
        if (response.ok === true) {
            localStorage.setItem(this.state.keyLogin, token.login);
            localStorage.setItem(this.state.keyToken, token.token);
            alert('Log in successfully');
            window.location.href = '/';
        }
        else {
            alert('Log in error!!!');
        }


    }

    userLogin = (e) => {
        e.preventDefault();

        let username = e.currentTarget.elements[0].value;
        let password = e.currentTarget.elements[1].value;

        let body = {
            Username: username,
            Password: password,
        };
        this.userLoginSubmit(body);

    }

    render() {
        return (
            <div>
                <div class="tab row justify-content-center"> 
                    <Form onSubmit={this.userLogin}>
                        <h2>Вход в систему</h2>
                        <br />
                        <br />
                        <FormGroup>
                            <Label for="exampleUsername">Имя пользователя</Label>
                            <Input name="username" id="exampleUsername" placeholder="Username" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Пароль</Label>
                            <Input type="password" name="password" id="password" placeholder="Password" />
                        </FormGroup>
                        <Button color="success">Войти</Button>
                    </Form>
                </div>
                <div class="footer_login">
                    <hr />
                    Blog - 2020 - Seliavi
                </div>
            </div>
        );
    }
}