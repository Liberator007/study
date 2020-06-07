import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class Profile extends Component {
    static displayName = Profile.name;
    constructor(props) {
        super(props);
        this.state = {
            listBlog: [],          
            keyLogin: 'login',
            keyToken: 'token',
            modalDelete: false,
            idBlog: 0
        };
    }
      
    componentDidMount() {
        let token = localStorage.getItem(this.state.keyToken);
        let login = localStorage.getItem(this.state.keyLogin);
        
        this.showProfile(login);
        
    }

    async showProfile(idUser) {
        let url = "api/handlerblog/showProfile?id=" + idUser;
        await fetch(url)
            .then((response) => response.json())
            .then((response) => {
                this.setState({ listBlog: response });
            })
    }

    async deleteBlogSubmit(login, token, idBlog) {
        let url = 'api/blog/deleteBlog?id=' + idBlog;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            referrer: 'no-referrer',
        })
            .then(res => {
                if (res.ok !== true) {
                    alert('Please Log in!');
                }
                else {
                    alert('Блог успешно удален!');
                    this.modalDeleteActivity();
                    this.showProfile(login);
                }
            })

    }

    editBlogProfile = (idBlog) => {
        window.location.href = '/blog/blogEdit/' + idBlog;
    }


    deleteBlog = (idBlog) => {
        let token = localStorage.getItem(this.state.keyToken);
        let login = localStorage.getItem(this.state.keyLogin);

        this.deleteBlogSubmit(login, token, idBlog);
    }

    modalDeleteActivityWithIdBlog = (idBlog) => {
        this.state.idBlog = idBlog;
        this.setState({ modalDelete: !this.state.modalDelete });
    }

    modalDeleteActivity = () => {
        this.setState({ modalDelete: !this.state.modalDelete });
    }

    render() {
        let listBlog = this.state.listBlog;
        let idBlog = this.state.idBlog;

        return (
            <div>
                <Table striped>
                    <thead>
                        <tr>
                            <th><h3>Блоги</h3></th>
                        </tr>
                        <tr>
                            <th>Тема</th>
                            <th>Название</th>
                            <th>Описание</th>
                            <th>Дата</th>
                            <th>Редактирование</th>
                            <th>Удаление</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listBlog.map(blog =>
                            <tr key={blog.id}>
                                <td>{blog.topic}</td>
                                <td>{blog.title}</td>
                                <td>{blog.headline}</td>
                                <td>{blog.date}</td>
                                <td><Button color="info" onClick={() => this.editBlogProfile(blog.id)}>Редактировать</Button></td>
                                <td><Button color="warning" onClick={() => this.modalDeleteActivityWithIdBlog(blog.id)}>Удалить</Button></td>
                            </tr>
                            )
                        }
                    </tbody>
                </Table>

                <Modal isOpen={this.state.modalDelete} toggle={this.modalDeleteActivity} backdrop="static" >
                    <ModalHeader toggle={this.modalDeleteActivity}>
                        Удаление
                    </ModalHeader>
                    <ModalBody>
                        Вы действительно хотите удалить выбранный блог?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.deleteBlog(idBlog)}>Да</Button>{' '}
                        <Button color="info" onClick={this.modalDeleteActivity}>Нет</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}