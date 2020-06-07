import React, { Component, Children } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Table, Button } from 'reactstrap';
import { Route, Switch, Redirect, Link } from "react-router-dom"
import { Blog } from './Blog';

import './css/web.css'
import './css/blog.css'

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = {
            listBlog: [],
            keyLogin: 'login',
            keyToken: 'token'
        };
    }

    componentDidMount() {
        //this.showListBlog();
        this.showBlogSubmit();

    }

    async showListBlog() {
        const response = await fetch('api/handlerblog/showListBlog');
        const data = await response.json();
        await this.setState({ listBlog: data });
    }

    async showBlogSubmit() {
        await fetch("api/handlerblog/showListBlog")
            .then((response) => response.json())
            .then((response) => {
                this.setState({ listBlog: response });
            })
    }

    activePageAddBloG = () => {
        window.location.href = '/addBlog';
    }

    activePageShowBlogList = (topic) => {
        window.location.href = '/home/blogList/' + topic;
    }

    activePageShowBlog = (id) => {
        window.location.href = '/home/blog/' + id;
    }

    render() {
        let listBlog = this.state.listBlog;
        let relations = 'Отношения';
        let money = 'Деньги';
        let career = 'Самопознание';
        let travels = 'Путешествия';
        let health = 'Здоровье';
        let education = 'Образование';
        let dreams = 'Мечты';
        let listTopic = [relations, money, career, travels, health, education, dreams];

        return (
            <div>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem><a id="relations" href="/home/blogList/Отношения">Отношения</a></BreadcrumbItem>
                        <BreadcrumbItem><a id="money" href="/home/blogList/Деньги">Деньги</a></BreadcrumbItem>
                        <BreadcrumbItem><a id="career" href="/home/blogList/Самопознание">Самопознание</a></BreadcrumbItem>
                        <BreadcrumbItem><a id="travels" href="/home/blogList/Путешествия">Путешествия</a></BreadcrumbItem>
                        <BreadcrumbItem><a id="health" href="/home/blogList/Здоровье">Здоровье</a></BreadcrumbItem>
                        <BreadcrumbItem><a id="education" href="/home/blogList/Образование">Образование</a></BreadcrumbItem>
                        <BreadcrumbItem><a id="dreams" href="/home/blogList/Мечты">Мечты</a></BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <br />
                <Button color="danger" onClick={this.activePageAddBloG} pill> Добавить блог </Button>
                <br />
                <br />

                {listTopic.map(topic =>
                    <div>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th class="topic"><h3>{topic}</h3></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listBlog.filter(blog =>
                                    blog.topic == topic
                                )
                                    .slice(0, 5)
                                    .map(blog =>
                                        <tr key={blog.id} onClick={() => this.activePageShowBlog(blog.id)}>
                                            <td>
                                                <div class="title">
                                                    <b>{blog.title}</b>
                                                </div>
                                                {blog.headline}
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                            <thead>
                                <tr>
                                    <td align="right">
                                        <Link className='SectionNavigation-Item Section' to="#" onClick={() => this.activePageShowBlogList(topic)}>
                                            <b>Показать все</b>
                                        </Link>
                                    </td>
                                </tr>
                            </thead>
                        </Table>
                        <br />
                    </div>
                )}
                <div class="footer">
                    <hr />
                    Blog - 2020 - Seliavi
                </div>
            </div>
        );
    }
}
