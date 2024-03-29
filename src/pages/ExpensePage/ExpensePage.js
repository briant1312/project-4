import ExpenseList from '../../components/ExpenseList/ExpenseList'
import AddExpense from '../../components/AddExpense/AddExpense'
import './ExpensePage.css'
import NavBar from '../../components/NavBar/NavBar'

export default function ExpensePage({userExpenses, setExpenses, setIncome, user, setUser, visible, setVisible}) {

    return(
        <div className='expense-page'>
            <NavBar setIncome={setIncome} setExpenses={setExpenses} setVisible={setVisible} visible={visible} user={user} setUser={setUser}/>
            <ExpenseList setExpenses={setExpenses} expenses={userExpenses}/> 
            <AddExpense setExpenses={setExpenses}/>
        </div>
    )
}