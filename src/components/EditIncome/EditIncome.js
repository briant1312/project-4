import { useState, useEffect } from "react";
import * as incomeAPI from '../../utilities/income-api'
import './EditIncome.css'

export default function EditIncome({income, setIncome, setVisible, visible}) {
    const [editIncome, setEditIncome]= useState({
        category: income.category,
        amount: income.amount,
        date: income.date.slice(0, 10),
        error: ''
    }) 

    useEffect(() => {
        setEditIncome({
            category: income.category,
            amount: income.amount,
            date: income.date.slice(0, 10),
            error: ''
        })
    }, [income])

    function handleChange(event) {
        setEditIncome({
            ...editIncome,
            [event.target.name]: event.target.value
        })
    }

    async function handleDelete(event) {
        event.preventDefault()
        if(editIncome.error !== "Press delete again to delete entry") {
            setEditIncome({
                ...editIncome,
                error: "Press delete again to delete entry"
            })
            return
        }

        setVisible(false)
        try {
            const incomes = await incomeAPI.remove(income._id)
            setIncome(incomes)
        } catch (err) {
            console.error(err)
        }
    }

    async function handleUpdate(event) {
        event.preventDefault()
        if(!editIncome.amount || !editIncome.date) {
            setEditIncome({
                ...editIncome,
                error: "Please fill out all fields"
            })
            return
        }
        //Add to the DB
        const date = new Date(editIncome.date)
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset())

        setVisible(false)

        const editedIncome = {
            category: editIncome.category,
            amount: editIncome.amount,
            date: date
        }
        try {
            const incomes = await incomeAPI.update(income._id,editedIncome)
            setIncome(incomes)
        } catch(e) {
            console.error(e)
        }
    }

    function closeModal() {
        setVisible(false)
        setEditIncome({
            category: income.category,
            amount: income.amount,
            date: income.date.slice(0, 10),
            error: ''
        })
    }

    return (
        <>
            <div onClick={closeModal} className={visible ? 'edit-background edit-background-visible' : 'edit-background'}></div>
            <form className={visible ? 'income-Form income-Form-visible' : 'income-Form'}>
                <span className="close" onClick={closeModal}>&times;</span>
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
                <p className="error-message">{editIncome.error}</p>
            </form>
        </>
    )
}
