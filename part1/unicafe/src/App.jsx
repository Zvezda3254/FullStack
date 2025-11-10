import { useState } from 'react'

const History = (props) => {
  if (props.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <Statistics good={props.good} bad={props.bad} neutral={props.neutral} total={props.total} average={props.average} positive={props.positive}/>
    )
}

const StatisticLine  =({text,value})=> <tr><td>{text}</td><td>{value}</td></tr>
const Statistics = (props) => {
  return(
    <table>
    <tbody>
    <StatisticLine text="good" value ={props.good}/>
    <StatisticLine text="neutral" value ={props.neutral}/>
    <StatisticLine text="bad" value ={props.bad}/>
    <StatisticLine text="total" value ={props.total}/>
    <StatisticLine text="average" value ={props.average}/>
    <StatisticLine text="positive" value ={props.positive +"%"}/>
    </tbody>
    </table>
    )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average,setAverage]=useState(0)
  const [positive,setPositive]=useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    const updatedTotal=updatedGood + neutral+bad
    setTotal(updatedTotal) 
    setAverage((updatedGood*1+neutral*0+bad*-1)/updatedTotal)
    setPositive((updatedGood/updatedTotal)*100)
  }

  const handleNeutralClick = () => {
    
    const updatedNeutral= neutral + 1
    setNeutral(updatedNeutral)
    const updatedTotal=updatedNeutral + good+bad
    setTotal(updatedTotal) 
    setAverage((updatedNeutral*0+good*1+ bad*-1)/updatedTotal)
    setPositive((good/updatedTotal)*100)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    const updatedTotal= updatedBad + good+bad
    setTotal(updatedTotal) 
    setAverage((updatedBad*-1+good*1+neutral*0)/updatedTotal)
    setPositive((good/updatedTotal)*100)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      
      <h1>statistics</h1>
      <History good={good} bad={bad} neutral={neutral} total={total} average={average} positive={positive}/>
    </div>
  )
}

export default App

