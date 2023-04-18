import { useState, useEffect } from "react";
import * as expenseAPI from '../../utilities/expenses-api'
import './EditExpense.css'

export default function EditIncome({expense, setExpenses, setVisible, visible}) {
    const [editExpense, setEditExpense]= useState({
        name: expense.name,
        category: expense.category,
        amount: expense.amount,
        date: expense.date.slice(0, 10)
    }) 

    useEffect(() => {
        setEditExpense({
        name: expense.name,
        category: expense.category,
        amount: expense.amount,
        date: expense.date.slice(0, 10)
        })
    }, [expense])

    function handleChange(event) {
        setEditExpense({
            ...editExpense,
            [event.target.name]: event.target.value
        })
    }

    async function handleDelete(event) {
        event.preventDefault()

        setVisible(false)

        //Remove from DB
        const expenses = await expenseAPI.remove(expense._id)
        setExpenses(expenses)
    }

    async function handleUpdate(event) {
        event.preventDefault()
        const date = new Date(editExpense.date)
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset())

        setVisible(false)

        //Add to the DB
        const editedExpense = {
            name: editExpense.name,
            category: editExpense.category,
            amount: editExpense.amount,
            date: date
        }
        try {
            const expenses = await expenseAPI.update(expense._id,editedExpense)
            setExpenses(expenses)
        } catch(e) {
            console.error(e)
        }
    }
    return(
        <form className={visible ? 'Form edit-form-visible' : 'Form'}>
            <span className="close" onClick={() => setVisible(false)}>x</span>
            <input 
                className="edit-date"
                onChange={handleChange}
                type='date'
                name='date'
                placeholder='date'
                value={editExpense.date}
            />
            <div className="edit-form-description">
            <input 
                onChange={handleChange}
                type='text'
                name='name'
                placeholder='name'
                value={editExpense.name}    
            />
            <select selected={editExpense.category} onChange={handleChange} value={editExpense.category} name='category'>
            <option value='food'>Food</option>
                <option value='gas'>Gas</option>
                <option value='bills'>Bills</option>
                <option value='vehicle'>Vehicle</option>
                <option value='entertainment'>Entertainment</option>
                <option value='travel'>Travel</option>
            </select>
            <input 
                onChange={handleChange}
                type='number'
                name='amount'
                placeholder='amount'
                value={editExpense.amount}    
            />
            </div>
            <div className="edit-buttons">
            <button 
            onClick={handleUpdate}>
                Update Expense
                </button>
            <button 
            onClick={handleDelete}>
                Delete Expense
                </button>
            </div>
        </form>
    )
}