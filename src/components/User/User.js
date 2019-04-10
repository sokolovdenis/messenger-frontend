import React, {Component} from 'react';
import './User.css';

class User extends Component {
    render() {
        return (
            <div className="User">
                {this.props.name}
            </div>
        )
    }
}

export default User;
