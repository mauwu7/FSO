import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';
const getContacts = () => axios.get(baseUrl).then(response=>response.data);

const create = (newContact) => axios.post(baseUrl, newContact).then(response=>response.data);

const eliminarContacto = (id) => axios.delete(`${baseUrl}/${id}`);

const act = (id, updated) => axios.put(`${baseUrl}/${id}`,updated).then(response=>response.data);

export default {
    getContacts,
    create,
    eliminarContacto,
    act
};