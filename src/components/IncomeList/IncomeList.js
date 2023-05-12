import IncomeItem from '../IncomeItem/IncomeItem'
import './IncomeList.css'
import { useState, useEffect } from 'react'
import Paginate from '../Paginate/Paginate'

export default function IncomeList({incomeArray, setIncome}) {
    const [displayed, setDisplayed] = useState(incomeArray.slice(0,5))

    useEffect(() => {
        setDisplayed(incomeArray.slice(0,5))
    }, [incomeArray])


    return(
        <div className='income-list'>
            <h2 className="title">Income</h2>
            <div className="expense-item-description category-title">
            <p className="flex-item">Category</p>
            <p className="flex-item">Amount</p>
            </div>
            {displayed && displayed.map((income, index) => (
                <IncomeItem setIncome={setIncome} income={income} key={index}/>
            ))}

            <Paginate 
                setDisplayed={setDisplayed}
                numPerPage={5}
                pagenatedItems={incomeArray}
            />
        </div>
    )
}