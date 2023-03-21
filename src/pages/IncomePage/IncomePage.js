import AddIncome from '../../components/AddIncome/AddIncome'
import IncomeList from '../../components/IncomeList/IncomeList'
import './IncomePage.css'
import NavBar from '../../components/NavBar/NavBar'

export default function IncomePage({userIncome, setIncome, user, setUser}) {
    return(
        <div className='income-page'>
            <NavBar user={user} setUser={setUser}/>
            <IncomeList setIncome={setIncome} incomeArray={userIncome}/>
            <AddIncome setIncome={setIncome} />
        </div>
    )
}