const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const url = process.env.MONGODB_URI;

mongoose.connect(url, {family:4})
.then(result => {
    console.log('Conectado');
})
.catch(error=>{
    console.log('Ha ocurrido un error: ', error.message);
});

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: (exp) => /^(?=.{8,}$)\d{2,3}-\d+$/.test(exp),
            message: props => `FAH`
        },
        required: [true, 'User phone number required']
    }
});
personSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
module.exports = mongoose.model('Person', personSchema);