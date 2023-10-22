import axios from 'axios';


export const createImmunityLog = async(obj) => {
    const {data} = await axios.post('/immunityLog' , obj);
    return data;
}

export const getImmunityLogOnDate = async(obj) => {
    const {data} = await axios.get(`/immunityLog/onDate/${obj.queryKey[1]}`);
    return data;
}

