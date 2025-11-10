import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    }


  const handleNeutralClick = () => {
    
    const updatedNeutral= neutral + 1
    setNeutral(updatedNeutral)
    
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    
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
    </div>
  )
}

export default App

