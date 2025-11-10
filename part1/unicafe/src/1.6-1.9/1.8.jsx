//Refactor your application so that displaying the statistics is extracted into its own Statistics component



import { useState } from 'react'

const Statistics = (props) => {
  return(
    <div>
    <p>good  {props.good}</p>
    <p>neutral  {props.neutral}</p>
    <p>bad  {props.bad}</p>
    <p>total {props.total}</p>
    <p>average  {props.average}</p>
    <p>positive  {props.positive}%</p>
    </div>
  )
}


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>


const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)//new 
  const [average,setAverage]=useState(0)
  const [positive,setPositive]=useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral+bad) 
    setAverage(updatedGood*1+neutral*0+bad*-1)
    setPositive(updatedGood/(updatedGood+bad+neutral)*100)
  }

  const handleNeutralClick = () => {
    
    const updatedNeutral= neutral + 1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + good+bad) 
    setAverage(updatedNeutral*0+good*1+ bad*-1)
    setPositive(good/(good+bad+updatedNeutral)*100)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(updatedBad + good+bad) 
    setAverage(updatedBad*-1+good*1+neutral*0)
    setPositive(good/(good+updatedBad+neutral)*100)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} total={total} average={average} positive={positive}/>

    </div>
  )
}

export default App

