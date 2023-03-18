import { useState } from "react"
import * as incomeAPI from '../../utilities/income-api'
import './AddIncome.css'

export default function AddIncome({setIncome}) {

    const [newIncome, setNewIncome]= useState({
        category: 'job',
        amount: '',
        date: ''
    })

    function handleChange(event) {
        setNewIncome({
            ...newIncome,
            [event.target.name]: event.target.value
        })
    }

    async function handleCreateIncome(event) {
        const date = new Date(newIncome.date)
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
        event.preventDefault()
        //Add to the DB
        const income = {
            category: newIncome.category,
            amount: newIncome.amount,
            date: date
        }
        const incomes = await incomeAPI.create(income)
    

        // //reset form data
        setNewIncome(
            {
                category: 'job',
                amount: '',
                date: ''
            }
        )
        setIncome(incomes)
    }

    return(
        <form className="add-income-form">
            <label>Date</label>
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
            <label>Amount</label>
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
                </button></div>
        </form>
    )
}