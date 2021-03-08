import React, { Component, Children } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Table, Button } from 'reactstrap';
import { Route, Switch, Redirect, Link } from "react-router-dom"

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = {
            count: []
        };
    }

    showListCompany = () => {
        window.location.href = '/company';
    }

    showListEmployee = () => {
        window.location.href = '/employee';
    }

    render() {
        let count = this.state.count;
        return (
            <div>
                <Button color="danger" onClick={this.showListCompany}>Список компаний</Button>{' '}
                <Button color="info" onClick={this.showListEmployee}>Список работников</Button>
            </div>
        );
    }
}
