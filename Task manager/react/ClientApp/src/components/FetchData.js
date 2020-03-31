import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, ButtonToolBar, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';



export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = {
            taskObjects: [],
            tokenKey: 'accessToken',
            svap: "Svadba",
            loading: true,
            modal: false,
            modalFilter: false,
            modalLogin: false,
            modalRegistry: false,
            client: '',
            keyLogin: 'login',
            keyToken: 'token'
        };
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    //--------------Request-----------------------------------------------------------------------------------------------------------
    componentDidMount() {
        this.populateWeatherData();
    }

    async populateWeatherData() {
        if (localStorage.length > 0) {
            this.state.client = localStorage.getItem(this.state.keyLogin);
            document.getElementById("loginButton").style.display = "none";
            document.getElementById("logOutButton").style.display = "inline-block";
        } else {
            this.state.client = 'guest';
            document.getElementById("loginButton").style.display = "inline-block";
            document.getElementById("logOutButton").style.display = "none";
        }
        const response = await fetch('api/values/fetch-data');
        const data = await response.json();
        this.setState({ taskObjects: data, loading: false });
    }

    async handleSubmit (data, token) {
        const response = await fetch('api/values/fetch-data', {
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

        this.populateWeatherData();
    }

    filterTaskSubmit = (data) => {
        fetch('api/values/fetch-data/filter-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            referrer: 'no-referrer',
        })
            .then(res => this.populateWeatherData())
    }

    noneFilterTaskSubmit = (data) => {
        fetch('api/values/fetch-data/none-filter-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            referrer: 'no-referrer',
        })
            .then(res => this.populateWeatherData())
    }

    async deleteTaskSubmit (data, token) {
        const response = await fetch('api/values/fetch-data/delete-task', {
            method: 'DELETE',
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

        this.populateWeatherData();
    }

    userRegistrySubmit = (data) => {
        fetch('api/values/fetch-data/registry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            referrer: 'no-referrer',
        })
            .then(res => this.populateWeatherData())
    }

    async userLoginSubmit (data) {
        const response = await fetch('api/values/fetch-data/login', {
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
        }
        else {
            alert('Sign in error!!!');
        }

        this.populateWeatherData();
        //debugger;

    }

    //--------------Request-----------------------------------------------------------------------------------------------------------



    //--------------Modal-----------------------------------------------------------------------------------------------------------
    toggle = () => this.setState({
        modal: !this.state.modal
    });

    filter = () => this.setState({
        modalFilter: !this.state.modalFilter
    });

    loginModalActivity = () => this.setState({
        modalLogin: !this.state.modalLogin
    });

    registryModalActivity = () => this.setState({
        modalRegistry: !this.state.modalRegistry
    });
    //--------------Modal-----------------------------------------------------------------------------------------------------------



    //--------------Submit-OnClick-----------------------------------------------------------------------------------------------------------


    addFilter = (e) => {
        e.preventDefault();
        let dateString = e.currentTarget.elements[0].value;

        let copyListTask = this.state.taskObjects;

        copyListTask.filter(taskObject =>
            (new Date(taskObject.time)) > (new Date(dateString))
        ).map(taskObject =>
            taskObject.filter = true
        );

        this.filter();
        this.filterTaskSubmit(copyListTask);        
    }

    noneFilter = () => {

        let copyListTask = this.state.taskObjects;

        copyListTask.map(taskObject =>
            taskObject.filter = false
        );

        this.filter();
        this.noneFilterTaskSubmit(copyListTask);

    }

    addTask = (e) => {
        console.log(e.currentTarget.elements[0].value)
        e.preventDefault();
        let path;
        let token;
        var fullPath = e.currentTarget.elements[2].value;
        if (fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            path = filename;
        }
        let body = {
            Information: e.currentTarget.elements[0].value,
            Time: e.currentTarget.elements[1].value,
            Complete: false,
            Filter: false,
            Path: path
        };

        if (localStorage.length > 0) {
            token = localStorage.getItem(this.state.keyToken);
        }
        //else {
        //    token = '';
        //}

        this.state.taskObjects.push(body);
        this.toggle();
        this.handleSubmit(body, token);
    }

    deleteTask = (data) => {
        //let info = this.svap;

        //let copyListTask = this.state.taskObjects;

        //copyListTask.filter(taskObject =>
        //    taskObject.information == info
        //).map(taskObject =>
        //    taskObject.complete = true
        //);
        let token;
        if (localStorage.length > 0) {
            token = localStorage.getItem(this.state.keyToken);
        }

        this.deleteTaskSubmit(data, token);
    }

    userRegistry = (e) => {
        e.preventDefault();

        let username = e.currentTarget.elements[0].value;
        let password = e.currentTarget.elements[1].value;

        let body = {
            Username: username,
            Password: password,
        };

        this.registryModalActivity();
        this.userRegistrySubmit(body);
    }

    userLogin = (e) => {
        e.preventDefault();

        let username = e.currentTarget.elements[0].value;
        let password = e.currentTarget.elements[1].value;

        let body = {
            Username: username,
            Password: password,
        };

        this.loginModalActivity();
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("logOutButton").style.display = "inline-block";
        this.userLoginSubmit(body);
    }

    userLogOut = () => {
        localStorage.removeItem(this.state.keyLogin);
        localStorage.removeItem(this.state.keyToken);
        if (localStorage.length > 0) {
            this.state.client = localStorage.getItem(this.state.keyLogin);
        } else {
            this.state.client = 'guest';
        }
        document.getElementById("loginButton").style.display = "inline-block";
        document.getElementById("logOutButton").style.display = "none";
        this.populateWeatherData();
    }

    //--------------Submit-OnClick-----------------------------------------------------------------------------------------------------------


    render() {

        let taskObjects = this.state.taskObjects;

        return (
            <div>
                <div>
                    <h1 id="client" >Hi, {this.state.client}</h1>
                    <br />
                </div>
                <div>
                    <Button color="danger" onClick={this.toggle}>Add Task</Button> {' '}
                    <Button color="info" onClick={this.filter}>Filter</Button> {' '}
                    <Button color="warning" onClick={this.registryModalActivity}>Registration</Button> {' '}
                    <Button id="loginButton" color="success" onClick={this.loginModalActivity}>Log in</Button> {' '}
                    <Button id="logOutButton" color="success" onClick={this.userLogOut}>Log Out</Button>
                    <br />
                    <br />

                    <Modal isOpen={this.state.modalFilter} toggle={this.filter}>
                        <ModalHeader toggle={this.filter}>Filter</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.addFilter}>
                                <FormGroup>
                                    <Label for="filterDate">Date</Label>
                                    <Input
                                        type="date"
                                        name="filterDate"
                                        id="filterDate"
                                        placeholder="date placeholder"
                                    />
                                </FormGroup>
                                <br />
                                <Button color="primary" type="submit" >Filter</Button>{'      '} 
                                <Button color="warning" onClick={this.noneFilter} >Take off</Button>
                            </Form>
                        </ModalBody>
                        <ModalFooter>        
                            <Button color="secondary" onClick={this.filter}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.modal} modalTransition={{ timeout: 100 }} backdropTransition={{ timeout: 300 }}
                        toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Add Task</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.addTask}>

                                <FormGroup>
                                    <Label for="exampleText">Text Area</Label>
                                    <Input type="textarea" name="text" id="exampleText" />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="exampleDate">Date</Label>
                                    <Input
                                        type="date"
                                        name="date"
                                        id="exampleDate"
                                        placeholder="date placeholder"
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="exampleFile">File</Label>
                                    <Input type="file" name="file" id="exampleFile" />
                                    <br />
                                </FormGroup>

                                <Button color="info">Submit</Button>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            {' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.modalRegistry} toggle={this.registryModalActivity}>
                        <ModalHeader toggle={this.registryModalActivity}>Registration</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.userRegistry}>
                                <FormGroup>
                                    <Label for="exampleUsername">Username</Label>
                                    <Input name="username" id="exampleUsername" placeholder="Username" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">Password</Label>
                                    <Input type="password" name="password" id="examplePassword" placeholder="Password" />
                                </FormGroup>
                                <br />                                
                                <Button color="warning" type="submit" >Registration</Button>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.registryModalActivity}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.modalLogin} toggle={this.loginModalActivity}>
                        <ModalHeader toggle={this.loginModalActivity}>Log in</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.userLogin}>
                                <FormGroup>
                                    <Label for="exampleUsername">Username</Label>
                                    <Input name="username" id="exampleUsername" placeholder="Username" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">Password</Label>
                                    <Input type="password" name="password" id="examplePassword" placeholder="Password" />
                                </FormGroup>
                                <br />
                                <Button color="warning" type="submit" >Log in</Button>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.loginModalActivity}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                </div>

                <div>                   
                    <div>

                        <table className='table table-striped' aria-labelledby="tabelLabel">
                            <thead>

                                <tr>
                                    <th>Information</th>
                                    <th>Time</th>
                                    <th>Path</th>
                                    <th>Delete</th>
                                </tr>

                            </thead>
                            <tbody>

                                {taskObjects.filter(taskObject =>
                                    taskObject.filter == false
                                )
                                    .map(taskObject =>
                                        <tr key={taskObject.information}>
                                            <td>{taskObject.information}</td>
                                            <td>{taskObject.time}</td>
                                            <td>{taskObject.path}</td>
                                            <td><Button onClick={() => this.deleteTask(taskObject.information)} >Delete</Button></td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>


                    </div>
                </div>
                
            </div>
        )
    }
}