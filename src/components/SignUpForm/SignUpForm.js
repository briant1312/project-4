import { Component } from "react"
import { signUp } from "../../utilities/users-service"
import "./SignUpForm.css"

export default class SignUpForm extends Component{
    // state is just a POJO
    state = {
        name: '',
        username: '',
        password: '',
        confirm: '',
        error: ''
    }

    handleChange = (event) => {
        this.setState({
            // name, email, password, confirm
            [event.target.name]: event.target.value,
            error: ''
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        // alert(JSON.stringify(this.state))
        try {
            // taking the state and making a copy of the state and
            // assigning it to formData var
            const formData = {...this.state}
            delete formData.error
            delete formData.confirm

            // wait for a response back from the server
            const user = await signUp(formData)
            this.props.setUser(user)
             

        } catch (error){
            console.error(error)
            this.setState({
                error: "Sign up failed = Try again later"
            })
        }
    }

    render() {
        const disabled = this.state.password !== this.state.confirm

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
                    <button type="submit" disabled={disabled}>Sign Up</button>
                </form>
                <p className="error-message">{this.state.error}</p>
            </div>
            
        )
    }
}