import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([ 
  ]) 

  const [newName, setNewName] = useState('')
  const[newNumber,setNewNumber]=useState('')
  const [filter, setFilter] = useState('')
  const [addedMessage, setAddedMessage] = useState(``)


    useEffect(() => {
    console.log('effect')
    personsService
    .getAll()
    .then(initialPersons=>{
    setPersons(initialPersons)
    })
  }, [])

  console.log('render', persons.length, 'persons')

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

    personsService
    .create(nameObject) 
    .then(returnedPersons => {
      setPersons(persons.concat(returnedPersons))
      setNewName('')
      setNewNumber('')
      
    
         setAddedMessage(
        `Added ${newName} `
      )
      setTimeout(() => {
          setAddedMessage(null)
        }, 5000)
    })
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
    (person.name ?? '').toLowerCase().includes(filter.toLowerCase())
  )
  const handleDelete=(id,name)=>{
    if (window.confirm(`Delete ${name}?`)){
      personsService
      .remove(id)
      .then(()=>{
        setPersons(persons.filter(person => person.id !== id))
      }

      )
    }
  }

  return  (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedMessage} />
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
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App