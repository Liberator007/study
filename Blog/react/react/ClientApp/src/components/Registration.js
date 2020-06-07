import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/loginRegistry.css';

export class Registration extends Component {
    static displayName = Registration.name;
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    userRegistrySubmit = (data) => {
        fetch('api/registry/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            referrer: 'no-referrer',
        })
            .then(res => {
                if (res.ok !== true) {
                    alert('Имя пользователя уже существует');
                }
                else {
                    alert('Регистрация прошла успешно');
                    window.location.href = '/';
                }
            })
    }

    userRegistry = (e) => {
        e.preventDefault();

        let username = e.currentTarget.elements[0].value;
        let password = e.currentTarget.elements[1].value;
        let passwordRepeat = e.currentTarget.elements[2].value;

        if (username.length >= 8) {
            if (password.length >= 8) {
                if (password == passwordRepeat) {
                    let body = {
                        Username: username,
                        Password: password,
                    };
                    this.userRegistrySubmit(body);
                }
                else {
                    alert("Пароли не совпадают");
                }
            }
            else {
                alert("Пароль слишком короткий");
            }

        } else {
            alert("Имя пользователя слишком короткое");
        }

    }

    render() {
        return (
            <div>
                <div class="tab row justify-content-center">
                    <Form onSubmit={this.userRegistry}>
                        <h1>Регистрация</h1>
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
                        <FormGroup>
                            <Label for="passwordRepeat">Подтвердите свой пароль</Label>
                            <Input type="password" name="passwordRepeat" id="passwordRepeat" placeholder="Repeat password" />
                        </FormGroup>
                        <Button color="success">Зарегистрироваться</Button>
                    </Form>
                </div>
                <div class="footer_registration">
                    <hr />
                    Blog - 2020 - Seliavi
                </div>
            </div>
        );
    }
}