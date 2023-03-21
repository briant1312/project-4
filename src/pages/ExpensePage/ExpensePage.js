import ExpenseList from '../../components/ExpenseList/ExpenseList'
import AddExpense from '../../components/AddExpense/AddExpense'
import './ExpensePage.css'
import NavBar from '../../components/NavBar/NavBar'

export default function ExpensePage({userExpenses, setExpenses, user, setUser}) {

    return(
        <div className='expense-page'>
            <NavBar user={user} setUser={setUser}/>
            <ExpenseList setExpenses={setExpenses} expenses={userExpenses}/> 
            <AddExpense setExpenses={setExpenses}/>
        </div>
    )
}