import { useState } from "react"
import PieChart from "../../components/PieChart/PieChart"
import LineGraph from "../../components/LineGraph/LineGraph"
import '../../components/ExpenseItem/ExpenseItem.css'
import './HomePage.css'

function HomePage({userExpenses, setExpenses, income}) {

  const sumVar = userExpenses.slice(0,5)

  return (
    
    <div className="home-page">
      <div className="graph-container">
        <div className="chia">
          <PieChart expenses={userExpenses} className={'pie'}/>
        </div>
        <div className="line-graph">
          <LineGraph income={income} expenses={userExpenses}/>
        </div>
      </div>
      <div className="recent-expenses-container">
        <h3>Recent Transactions</h3>
      {sumVar && sumVar.map((expense, index) => (
        <div className="expense-item" key={index}>
            <div className="date-and-button">
              <p>{new Date(expense.date).toLocaleDateString()}</p>
            </div>
            <div className="expense-item-description">
              <p className="flex-item">{expense.name}</p>
              <p className="flex-item">{expense.category}</p>
              <p className="flex-item">${expense.amount}</p>
            </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default HomePage