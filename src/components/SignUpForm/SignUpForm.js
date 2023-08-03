import { Component } from "react"
import { signUp } from "../../utilities/users-service"
import "./SignUpForm.css"

export default class SignUpForm extends Component{
    state = {
        name: '',
        username: '',
        password: '',
        confirm: '',
        error: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            error: ''
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        if(this.state.password !== this.state.confirm) {
            this.setState({
                error: "passwords do not match"
            })
            return
        }
        if(this.state.password.length < 5) {
            this.setState({
                error: "password must be at least 5 characters"
            })
            return
        }
        try {
            const formData = {...this.state}
            delete formData.error
            delete formData.confirm

            const user = await signUp(formData)
            this.props.setUser(user)
             

        } catch (error){
            if(error.message === "Failed to fetch") {
                error.message = "server is currently unavailable"
            }
            this.setState({
                error: error.message
            })
        }
    }

    render() {
        return (
            <div className="auth-container">
                <form autoComplete="off" onSubmit={this.handleSubmit} className="form-container">
                    <label>Name</label>
                    <input 
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required 
                    />
                    <label>Username</label>
                    <input 
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        required 
                    />
                    <label>Password</label>
                    <input 
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        min={5}
                        required 
                    />
                    {this.state.password.length > 0 && this.state.password.length < 5 && <p>password must be at least 5 characters</p>}
                    <label>Confirm</label>
                    <input 
                        type="password"
                        name="confirm"
                        value={this.state.confirm}
                        onChange={this.handleChange}
                        required 
                    />
                    <button type="submit">Sign Up</button>
                </form>
                <p className="error-message">{this.state.error}</p>
            </div>
            
        )
    }
}
