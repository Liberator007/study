import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export class BlogEdit extends Component {
    static displayName = BlogEdit.name;

    constructor(props) {
        super(props);
        this.state = {
            keyLogin: 'login',
            keyToken: 'token',
            blog: [],
            value: {
                topic: '',
                title: '',
                headline: '',
                text: '',
                date: new Date()
            }
        };
    }

    activePageProfile = () => {
        window.location.href = '/profile';
    }

    componentDidMount() {
        let token = localStorage.getItem(this.state.keyToken);
        let data = localStorage.getItem(this.state.keyLogin);

        const idBlog = this.props.match.params.idBlog;

        this.getBlog(idBlog);

    }

    async getBlog(idBlog) {
        let url = 'api/blog/getBlog?id=' + idBlog;
        await fetch(url)
            .then((response) => response.json())
            .then((response) => {
                this.setState({ blog: response });
            });
    }

    async editBlogSubmit(data, token, idBlog) {
        const response = await fetch('api/blog/editBlog?id=' + idBlog, {
            method: 'PUT',
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
            this.activePageProfile();
        }
    }

    editBlog = (e) => {
        let token = localStorage.getItem(this.state.keyToken);

        e.preventDefault();
        let topic = e.currentTarget.elements[0].value;
        let title = e.currentTarget.elements[1].value;
        let headline = e.currentTarget.elements[2].value;
        let text = e.currentTarget.elements[3].value;
        let date = this.state.blog.date;

        let body = {
            Topic: topic,
            Title: title,
            Headline: headline,
            Text: text,
            Date: date
        };

        const idBlog = this.props.match.params.idBlog;

        this.editBlogSubmit(body, token, idBlog);
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.editBlog}>
                    <FormGroup>
                        <Label for="topic">Выберите тему блога</Label>
                        <Input type="select" name="topic" id="topic" cols="20" value={this.state.blog.topic}
                            onChange={(e) => {
                                let { blog } = this.state;
                                blog.topic = e.target.value;
                                this.setState({ blog })
                            }}
                        >
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
                        <Input type="text" name="title" id="title" placeholder="title" value={this.state.blog.title}
                            onChange={(e) => {
                                let { blog } = this.state;
                                blog.title = e.target.value;
                                this.setState({ blog })
                            }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="headline">Описание</Label>
                        <Input type="text" name="headline" id="headline" placeholder="headline" value={this.state.blog.headline}
                            onChange={(e) => {
                                let { blog } = this.state;
                                blog.headline = e.target.value;
                                this.setState({ blog })
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="text">Текст</Label>
                        <Input type="textarea" name="text" id="text" rows="10" value={this.state.blog.text}
                            onChange={(e) => {
                                let { blog } = this.state;
                                blog.text = e.target.value;
                                this.setState({ blog })
                            }}
                        />
                    </FormGroup>
                    <Button color="danger">Сохранить изменения</Button>
                </Form>
            </div>
        );
    }
}