import AddIncome from '../../components/AddIncome/AddIncome'
import IncomeList from '../../components/IncomeList/IncomeList'
import './IncomePage.css'
import NavBar from '../../components/NavBar/NavBar'

export default function IncomePage({userIncome, setIncome, user, setUser, visible, setVisible}) {
    return(
        <div className='income-page'>
            <NavBar setVisible={setVisible} visible={visible} user={user} setUser={setUser}/>
            <IncomeList setIncome={setIncome} incomeArray={userIncome}/>
            <AddIncome setIncome={setIncome} />
        </div>
    )
}