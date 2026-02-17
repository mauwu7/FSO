require('dotenv').config({path: 'algo.env'});
const express=require('express');
const Person = require('./models/person');
const app=express();
const morgan=require('morgan');
const cors=require('cors');


morgan.token('contenido',function getContent(req){
    return JSON.stringify(req.body)
})

let contacts = [
    {
        id:"1",
        name: "Arto Hellas",
        number: "040-1231-213"
    },
    {
        id:"2",
        name: "Ada Lovelace",
        number: "12412-214-412"
    },
    {
        id:"3",
        name: "Dan Abramov",
        number: "2199-1992-923"
    },
    {
        id:"4",
        name: "Mary Poppendieck",
        number: "932-193-1232"
    }

];

function getRandomInt(max){
    return Math.floor(Math.random() * max);
}

app.use(express.static('dist'));
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :contenido'));
app.use(express.json());

const requestTime = function(req, res, next){
    const timestamp = Date.now();
    let time = new Date(timestamp);
    req.requestTime = time.toUTCString();
    next();
}
app.use(requestTime);

app.get('/api/info',(req,res) =>{
    let responseText = 
    `<p> Phonebook has info for ${contacts.length} people</p>
     <p>${req.requestTime}<p/>`;
    res.send(responseText);
});

app.post('/api/addPerson', (req, res)=>{
    const person = req.body;
    if('name' in person && 'number' in person){
        if(contacts.find(contact => contact.name === person.name) === undefined){
            person.id = String(getRandomInt(10000));
            contacts.push(person);
            res.json(req.body);
        }
        else{
            res.status(409).json({error: 'name must be unique'});
        }
    }
    else{
        res.status(400).json({error: 'content missing'});
    }
    
});

app.get('/api/persons', (req, res) =>{
    let persons = [];
    Person.find({}).then(result=>result.forEach(person => persons.push(person)));
    console.log(persons);
});

app.get('/api/persons/:id', (req,res)=>{
    const person = contacts.find((cont) => req.params.id === cont.id);
    if(person){
        res.json(person);
    }
    else{
        res.status(404).end();
    }
});

app.delete('/api/delete/:id', (req,res) => {
    contacts = contacts.filter(person => person.id !== req.params.id);
    res.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});