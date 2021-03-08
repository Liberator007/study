import React, { Component, Children } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Table, Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Route, Switch, Redirect, Link } from "react-router-dom";

export class Employee extends Component {
    static displayName = Employee.name;
    constructor(props) {
        super(props);
        this.state = {
            listEmployee: [],
            listCompany: [],
            idEmployee: 0,
            idCompany: 0,
            modalAdd: false,
            modalEdit: false,
            modalDelete: false

        };
    }

    componentDidMount() {
        this.getListEmployee();
        this.getListCompany();
    }

    // Получение списка Работников
    async getListEmployee() {
        let url = "api/company/getListEmployee";
        await fetch(url)
            .then((response) => response.json())
            .then((response) => {
                this.setState({ listEmployee: response });
            })
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
    async addEmployeeSubmit(data) {
        const response = await fetch('api/company/addEmployee', {
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
            this.getListEmployee();
            this.getListCompany();
        }

    }

    // Отправка запроса на север с объектом для редактирования
    async editEmployeeSubmit(data) {
        const response = await fetch('api/company/editEmployee', {
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
            this.getListEmployee();
            this.getListCompany();
        }

    }

    // Оправка запроса на сервер с идентификатором объекта для его удаления
    async deleteEmployeeSubmit(idEmployee) {
        let url = 'api/company/deleteEmployee?id=' + idEmployee;
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
                    this.getListEmployee();
                    this.getListCompany();
                }
            })

    }

    // Добавление работника и формирование объекта для отправки на сервер
    addEmployee = (e) => {
        e.preventDefault();
        let surname = e.currentTarget.elements[0].value;
        let name = e.currentTarget.elements[1].value;
        let middleName = e.currentTarget.elements[2].value;
        let employmentDate = e.currentTarget.elements[3].value;
        let position = e.currentTarget.elements[4].value;
        let companyId = Number(e.currentTarget.elements[5].value);

        let body = {
            Id: 0,
            Surname: surname,
            Name: name,
            MiddleName: middleName,
            EmploymentDate: employmentDate,
            Position: position,
            CompanyId: companyId
        };

        this.addEmployeeSubmit(body);
    }

    // Реактирование работника и формирование объекта для отправки на сервер
    editEmployee = (e) => {
        e.preventDefault();
        let surname = e.currentTarget.elements[0].value;
        let name = e.currentTarget.elements[1].value;
        let middleName = e.currentTarget.elements[2].value;
        let employmentDate = e.currentTarget.elements[3].value;
        let position = e.currentTarget.elements[4].value;
        let companyId = Number(e.currentTarget.elements[5].value);

        let body = {
            Id: this.state.idEmployee,
            Surname: surname,
            Name: name,
            MiddleName: middleName,
            EmploymentDate: employmentDate,
            Position: position,
            CompanyId: companyId
        };

        this.editEmployeeSubmit(body);
    }

    // Удаление работника и формирование объекта для отправки на сервер
    deleteEmployee = () => {
        let idEmployee = this.state.idEmployee;
        this.deleteEmployeeSubmit(idEmployee);
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

    editEmployeeActivity = (idEmployee) => {
        this.setState({
            idEmployee: idEmployee
        });
        this.modalEditActivity();
    }

    deleteEmployeeActivity = (idEmployee) => {
        this.setState({
            idEmployee: idEmployee
        });
        this.modalDeleteActivity();
    }


    render() {
        let listEmployee = this.state.listEmployee;
        let listCompany = this.state.listCompany;

        return (
            <div>
                <br />
                <Button color="danger" onClick={this.modalAddActivity} pill> Добавить работника </Button>
                <br />
                <br /> 

                <h3>Работники</h3>

                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Фамилия</th>
                            <th>Имя</th>
                            <th>Отчество</th>
                            <th>Дата приема на работу</th>
                            <th>Должность</th>
                            <th>Компания</th>
                            <th>Редактировать</th>
                            <th>Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listEmployee.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.surname}</td>
                                <td>{employee.name}</td>
                                <td>{employee.middleName}</td>
                                <td>{employee.employmentDate}</td>
                                <td>{employee.position}</td>
                                
                                {listCompany.filter(company =>
                                    company.id == employee.companyId
                                )
                                    .map(company =>
                                        <td>{ company.name }</td>
                                    )
                                }
                                
                                <td><Button color="info" onClick={() => this.editEmployeeActivity(employee.id)}>Редактировать</Button></td>
                                <td><Button color="warning" onClick={() => this.deleteEmployeeActivity(employee.id)}>Удалить</Button></td>
                            </tr>
                        )
                        }
                    </tbody>

                </Table>

                <Modal isOpen={this.state.modalAdd} toggle={this.modalAddActivity} backdrop="static" >
                    <ModalHeader toggle={this.modalAddActivity}>
                        Добавление работника
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.addEmployee}>
                            <FormGroup>
                                <Label for="surname">Фамилия</Label>
                                <Input type="text" name="surname" id="surname" placeholder="surname" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Имя</Label>
                                <Input type="text" name="name" id="name" placeholder="name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Отчество</Label>
                                <Input type="text" name="name" id="name" placeholder="name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="employmentDate">Дата приема на работу</Label>
                                <Input
                                    type="date"
                                    name="employmentDate"
                                    id="employmentDate"
                                    placeholder="date placeholder"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="position">Выберите должность</Label>
                                <Input type="select" name="position" id="position" cols="20">
                                    <option>Разработчик</option>
                                    <option>Тестировщик</option>
                                    <option>Бизнес-аналитик</option>
                                    <option>Менеджер</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="companyId">Выберите компанию</Label>
                                <Input type="select" name="companyId" id="companyId" cols="20">
                                    {listCompany.map(company =>
                                        <option>{company.id}</option>
                                    )
                                    }
                                </Input>
                            </FormGroup>
                            <Button type="submit" color="danger">Да</Button>{' '}
                            <Button type="button" color="info" onClick={this.modalAddActivity}>Отмена</Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.modalEdit} toggle={this.modalEditActivity} backdrop="static" >
                    <ModalHeader toggle={this.modalEditActivity}>
                        Редактирование работника
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.editEmployee}>
                            <FormGroup>
                                <Label for="surname">Фамилия</Label>
                                <Input type="text" name="surname" id="surname" placeholder="surname" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Имя</Label>
                                <Input type="text" name="name" id="name" placeholder="name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Отчество</Label>
                                <Input type="text" name="name" id="name" placeholder="name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="employmentDate">Дата приема на работу</Label>
                                <Input
                                    type="date"
                                    name="employmentDate"
                                    id="employmentDate"
                                    placeholder="date placeholder"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="position">Выберите должность</Label>
                                <Input type="select" name="position" id="position" cols="20">
                                    <option>Разработчик</option>
                                    <option>Тестировщик</option>
                                    <option>Бизнес-аналитик</option>
                                    <option>Менеджер</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="companyId">Выберите компанию</Label>
                                <Input type="select" name="companyId" id="companyId" cols="20">
                                    {listCompany.map(company =>
                                        <option>{company.id}</option>
                                    )
                                    }
                                </Input>
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
                        Вы действительно хотите удалить выбранного работника?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.deleteEmployee()}>Да</Button>{' '}
                        <Button color="info" onClick={this.modalDeleteActivity}>Нет</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
/*<FormGroup>
    <Label for="topic">Выберите должность</Label>
    <Input type="select" name="position" id="topic" cols="20">
        <option>Разработчик</option>
        <option>Тестировщик</option>
        <option>Бизнес-аналитик</option>
        <option>Менеджер</option>
    </Input>
</FormGroup>*/