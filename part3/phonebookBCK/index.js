require('dotenv').config({ path: 'algo.env' })
const express=require('express')
const Person = require('./models/person')
const app=express()
const morgan=require('morgan')

const requestTime = function(req, res, next){
  const timestamp = Date.now()
  let time = new Date(timestamp)
  req.requestTime = time.toUTCString()
  next()
}
const errorHandler = (error, req, res, next) => {
  if(error.name === 'CastError'){
    return res.status(400).send({ error:'malformatted id' })
  }
  else if(error.name === 'ValidationError'){
    return res.status(400).json({ error: error.message })
  }
  next(error)
}
morgan.token('contenido',function getContent(req){
  return JSON.stringify(req.body)
})

app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :contenido'))
app.use(express.json())
app.use(requestTime)

app.get('/api/info',(req,res) => {
  Person.find({ }).then(result => {
    res.send(`<p> Phonebook has info for ${result.length} people</p><p>${req.requestTime}<p/>`)
  })
})

app.post('/api/addPerson', (req, res, next) => {
  const person = req.body
  if('name' in person && 'number' in person){
    const newPerson = new Person({
      name: person.name,
      number: person.number
    })
    newPerson.save()
      .then(savedPerson => res.json(savedPerson))
      .catch(error => next(error))
  }
  else{
    res.status(400).json({ error: 'content missing' })
  }
})

app.put('/api/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number }
  Person.findByIdAndUpdate(req.params.id, person, { returnDocument: 'after', runValidators: true })
    .then(updatedContact => {
      res.json(updatedContact)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(result => res.json(result))
})

app.get('/api/persons/:id', (req,res,next) => {
  Person.findById(req.params.id)
    .then(result => {
      if(result){
        res.json(result)
      }
      else{
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/delete/:id', (req, res, next) => {
  console.log('commit de pruba');
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})