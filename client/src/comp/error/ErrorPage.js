import React from 'react';
import { Alert, Button} from 'react-bootstrap';

import { errorHide } from '../../store/action/action.js';

export default class ErrorPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
                    <h4>Oh snap! You got an error!</h4>
                    <h4>{this.props.errorStatus.status} {this.props.errorStatus.statusText}</h4>
                    <p>
                        <Button bsStyle="danger" onClick={() => {this.props.dispatch(errorHide())}}>Ok</Button>
                    </p>
                </Alert>
            </div>
        );
    }
}