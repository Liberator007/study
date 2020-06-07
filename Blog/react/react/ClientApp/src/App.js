import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Profile } from './components/Profile';
import { Login } from './components/Login';
import { Registration } from './components/Registration';

import './custom.css'

import { AddBlog } from './components/AddBlog';
import { Blog } from './components/Blog';
import { BlogList } from './components/BlogList';
import { BlogEdit } from './components/BlogEdit';



export default class App extends Component {
    static displayName = App.name;

    render () {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/profile' component={Profile} />
                <Route path='/login' component={Login} />
                <Route path='/registration' component={Registration} />
                <Route path='/addBlog' component={AddBlog} />
                <Route path="/home/blog/:idBlog" component={Blog} />
                <Route path="/home/blogList/:idBlogLsit" component={BlogList} />
                <Route path="/blog/blogEdit/:idBlog" component={BlogEdit} />
            </Layout>
        );
    }
}
