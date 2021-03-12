import React, {Component} from 'react';
import UserForm from './UserForm'

const endPoint = process.env.REACT_APP_ENDPOINT + "/users";

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
    }

    getAll() {
        this.props.getAll();
    }

    delete(event) {
        fetch(endPoint + "/" + this.props.id, {
            method: 'DELETE'
        })
            .then(response => {
                this.props.getAll();
            })
        event.preventDefault();
    }

    render() {
        const {id, name, color} = this.props;
        return (
            <div className="User">
                <p>{id}</p>
                <p>{name}</p>
                <p>{color}</p>
                <button onClick={this.delete}>削除</button>
                <UserForm getAll={this.getAll.bind(this)}
                          path={endPoint + "/" + id}
                          method={"PUT"}
                          id={id}/>
                <p>--------------------------</p>
            </div>
        )
    }
}

export default User;
