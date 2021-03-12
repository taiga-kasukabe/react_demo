import React, {Component} from 'react';

const endPoint = process.env.REACT_APP_ENDPOINT + "/users";

class UserForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: this.props.name,
                color: this.props.color
            }
        };
        this.submit = this.submit.bind(this);
        this.checkValue = this.checkValue.bind(this);
    }

    render() {
        return (
            <div className="UserForm">
                <form>
                    <input type="text" name="name"
                    value={this.state.data.name}
                    onChange={this.checkValue}/>
                    <input type="text" name="color"
                    value={this.state.data.color}
                    onChange={this.checkValue}/>
                    <button onClick={this.submit}>送信</button>
                </form>
            </div>
        )
    }

    submit(event) {
        const path = this.props.path;
        const method = this.props.method;
        const id = this.props.id;
        const {name, color} = this.state.data;
        fetch(path, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                name: name,
                color: color
            })
        })
            .then(response =>{
                this.props.getAll();
            })
        event.preventDefault();
    }


    findByld(){
        fetch(endPoint + "/" + this.props.id,{
            method:"GET",
            headers:{
                'Content-type': 'application/json'
            }
        })
            .then(response =>{
                response.json().then(data=>{
                    this.setState({
                        data:{
                            name: data.name,
                            color: data.color
                        }
                    })
                })
            })
    }

    componentWillMount() {
        if(this.props.id!==null){
            this.findByld();
        }
    }

    checkValue(event){
        const type = event.target.name;
        const value = event.target.value;
        const data = {
            name:this.state.data.name,
            color:this.state.data.color,
        };
        switch(type){
            case "name":
                data.name = value;
                break;
            case "color":
                data.color = value;
                break;
            default:
        }
        this.setState({
            data: data
        })
    }
}

export default UserForm;