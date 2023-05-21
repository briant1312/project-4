import EditIncome from "../EditIncome/EditIncome"
import { useState } from "react"
import './IncomeItem.css'
import { FaEdit } from "react-icons/fa"

export default function IncomeItem({income, setIncome}) {
    const [visible, setVisible] = useState(false)

    function handleClick() {
        setVisible(!visible)
    }

    const incomeDate = new Date(income.date)
    
    return(
        <>
            <div className="income-item">
                <div className="income-date-button">
                <p>{incomeDate.toLocaleDateString()}</p>
                <span onClick={handleClick}><FaEdit className="edit-button"/></span></div>
                <div className="income-item-description">
                <p className="flex-item">{income.category}</p>
                <p className="flex-item">${income.amount}</p></div>
            </div>
            <div className={visible ? 'edit-background edit-background-visible' : 'edit-background'}></div>
            <EditIncome visible={visible} setIncome={setIncome} income={income} setVisible={setVisible}/>
        </>
    )
}