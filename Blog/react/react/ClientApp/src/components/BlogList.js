import React, { Component, Children } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Table, Button } from 'reactstrap';
import { Route, Switch, Redirect, Link } from "react-router-dom"
import { Blog } from './Blog';

export class BlogList extends Component {
    static displayName = BlogList.name;
    constructor(props) {
        super(props);
        this.state = {
            listBlog: [],
            keyLogin: 'login',
            keyToken: 'token'
        };
    }

    componentDidMount() {
        const idBlogLsit = this.props.match.params.idBlogLsit;

        this.showBlogSubmit(idBlogLsit);

    }

    async showBlogSubmit(idBlogLsit) {
        let url = "api/blog/getBlogList?id=" + idBlogLsit;
        await fetch(url)
            .then((response) => response.json())
            .then((response) => {
                this.setState({ listBlog: response });
            })
    }

    activePageAddBloG = () => {
        window.location.href = '/addBlog';
    }

    activePageShowBlog = (id) => {
        window.location.href = '/home/blog/' + id;
    }

    render() {
        let listBlog = this.state.listBlog;
        const idBlogLsit = this.props.match.params.idBlogLsit;
        let relations = 'Отношения';
        let money = 'Деньги';
        let career = 'Карьера';
        let travels = 'Путешествия';
        let health = 'Здоровье';
        let education = 'Образование';
        let dreams = 'Мечты';

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

                <Table bordered hover>
                    <thead>
                        <tr>
                            <th class="topic"><h3>{idBlogLsit}</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listBlog
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
                </Table>
            </div>
        );
    }
}