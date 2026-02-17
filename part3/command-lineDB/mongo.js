const mongoose = require('mongoose');
const password = process.argv[2];

const url =`mongodb+srv://mauricio45nove_db_user:${password}@cluster0.e23ew1b.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false);
mongoose.connect(url, {family: 4});

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});
const Person = mongoose.model('Person', personSchema);

if(process.argv.length > 3){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    });
    person.save().then(()=>{
        console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
        mongoose.connection.close();
    });
}
else{
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person);
        })
        mongoose.connection.close();
    })
}


