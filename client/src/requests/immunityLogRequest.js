import axios from 'axios';


export const createImmunityLog = async(obj) => {
    const {data} = await axios.post('/immunityLog' , obj);
    return data;
}

export const bulkCreateImmunityLog = async(obj) => {
    const {data} = await axios.post('/immunityLog/bulk', obj.allEmployeeTrackRecords);
    return data;
}

export const getImmunityLogOnWeek = async(obj) => {
    const {data} = await axios.get(`/immunityLog/onWeek/${obj.queryKey[1]}`);
    return data;
}

export const deleteImmunityLog = async(obj) => {
    const {data} = await axios.delete(`/immunityLog/${obj.id}`);
    return data;
}
