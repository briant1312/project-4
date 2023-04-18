import './PieChart.css'
import{
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js/auto'

import{ Pie } from 'react-chartjs-2'
import { useState, useEffect } from 'react'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)



export default function PieChart({expenses}) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [data, setData] = useState({
    labels: ['Gas', 'Bills', 'Food', 'Vehicle', 'Entertainment', 'Travel'],
    datasets: [
      {
        label: '',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          'rgba(214,0,255, 0.6)',
          'rgba(0,30,255, 0.6)',
          'rgba(0,184,255, 0.6)',
          'rgba(45, 0, 247, 0.6)',
          'rgba(0,255,159, 0.6)',
          'rgba(252, 47, 0, 0.6)',
        ],
        borderColor: [
          'rgba(214,0,255, 1)',
          'rgba(0,30,255, 1)',
          'rgba(0,184,255, 1)',
          'rgba(45, 0, 247, 1)',
          'rgba(0,255,159, 1)',
          'rgba(252, 47, 0, 1)',
        ],
        borderWidth: 1,
      },
    ],
  })

  const labelMap = {
      'gas': 0,
      'bills': 1,
      'food': 2,
      'vehicle': 3,
      'entertainment': 4,
      'travel': 5
  }

  useEffect(() => {
    const dataCopy = JSON.parse(JSON.stringify(data))
    dataCopy.datasets[0].data = [0, 0, 0, 0, 0, 0]
    for(let expense of expenses){
      const date = new Date(expense.date)
      if(date.getFullYear() === parseInt(selectedYear) && date.getMonth() === parseInt(selectedMonth)) {
        dataCopy.datasets[0].data[labelMap[expense.category]] += expense.amount
      }
    }
    setData(dataCopy)
  }, [selectedMonth, selectedYear, expenses])

  function handleYearChange(e) {
    setSelectedYear(e.target.value)
  }

  function handleMonthChange(e) {
    setSelectedMonth(e.target.value)
  }

  return (
      <div className='pie'>
          <h1>Expenses by Month</h1>
          <label>Year</label>
          <select onChange={handleYearChange} value={selectedYear}>
              <option value='2020'>2020</option>
              <option value='2021'>2021</option>
              <option value='2022'>2022</option>
              <option value='2023'>2023</option>
          </select>

          <label>Month</label>
          <select onChange={handleMonthChange} value={selectedMonth}>
              <option value='0'>January</option>
              <option value='1'>February</option>
              <option value='2'>March</option>
              <option value='3'>April</option>
              <option value='4'>May</option>
              <option value='5'>June</option>
              <option value='6'>July</option>
              <option value='7'>August</option>
              <option value='8'>September</option>
              <option value='9'>October</option>
              <option value='10'>November</option>
              <option value='11'>December</option>
          </select>

          <Pie data={data}/>
      </div>
  )
    
}