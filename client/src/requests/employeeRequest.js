import axios from 'axios';

export const getAllEmployee = async(obj) => {
    const {data} = await axios.get('/employee/getAllEmployee')
    return data;
}

export const getAllEmployeeId = async(obj) => {
    const {data} = await axios.get('/employee/getAllEmployeeId')
    return data;
}

export const getAllEmployeeTrackRecords = async(obj) => {
    const {data} = await axios.get(`/employee/getAllEmployeeTrackRecords/${obj.queryKey[1]}`)
    return data;
}

export const createEmployee = async(obj) => {
    const {name,gender,nik,dob,phoneNumber,joinedDate,positionId} = obj
    const {data} = await axios.post('/employee', {
        name,gender,nik,dob,phoneNumber,joinedDate,positionId
    })
    return data;
}

export const generateEmployeePdf = async(obj) => {
    const {data} = await axios.post('/employee/generatePdf' , {html:obj.html}, {responseType:'blob'});
    return data;
}

export const updateEmployee = async(obj) => {
    const {name,gender,nik,dob,phoneNumber,joinedDate,positionId} = obj
    const {data} = await axios.put(`/employee/${obj.id}`, {
        name,gender,nik,dob,phoneNumber,joinedDate
    })
    return data;
}