import React, { Component, Children } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Table, Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Route, Switch, Redirect, Link } from "react-router-dom";

export class Company extends Component {
    static displayName = Company.name;
    constructor(props) {
        super(props);
        this.state = {
            listCompany: [],
            idCompany: 0,
            modalAdd: false,
            modalEdit: false,
            modalDelete: false
        };
    }

    componentDidMount() {
        this.getListCompany();
    }

    // Получение списка компаний
    async getListCompany() {
        let url = "api/company/getListCompany";
        await fetch(url)
            .then((response) => response.json())
            .then((response) => {
                this.setState({ listCompany: response });
            })
    }

    // Отправка запроса на север с объектом для добавления
    async addCompanySubmit(data) {
        const response = await fetch('api/company/addCompany', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            referrer: 'no-referrer',
        });

        if (response.ok !== true) {
            alert('Error');
        }
        else {
            alert('Successful!');
            this.modalAddActivity();
            this.getListCompany();
        }

    }

    // Отправка запроса на север с объектом для редактирования
    async editCompanySubmit(data) {
        const response = await fetch('api/company/editCompany', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            referrer: 'no-referrer',
        });

        if (response.ok !== true) {
            alert('Error');
        }
        else {
            alert('Successful!');
            this.modalEditActivity();
            this.getListCompany();
        }

    }

    // Оправка запроса на сервер с идентификатором объекта для его удаления
    async deleteCompanySubmit(idCompany) {
        let url = 'api/company/deleteCompany?id=' + idCompany;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            referrer: 'no-referrer',
        })
            .then(res => {
                if (res.ok !== true) {
                    alert('Error');
                }
                else {
                    alert('Successful!');
                    this.modalDeleteActivity();
                    this.getListCompany();
                }
            })

    }

    // Добавление компании и формирование объекта для отправки на сервер
    addCompany = (e) => {
        e.preventDefault();
        let name = e.currentTarget.elements[0].value;
        let size = Number(e.currentTarget.elements[1].value);
        let formIncorporation = e.currentTarget.elements[2].value;

        let body = {
            Id: 0,
            Name: name,
            Size: size,
            FormIncorporation: formIncorporation
        };

        this.addCompanySubmit(body);
    }

    // Реактирование компании и формирование объекта для отправки на сервер
    editCompany = (e) => {
        e.preventDefault();
        let name = e.currentTarget.elements[0].value;
        let size = Number(e.currentTarget.elements[1].value);
        let formIncorporation = e.currentTarget.elements[2].value;

        let body = {
            Id: this.state.idCompany,
            Name: name,
            Size: size,
            FormIncorporation: formIncorporation
        };

        this.editCompanySubmit(body);
    }

    // Удаление компании и формирование объекта для отправки на сервер
    deleteCompany = () => {
        let idCompany = this.state.idCompany;
        this.deleteCompanySubmit(idCompany);
    }


    // Функции для обработки видимости формы---------------------------------------------------------------------------------------
    modalAddActivity = () => {
        this.setState({
            modalAdd: !this.state.modalAdd
        });
    }

    modalEditActivity = () => {
        this.setState({
            modalEdit: !this.state.modalEdit
        });
    }

    modalDeleteActivity = () => {
        this.setState({
            modalDelete: !this.state.modalDelete
        });
    }

    editCompanyActivity = (idCompany) => {
        this.setState({
            idCompany: idCompany
        });
        this.modalEditActivity();
    }

    deleteCompanyActivity = (idCompany) => {
        this.setState({
            idCompany: idCompany
        });
        this.modalDeleteActivity();
    }


    render() {

        let listCompany = this.state.listCompany;

        return (
            <div>
                <br />
                <Button color="danger" onClick={this.modalAddActivity} pill> Добавить компанию </Button>
                <br />
                <br /> 

                <h3>Компания</h3>

                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Название</th>
                            <th>Размер компании</th>
                            <th>Организационно-правовая форма</th>
                            <th>Редактировать</th>
                            <th>Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listCompany.map(company =>
                            <tr key={company.id}>
                                <td>{company.id}</td>
                                <td>{company.name}</td>
                                <td>{company.size}</td>
                                <td>{company.formIncorporation}</td>
                                <td><Button color="info" onClick={() => this.editCompanyActivity(company.id)}>Редактировать</Button></td>
                                <td><Button color="warning" onClick={() => this.deleteCompanyActivity(company.id)}>Удалить</Button></td>
                            </tr>
                        )
                        }
                    </tbody>
                </Table>

                <Modal isOpen={this.state.modalAdd} toggle={this.modalAddActivity} backdrop="static" >
                    <ModalHeader toggle={this.modalAddActivity}>
                        Добавление компании
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.addCompany}>
                            <FormGroup>
                                <Label for="name">Название</Label>
                                <Input type="text" name="name" id="name" placeholder="name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="size">Размер компании</Label>
                                <Input type="number" name="size" id="size" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="formIncorporation">Организационно-правовая форма</Label>
                                <Input type="text" name="formIncorporation" id="formIncorporation" />
                            </FormGroup>
                            <Button type="submit" color="danger">Да</Button>{' '}
                            <Button type="button" color="info" onClick={this.modalAddActivity}>Отмена</Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.modalEdit} toggle={this.modalEditActivity} backdrop="static" >
                    <ModalHeader toggle={this.modalEditActivity}>
                        Редактирование компании
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.editCompany}>
                            <FormGroup>
                                <Label for="nameEdit">Название</Label>
                                <Input type="text" name="nameEdit" id="nameEdit" placeholder="name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="sizeEdit">Размер компании</Label>
                                <Input type="number" name="sizeEdit" id="sizeEdit" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="formIncorporationEdit">Организационно-правовая форма</Label>
                                <Input type="text" name="formIncorporationEdit" id="formIncorporationEdit" />
                            </FormGroup>
                            <Button type="submit" color="danger">Да</Button>{' '}
                            <Button type="button" color="info" onClick={this.modalEditActivity}>Отмена</Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.modalDelete} toggle={this.modalDeleteActivity} backdrop="static" >
                    <ModalHeader toggle={this.modalDeleteActivity}>
                        Удаление
                    </ModalHeader>
                    <ModalBody>
                        Вы действительно хотите удалить выбранную компанию?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.deleteCompany()}>Да</Button>{' '}
                        <Button color="info" onClick={this.modalDeleteActivity}>Нет</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
