import axios from 'axios';

export const getAllSales = async(obj) => {
    const {data} = await axios.get('/sales/getAllSales')
    return data;
}

