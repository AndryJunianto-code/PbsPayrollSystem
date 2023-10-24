import axios from 'axios';


export const createPayslip = async(obj) => {
    const {data} = await axios.post('/payslip' , obj);
    return data;
}

export const generatePayslipPdf = async(obj) => {
    const {data} = await axios.post('/payslip/generatePdf' , obj, {responseType:'blob'});
    return data;
}

export const getAllPayslip = async(obj) => {
    const {data} = await axios.get('/payslip/getAllPayslip')
    return data;
}



