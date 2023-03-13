import './LineGraph.css'
import {
    Chart as ChartJS,
    LineElement,
    Tooltip,
    Legend
} from 'chart.js/auto'

import { Line } from 'react-chartjs-2'
import { useState, useEffect } from 'react'

ChartJS.register(
    LineElement,
    Tooltip,
    Legend
)


export default function LineGraph({ expenses, income }) {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const [key, setKey] = useState(1000)
    const [data, setData] = useState({
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ],
        datasets: [
        {
          label: 'Income',
          data: [0,0,0,0,0,0,0,0,0,0,0,0],
          borderColor: 'rgba(255, 99, 132, 0.8)',
          backgroundColor: 'rgba(255,0,0,.6)',
          yAxisID: 'y',
        },
        {
          label: 'Expenses',
          data: [0,0,0,0,0,0,0,0,0,0,0,0],
          borderColor: 'rgba(54, 162, 235, 0.8)',
          backgroundColor: 'rgba(0,0,255,.6)',
        }
      ]
    })

    useEffect(() => {
      const dataCopy = JSON.parse(JSON.stringify(data))
      dataCopy.datasets[0].data =  [0,0,0,0,0,0,0,0,0,0,0,0]
      for(let inc of income){
        const date = new Date(inc.date)
        if(date.getFullYear() == selectedYear) {
          dataCopy.datasets[0].data[date.getMonth()] += inc.amount
        }
      }
      dataCopy.datasets[1].data = [0,0,0,0,0,0,0,0,0,0,0,0]
      for(let expense of expenses){
        const date = new Date(expense.date)
        if(date.getFullYear() == selectedYear) {
          dataCopy.datasets[1].data[date.getMonth()] += expense.amount
        }
      }
      setData(dataCopy)
      setKey(prev => prev + 1)
    }, [selectedYear, expenses, income])
    
    function handleYearChange(e) {
        setSelectedYear(e.target.value)
      }

    return (
        <div className='line'>
            <h1>Expenses vs Income</h1>
            <label>Year</label>
            <select onChange={handleYearChange} value={selectedYear}>
                <option value='2020'>2020</option>
                <option value='2021'>2021</option>
                <option value='2022'>2022</option>
                <option value='2023'>2023</option>
            </select>

            <Line key={key} data={data} />
        </div>
    )

}