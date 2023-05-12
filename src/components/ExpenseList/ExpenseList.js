import ExpenseItem from "../ExpenseItem/ExpenseItem"
import './ExpenseList.css'
import { useState, useEffect } from "react"
import Paginate from "../Paginate/Paginate"

export default function ExpenseList({expenses, setExpenses}) {
    const [displayed, setDisplayed] = useState(expenses.slice(0,5))

    useEffect(() => {
        setDisplayed(expenses.slice(0,5))
    }, [])

    return(
        <div className="expense-list">
            <h2 className="title">Expenses</h2>
            <div className="category-title">
            <p className="flex-item">Name</p>
            <p className="flex-item">Category</p>
            <p className="flex-item">Amount</p>
            </div>
            {displayed && displayed.map((expense, index) => (
                <ExpenseItem setExpenses={setExpenses} expense={expense} key={index}/>
            ))}
            <Paginate 
                setDisplayed={setDisplayed}
                numPerPage={5}
                pagenatedItems={expenses}
            />
        </div>
    )
}