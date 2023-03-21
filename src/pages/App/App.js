import { useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import './App.css';
import AuthPage from "../AuthPage/AuthPage";
import { getUser } from "../../utilities/users-service"
import HomePage from "../HomePage/HomePage";
import IncomePage from "../IncomePage/IncomePage";
import ExpensePage from "../ExpensePage/ExpensePage";

function App() {
  const [user, setUser] = useState(getUser())
  const [expenses, setExpenses] = useState([])
  const [income, setIncome] = useState([])

  useEffect(() => {
    const user = getUser()
    if(user) {
      setExpenses(user.expenses)
      setIncome(user.income)
    } else {
      setExpenses([])
      setIncome([])
    }
  }, [user])


  return (
    <main className="App">
      { user ? (
        <div className="app-page">
          <Routes>
            <Route path="/home" 
                    element={<HomePage 
                    setExpenses={setExpenses} 
                    userExpenses={expenses}
                    income={income}
                    user={user}
                    setUser={setUser}/>} 
            />
            <Route path="/income" 
                  element={<IncomePage 
                  setIncome={setIncome} 
                  userIncome={income}
                  user={user}
                  setUser={setUser}/>} 
            />
            <Route path="/expenses" 
                    element={<ExpensePage 
                    setExpenses={setExpenses} 
                    userExpenses={expenses}
                    user={user}
                    setUser={setUser}/>} 
            />
            <Route path="/*" element={<Navigate to="/home" />} />
          </Routes>
        </div> 
         ):(
        <AuthPage setExpenses={setExpenses} setIncome={setIncome} setUser={setUser}/>
      )} 
    </main>
  );
}

export default App;
