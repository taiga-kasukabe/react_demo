import logo from './logo.svg';
import './App.css';
import User from './component/User.js'
import UserForm from "./component/UserForm";
import {Component} from "react";

const endPoint = process.env.REACT_APP_ENDPOINT + "/users";

class App extends Component {
    function

    App() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }

        constructor(props){
            super(props);
            this.state = {
                id: '',
                name: '',
                color: '',
                data: []
            }
            this.getAll = this.getAll.bind(this);
        }

        getAll()
        {
            fetch(endPoint, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then(response => {
                    response.json().then(data => {
                        this.setState({data: data})
                    })
                })
        }

        componentWillMount()
        {
            this.getAll();
        }

        render()
        {
            const users = this.state.data;
            const user = users.map((user) => {
                return <User key={user.id}
                             id={user.id}
                             name={user.name}
                             color={user.color}/>
            });
            return (
                <div className="App">
                    <p>新規作成</p>
                    <UserForm getAll={this.getAll.bind(this)}
                              path={endPoint} method={"POST"}
                              id={null}/>
                    <p>-------------------------</p>
                    <div>{user}</div>
                </div>
            );
        }

}

export default App;
