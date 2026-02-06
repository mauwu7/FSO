import axios from "axios";

const baseUrl = '/api';
const getContacts = () => axios.get(`${baseUrl}/persons`).then(response=>response.data);

const create = (newContact) => axios.post(`${baseUrl}/addPerson`, newContact).then(response=>response.data);

const eliminarContacto = (id) => axios.delete(`${baseUrl}/delete/${id}`);

const act = (id, updated) => axios.put(`${baseUrl}/${id}`,updated).then(response=>response.data);

export default {
    getContacts,
    create,
    eliminarContacto,
    act
};