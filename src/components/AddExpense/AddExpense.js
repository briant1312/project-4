import { useState } from "react"
import * as expenseAPI from '../../utilities/expenses-api'
import './AddExpense.css'

export default function AddExpense({setExpenses}) {

    const [newExpense, setNewExpense]= useState({
        name: '',
        category:'food',
        amount: '',
        date: ''
    })

    function handleChange(event) {
        setNewExpense({
            ...newExpense,
            [event.target.name]: event.target.value
        })
    }

    async function handleCreateExpense(event) {
        const date = new Date(newExpense.date)
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset())

        event.preventDefault()
        //Add to the DB
        const expense = {
            name: newExpense.name,
            category: newExpense.category,
            amount: newExpense.amount,
            date: date,
        }
        const expenses = await expenseAPI.create(expense)
    

        // //reset form data
        setNewExpense(
            {
                name:'',
                category: 'food',
                amount: '',
                date: '',
            }
        )
        setExpenses(expenses)
    }

    return(
        <form className="add-expense-form">
            <label>Date</label>
            <input 
                className="add-date"
                onChange={handleChange}
                type='date'
                name='date'
                placeholder='date'
                value={newExpense.date}
            />
            <div className="add-expense-form-desc">
            <label>Name</label>
            <input 
                onChange={handleChange} 
                type='text'
                name='name'
                placeholder="name"
                value={newExpense.name} 
             />
            <label>Category</label>
            <select onChange={handleChange} value={newExpense.category} name='category'>
                <option value='food'>Food</option>
                <option value='gas'>Gas</option>
                <option value='bills'>Bills</option>
                <option value='vehicle'>Vehicle</option>
                <option value='entertainment'>Entertainment</option>
                <option value='travel'>Travel</option>
            </select>
            <label>Amount</label>
            <input 
                onChange={handleChange}
                type='number'
                name='amount'
                placeholder='amount'
                value={newExpense.amount}    
            />
            <button 
            onClick={handleCreateExpense}>
                Add Expense
                </button>
                </div>
        </form>
    )
}