import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export class AddBlog extends Component {
    static displayName = AddBlog.name;

    constructor(props) {
        super(props);
        this.state = {
            keyLogin: 'login',
            keyToken: 'token'
        };
    }

    async addBlogSubmit(data, token) {
        const response = await fetch('api/handlerblog/addBlog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data),
            referrer: 'no-referrer',
        });

        if (response.ok !== true) {
            alert('Please Log in!');
        }
        else {
            alert('Successful!');
            window.location.href = '/profile';
        }

    }

    addBlog = (e) => {
        let token = localStorage.getItem(this.state.keyToken);

        e.preventDefault();
        let topic = e.currentTarget.elements[0].value;
        let title = e.currentTarget.elements[1].value;
        let headline = e.currentTarget.elements[2].value;
        let text = e.currentTarget.elements[3].value;
        let date = new Date();

        let body = {
            Topic: topic,
            Title: title,
            Headline: headline,
            Text: text,
            Date: date
        };

        this.addBlogSubmit(body, token);
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.addBlog}>
                    <FormGroup>
                        <Label for="topic">Выберите тему блога</Label>
                        <Input type="select" name="topic" id="topic" cols="20">
                            <option>Отношения</option>
                            <option>Деньги</option>
                            <option>Самопознание</option>
                            <option>Путешествия</option>
                            <option>Здоровье</option>
                            <option>Образование</option>
                            <option>Мечты</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="title">Название</Label>
                        <Input type="text" name="title" id="title" placeholder="title" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="headline">Описание</Label>
                        <Input type="text" name="headline" id="headline" placeholder="headline" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="text">Текст</Label>
                        <Input type="textarea" name="text" id="text" rows="10"/>
                    </FormGroup>
                    <Button color="danger">Добавить</Button>
                </Form>
            </div>
        );
    }
}