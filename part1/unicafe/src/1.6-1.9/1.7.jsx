//Expand your application so that it shows more statistics about the gathered feedback: 
// the total number of collected feedback, the average score 
// (the feedback values are: good 1, neutral 0, bad -1) and the percentage of positive feedback.



import { useState } from 'react'

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
      <p>good  {good}</p>
      <p>neutral  {neutral}</p>
      <p>bad  {bad}</p>
      <p>total {total}</p>
      <p>average  {average}</p>
      <p>positive  {positive}%</p>

    </div>
  )
}

export default App

