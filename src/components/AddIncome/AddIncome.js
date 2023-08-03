import { useState } from "react"
import * as incomeAPI from '../../utilities/income-api'
import './AddIncome.css'

export default function AddIncome({setIncome}) {

    const [newIncome, setNewIncome]= useState({
        category: 'job',
        amount: '',
        date: '',
        error: ''
    })

    function handleChange(event) {
        setNewIncome({
            ...newIncome,
            [event.target.name]: event.target.value
        })
    }

    async function handleCreateIncome(event) {
        event.preventDefault()
        if(!newIncome.amount || !newIncome.date) {
            setNewIncome({
                ...newIncome,
                error: "Please fill out all fields"
            })
            return
        }
        const date = new Date(newIncome.date)
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
        const income = {
            category: newIncome.category,
            amount: newIncome.amount,
            date: date
        }
        try {
            const incomes = await incomeAPI.create(income)

            setNewIncome(
                {
                    category: 'job',
                    amount: '',
                    date: '',
                    error: ''
                }
            )
            setIncome(incomes)
        } catch (err) {
            console.error(err)
        }
    
    }

    return(
        <div className="form-container">
            <h2 className="title">Add Income</h2>
            <form className="add-income-form">
                <input 
                    className="add-date"
                    onChange={handleChange}
                    type='date'
                    name='date'
                    placeholder='date'
                    value={newIncome.date}
                />
                <div className="add-income-form-desc">
                    <label>Category</label>
                    <select onChange={handleChange} value={newIncome.category} name='category'>
                        <option value='job'>Job</option>
                        <option value='investments'>Investments</option>
                        <option value='misc'>Misc</option>
                    </select>
                    <input 
                        onChange={handleChange}
                        type='number'
                        name='amount'
                        placeholder='amount'
                        value={newIncome.amount}    
                    />
                    
                    
                    <button 
                        onClick={handleCreateIncome}>
                        Add Income
                    </button>
                    <p className="error-message">{newIncome.error}</p>
                </div>
            </form>
        </div>
    )
}
