import { useState } from "react"
import * as incomeAPI from '../../utilities/income-api'

export default function AddIncome() {

    const [newIncome, setNewIncome]= useState({
        category: '',
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
        event.preventDefault()
        //Add to the DB
        const income = {
            category: newIncome.category,
            amount: newIncome.amount,
            date: newIncome.date
        }
        const incomes = await incomeAPI.create(income)
    

        // //reset form data
        setNewIncome(
            {
                category: '',
                amount: '',
                date: ''
            }
        )
    }

    return(
        <form >
            <label>Category</label>
            <select onChange={handleChange} value={newIncome.category} name='category'>
                <option value='food'>food</option>
                <option value='gas'>gas</option>
                <option value='bills'>bills</option>
            </select>
            <label>Amount</label>
            <input 
                onChange={handleChange}
                type='number'
                name='amount'
                placeholder='amount'
                value={newIncome.amount}    
            />
            <label>Date</label>
            <input 
                onChange={handleChange}
                type='date'
                name='date'
                placeholder='date'
                value={newIncome.date}
            />
            <button 
            onClick={handleCreateIncome}>
                Add Income
                </button>
        </form>
    )
}