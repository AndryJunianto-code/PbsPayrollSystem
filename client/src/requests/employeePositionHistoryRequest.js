import axios from 'axios';

export const createEmployeePositionHistory = async(obj) => {
    const {employeeId,positionId} = obj
    const {data} = await axios.post('/employeePositionHistory', {
        employeeId,positionId
    })
    return data;
}

export const createBulkEmployeePositionHistory = async(obj) => {
    const {data} = await axios.post('/employeePositionHistory/bulk', obj)
    return data;
}

