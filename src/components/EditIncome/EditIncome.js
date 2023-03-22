import { useState } from "react";
import * as incomeAPI from '../../utilities/income-api'
import './EditIncome.css'

export default function EditIncome({income, setIncome, setVisible, visible}) {
    const [editIncome, setEditIncome]= useState({
        category: income.category,
        amount: income.amount,
        date: income.date
    }) 

    function handleChange(event) {
        setEditIncome({
            ...editIncome,
            [event.target.name]: event.target.value
        })
    }

    async function handleDelete(event) {
        event.preventDefault()

        setVisible(false)
        //Remove from DB
        const incomes = await incomeAPI.remove(income._id)
        setIncome(incomes)
    }

    async function handleUpdate(event) {
        event.preventDefault()
        //Add to the DB

        setVisible(false)

        const editedIncome = {
            category: editIncome.category,
            amount: editIncome.amount,
            date: editIncome.date
        }
        const incomes = await incomeAPI.update(income._id,editedIncome)
    

        // //reset form data
        setEditIncome(
            {
            category: income.category,
            amount: income.amount,
            date: income.date
            }
        )
        
        setIncome(incomes)
    }
    return(
        <form className={visible ? 'income-Form income-Form-visible' : 'income-Form'}>
            <span className="close" onClick={() => setVisible(false)}>x</span>
            <input 
                className="edit-date"
                onChange={handleChange}
                type='date'
                name='date'
                placeholder={editIncome.date}
                value={editIncome.date}
            />
            <div className="edit-income-form-description">
            <select selected={editIncome.category} onChange={handleChange} value={editIncome.category} name='category'>
                <option value='job'>Job</option>
                <option value='investments'>Investments</option>
                <option value='misc'>Misc</option>
            </select>
            <input 
                onChange={handleChange}
                type='number'
                name='amount'
                placeholder='amount'
                value={editIncome.amount}    
            />
            </div>
            <div className="edit-buttons">
            <button 
            onClick={handleUpdate}>
                Update Income
                </button>
            <button 
            onClick={handleDelete}>
                Delete Income
                </button>
                </div>
        </form>
    )
}