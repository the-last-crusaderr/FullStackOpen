const express = require('express')

const app = express()

app.use(express.json())                   //It is used to parse the json post request to object

app.use(express.static('build'))

const cors = require('cors')
app.use(cors())




let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons',(request,response) => {
	response.json(persons)
} )



app.get('/api/persons/:id', (request,response) => {
	const id = Number(request.params.id)
	const person = persons.find( person => person.id === id )
	if(person)
		response.send(person)
	else
		response.status(404).end()
} )

app.get('/info',(request,response)=> {
	const date = Date()
	response.send(`<p>Phonebook has info for ${persons.length} people</p>
		<p>${date} </p>`
	)

})


app.delete('/api/persons/:id' ,(request,response) => {
	const id = Number(request.params.id)
	persons = persons.filter( person => person.id !== id )
	response.status(204).end()
}  )


app.post('/api/persons',(request,response) => {
	const person =request.body

	const preExistence = persons.find( elem => person.name === elem.name)

	if(person.name === undefined || person.number === undefined || preExistence !== undefined ){
		return response.status(400).json(
			{error:'content missing'}
		)		

	}

	const id = Math.floor(Math.random() * 300)
	person.id = id
	persons = persons.concat(person)
	console.log(person)
	response.send('The content added')
})




const PORT = 3001
app.listen( PORT, () => console.log(`Listening to port-${PORT}`) )


