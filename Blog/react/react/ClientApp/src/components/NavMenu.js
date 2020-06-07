import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './css/NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor (props) {
        super(props);
        this.state = {
            collapsed: true,
            keyLogin: 'login',
            keyToken: 'token'
        };

        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    componentDidMount() {
        if (localStorage.length > 0) {
            document.getElementById("login").style.display = "none";
            document.getElementById("registration").style.display = "none";
            document.getElementById("profile").style.display = "inline-block";
            document.getElementById("logout").style.display = "inline-block";
        }
        else {
            document.getElementById("login").style.display = "inline-block";
            document.getElementById("registration").style.display = "inline-block";
            document.getElementById("profile").style.display = "none"; 
            document.getElementById("logout").style.display = "none"; 
        }

    }

    async openProfileSubmit(token) {
        let url = 'api/handlerblog/openProfile';

        fetch(url, {
            method: 'POST',
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
                    window.location.href = '/profile';
                }
            })
    }

    openProfile = () => {
        let token = localStorage.getItem(this.state.keyToken);
        this.openProfileSubmit(token)
    }

    userLogOut = () => {
        localStorage.removeItem(this.state.keyLogin);
        localStorage.removeItem(this.state.keyToken);
        window.location.href = '/';
    }

    toggleNavbar () {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        let login = localStorage.getItem(this.state.keyLogin);
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Blog</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Blog</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink id="login" tag={Link} className="text-dark" to="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink id="registration" tag={Link} className="text-dark" to="/registration">Sign up</NavLink>                  
                                </NavItem>
                                <NavItem>
                                    <NavLink id="profile" tag={Link} className="text-dark" to="#" onClick={this.openProfile}><b>{login}</b></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink id="logout" className="text-dark" href="#" onClick={this.userLogOut} >Log out</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
