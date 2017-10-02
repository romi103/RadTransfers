import {Component} from 'react';
import {setAccessToken, setIdToken} from '../auth/auth.js'

class Callback extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        setAccessToken();
        setIdToken();
        window.location.href = '/'
    }

    render() {
        return null;
    }
}

export default Callback;