import React, { Component } from 'react';
import { HubConnection } from '../../node_modules/@aspnet/signalr';

export class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nick: '',
            message: '',
            messages: [],
            hubConnection: null,
        };
    }

    render() {
        return (
            <div>
                <br />
                <div>
                    Chat
                </div>
            </div>
        );
    }
}
