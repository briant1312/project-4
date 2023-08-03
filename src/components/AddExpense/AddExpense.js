import { useState } from "react"
import * as expenseAPI from '../../utilities/expenses-api'
import './AddExpense.css'

export default function AddExpense({setExpenses}) {

    const [newExpense, setNewExpense]= useState({
        name: '',
        category:'food',
        amount: '',
        date: '',
        error: ''
    })

    function handleChange(event) {
        setNewExpense({
            ...newExpense,
            [event.target.name]: event.target.value
        })
    }

    async function handleCreateExpense(event) {
        event.preventDefault()
        if(!newExpense.name || !newExpense.amount || !newExpense.date) {
            setNewExpense({
                ...newExpense,
                error: "Please fill out all fields"
            })
        }
        const date = new Date(newExpense.date)
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset())

        const expense = {
            name: newExpense.name,
            category: newExpense.category,
            amount: newExpense.amount,
            date: date,
        }
        try {
            const expenses = await expenseAPI.create(expense)

            setNewExpense(
                {
                    name:'',
                    category: 'food',
                    amount: '',
                    date: '',
                    error: ''
                }
            )
            setExpenses(expenses)
        } catch (err) {
            console.error(err.message)
        }
    }

    return(
        <div className="add-expense-form-container">
            <h2 className="title">Add Expense</h2>
            <form className="add-expense-form">
                <input 
                    className="add-date"
                    onChange={handleChange}
                    type='date'
                    name='date'
                    placeholder='date'
                    value={newExpense.date}
                />
                <div className="add-expense-form-desc">
                    <label>Category</label>
                    <select onChange={handleChange} value={newExpense.category} name='category'>
                        <option value='food'>Food</option>
                        <option value='gas'>Gas</option>
                        <option value='bills'>Bills</option>
                        <option value='vehicle'>Vehicle</option>
                        <option value='entertainment'>Entertainment</option>
                        <option value='travel'>Travel</option>
                    </select>
                    <input 
                        onChange={handleChange} 
                        type='text'
                        name='name'
                        placeholder="name"
                        value={newExpense.name} 
                    />
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
                    <p className="error-message">{newExpense.error}</p>
                </div>
            </form>
        </div>
    )
}
