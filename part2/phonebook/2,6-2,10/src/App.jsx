import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const[newNumber,setNewNumber]=useState('')
  const [filter, setFilter] = useState('')


  const addName =(event)=>{
    event.preventDefault()
    const nameObject={
      name:newName,
      number:newNumber
    }
    
  const nameExists=persons.some(person=>person.name===newName)
    if (nameExists){
      alert(`${newName} is already added to the phonebook`);
    } else {
          setPersons(persons.concat(nameObject))
          setNewName('')
          setNewNumber('')
      }
    }
  const handleNewName =(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

    const handleNewNumber =(event)=>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  )


  return  (
    <div>
      <h2>Phonebook</h2>

      <div>
        <Filter filter={filter} handleFilter={handleFilter}/>
      </div>

      <h2>add a new </h2>
      <PersonForm
      addName={addName}
      newName={newName}
      handleNewName={handleNewName}
      newNumber={newNumber}
      handleNewNumber={handleNewNumber}
      />
      
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App