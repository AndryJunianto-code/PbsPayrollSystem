import axios from 'axios';


export const createAttendance = async(obj) => {
    const {data} = await axios.post('/attendance' , obj);
    return data;
}

export const getAttendanceOnDate = async(obj) => {
    const {data} = await axios.get(`/attendance/onDate/${obj.queryKey[1]}`);
    return data;
}

export const getAttendanceOnMonth = async(obj) => {
    const {data} = await axios.get(`/attendance/onMonth/${obj.queryKey[1]}`);
    return data;
}

export const updateAllAttendance = async(obj) => {
    const allAttendance = obj.allAttendance;
    const {data} = await axios.put('/attendance/updateAll', {
        allAttendance
    })
    return data;
}