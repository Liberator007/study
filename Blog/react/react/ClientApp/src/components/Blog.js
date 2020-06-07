import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Children } from 'react';
import { Table } from 'reactstrap';
import { Jumbotron, Badge, Container } from 'reactstrap';
import { Link } from "react-router-dom"
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './css/web.css'

export class Blog extends Component {
    static displayName = Blog.name;

    constructor(props) {
        super(props);
        this.state = {
            keyLogin: 'login',
            keyToken: 'token',
            modalEdit: false,
            idComment: 0,
            comment: [],
            blog: [],
            listComment: [],
            listUser: []
        };
    }

    componentDidMount() {
        let token = localStorage.getItem(this.state.keyToken);
        let data = localStorage.getItem(this.state.keyLogin);

        const idBlog = this.props.match.params.idBlog;

        this.getBlog(idBlog);
        this.getComment(idBlog);
        this.getUserList();


        let listComment = this.state.listComment;
        let lengthListComment = listComment.length;
/*        if (lengthListComment == 0) {
            document.getElementById("badge").style.display = "none";
        } else {
            document.getElementById("badge").style.display = "inline-block";
        }*/
    }

    async getBlog(data) {
        let url = 'api/blog/getBlog?id=' + data;
        await fetch(url)
            .then((response) => response.json())
            .then((response) => {
                this.setState({ blog: response });
            });
    }

    async getComment(idBlog) {
        let url = 'api/blog/getComment?id=' + idBlog;
        await fetch(url)
            .then((response) => response.json())
            .then((response) => {
                this.setState({ listComment: response });
            });
    }

    async getUserList() {
        let url = 'api/blog/getUserList';
        await fetch(url)
            .then((response) => response.json())
            .then((response) => {
                this.setState({ listUser: response });
            });
    }

    async addCommentSubmit(token, data, idBlog) {
        let url = 'api/blog/addComment?id=' + idBlog;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data),
            referrer: 'no-referrer',
        })
            .then(res => {
                if (res.ok !== true) {
                    alert('Please Log in!');
                }
                else {
                    alert('Комментарий добавлен!');
                    this.getBlog(idBlog);
                    this.getComment(idBlog);
                    this.getUserList();
                }
            })

    }

    async editCommentSubmit(token, data, idBlog) {
        let url = 'api/blog/editComment';

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data),
            referrer: 'no-referrer',
        })
            .then(res => {
                if (res.ok !== true) {
                    alert('Please Log in!');
                }
                else {
                    alert('Комментарий редактирован!');
                    this.getBlog(idBlog);
                    this.getComment(idBlog);
                    this.getUserList();
                }
            })

    }

    addComment = (e) => {
        const idBlog = this.props.match.params.idBlog;
        let token = localStorage.getItem(this.state.keyToken);

        e.preventDefault();
        let text = e.currentTarget.elements[0].value;
        let rating = Number(e.currentTarget.elements[1].value);
        let date = new Date();

        let body = {
            Text: text,
            Rating: rating,
            Date: date
        };

        this.addCommentSubmit(token, body, idBlog);
    }

    editComment = () => {
        const idBlog = this.props.match.params.idBlog;
        let token = localStorage.getItem(this.state.keyToken);
        let commentBody = this.state.comment;
        let commentDB = {
            Id: commentBody.id,
            Text: document.getElementById("exampleCommentEdit").value,
            Date: commentBody.date,
            Rating: Number(document.getElementById("exampleRatingEdit").value),
            BlogId: commentBody.blogId,
            UserId: commentBody.userId
        };
        //commentDB.text = document.getElementById("exampleCommentEdit").value;
        //commentDB.rating = document.getElementById("exampleRatingEdit").value;

        this.editCommentSubmit(token, commentDB, idBlog);

        this.setState({ modalEdit: !this.state.modalEdit });
    }

    modalEditActivity = (comment) => {
        this.setState({ comment: comment });
        this.setState({ idComment: comment.id });
        this.setState({ modalEdit: !this.state.modalEdit });
    }


    render() {
        const idBlog = this.props.match.params.idBlog;
        let blog = this.state.blog;
        let listComment = this.state.listComment;
        let listUser = this.state.listUser;
        let login = localStorage.getItem(this.state.keyLogin);

        let rating = 0;
        let lengthListComment = listComment.length;
        for (let comment of listComment) {
            rating = rating + comment.rating;
        }

        if (lengthListComment == 0) {
            rating = 0;
            
        } else {
            rating = rating / lengthListComment;
        }
        

        return (
            <div>
                <div class="topic">
                    Тема - {blog.topic}
                </div>
                <br />
                <div class="title">
                    <h1>{blog.title}</h1>
                </div>
                <br />
                <div class="headline">
                    <b>{blog.headline}</b>
                </div>
                <div class="text">
                    {blog.text}
                </div>
                <div class="date">
                    {blog.date}
                </div>
                <h1>
                    <Badge id="badge" color="secondary" class="badge">
                        {rating.toFixed(1)} из 5
                    </Badge>
                </h1>

                <br />
                <hr />
                <br />

                <Form onSubmit={this.addComment}>
                    <FormGroup>
                        <Label for="exampleComment">Добавить комментарий</Label>
                        <Input type="textarea" name="exampleComment" id="exampleComment" rows="3" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleRating">Select</Label>
                        <Input type="select" name="exampleRating" id="exampleRating">
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                    </FormGroup>
                    <Button color="info">Отправить</Button>
                </Form>

                <br />
                <hr />
                <br />

                <h2>Комментарии</h2>

                <Table striped>
                    <thead>
                    </thead>
                    <tbody>
                        {listComment
                            .map(commentOne =>
                                <tr key={commentOne.id}>
                                    <div id="content_feedback">
                                        <div class="pad">
                                            
                                            {listUser.filter(user =>
                                                user.id == commentOne.userId)
                                                .slice(0, 1)
                                                .map(user =>
                                                    <p class="name">
                                                        {user.username}
                                                        {listUser.filter(userEdit =>
                                                            (userEdit.username == login) && (userEdit.id == commentOne.userId))
                                                            .slice(0, 1)
                                                            .map(userEdit =>
                                                                <div class="editComment">
                                                                    &emsp;-&emsp;(<Link className='text-dark' to="#" onClick={() => this.modalEditActivity(commentOne)}>Изменить</Link>)
                                                                </div>
                                                            )
                                                        }
                                                    </p>
                                                )
                                            }
                                            
                                            <p class="feedback">
                                                {commentOne.text}
                                            </p>
                                            <h3>
                                                <Badge color="secondary">
                                                    {commentOne.rating}/5
                                                </Badge>
                                            </h3>
                                            <hr />
                                            <p class="dateComment">
                                                {commentOne.date}
                                            </p>
                                        </div>
                                    </div>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>

                <Modal isOpen={this.state.modalEdit} toggle={this.modalEditActivity} backdrop="static" >
                    <ModalHeader toggle={this.modalEditActivity}>
                        Редактирование комментария
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleCommentEdit">Добавить комментарий</Label>
                                <Input type="textarea" name="exampleCommentEdit" id="exampleCommentEdit" rows="3" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleRatingEdit">Select</Label>
                                <Input type="select" name="exampleRatingEdit" id="exampleRatingEdit">
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.editComment}>Сохранить</Button>{' '}
                        <Button color="info" onClick={this.modalEditActivity}>Отмена</Button>
                    </ModalFooter>
                </Modal>

                <div class="footer">
                    <hr />
                    Blog - 2020 - Seliavi
                </div>
            </div>
        );
    }
}