import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Employee } from './components/Employee';
import { Company } from './components/Company';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

    render () {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route exact path='/employee' component={Employee} />
                <Route exact path='/company' component={Company} />
            </Layout>
        );
    }
}
