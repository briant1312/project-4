import { useState } from "react"
import { logIn } from "../../utilities/users-service"
import { show as showExpenses } from "../../utilities/expenses-api"
import { show as showIncomes } from "../../utilities/income-api"
import "./LoginForm.css"

export default function LoginForm({setUser, setIncome, setExpenses}) {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    })

    const [error, setError] = useState('')

    function handleChange(e) {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault()
            const user = await logIn(credentials)
            setUser(user)
            const expenses = await showExpenses()
            const incomes = await showIncomes()
            setIncome(incomes)
            setExpenses(expenses)
        } catch (err) {
            if(err.message === "Failed to fetch") {
                err.message = "server is currently unavailable"
            }
            setError(err.message)
        }
    }

    return (
        <div className="auth-container">
                <form autoComplete="off" onSubmit={handleSubmit} className="form-container">
                    <label>Username</label>
                    <input 
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required 
                    />
                    <label>Password</label>
                    <input 
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required 
                    />
                    <button type="submit">Sign In</button>
                </form>
                <p className="error-message">{error}</p>
            </div>
    )
}
