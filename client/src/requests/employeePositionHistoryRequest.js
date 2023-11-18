import axios from 'axios';

export const createEmployeePositionHistory = async(obj) => {
    const {employeeId,positionId} = obj
    const {data} = await axios.post('/employeePositionHistory', {
        employeeId,positionId
    })
    return data;
}
