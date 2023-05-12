import { Link } from "react-router-dom"
import * as userService from "../../utilities/users-service"
import './NavBar.css'

export default function NavBar({user, setUser, visible, setVisible, setExpenses, setIncome}) {
    function handleLogOut() {
        // we should delegate the actual loggin out to the users service
        userService.logOut()
        setExpenses([])
        setIncome([])
        setVisible(false)
        setUser(null)
        window.scrollTo(0,0)
    }

    function handleClick() {
        setVisible(false)
    }

    return (
        <nav className={visible ? 'Nav menu-visible' : 'Nav'}>
             <span>Welcome, {user && (user.name.charAt(0).toUpperCase() + user.name.slice(1))}</span>
            <Link onClick={handleClick} to="/home">Home</Link>
            <Link onClick={handleClick} to="/income">Income</Link>
            <Link onClick={handleClick} to="/expenses">Expenses</Link>
            <Link to="/" onClick={handleLogOut}>Log Out</Link>
        </nav>
    )
}