import axios from 'axios';

export const getAllPosition = async(obj) => {
    const {data} = await axios.get('/position/getAllPosition')
    return data;
}

export const createPosition = async(obj) => {
    const {data} = await axios.post('/position',obj)
    return data;
}

export const updatePosition = async(obj) => {
    const {data} = await axios.put(`/position/${obj.id}`, obj)
    return data;
}