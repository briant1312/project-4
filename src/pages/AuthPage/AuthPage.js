import { useState } from 'react'
import SignUpForm from "../../components/SignUpForm/SignUpForm"
import LoginForm from "../../components/LoginForm/LoginForm.js"
import "./AuthPage.css"

export default function AuthPage({ setUser, setExpenses, setIncome }) {
    
    const [showSignUp, setShowSignUp] = useState(false)
    
    function handleSwitchForms(event) {
        event.preventDefault()
        setShowSignUp(!showSignUp)
    }

    return (
        <div className='auth-page-design'>
            {showSignUp ? (
                <SignUpForm setUser={setUser} />
            ) : (
                <LoginForm setExpenses={setExpenses} setIncome={setIncome} setUser={setUser} />
            )}
            {showSignUp ? 
                <>
                    <p>Already have an account? Login <a className="authpage-link" onClick={handleSwitchForms} href="">here</a></p>
                </>
                : 
                <>
                    <p>New here? Sign up <a className="authpage-link" onClick={handleSwitchForms} href="">here</a></p>
                </>
            }
        </div>
    )
}