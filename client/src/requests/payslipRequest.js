import axios from 'axios';


export const createPayslip = async(obj) => {
    const {data} = await axios.post('/payslip' , obj);
    return data;
}

export const generatePayslipPdf = async(obj) => {
    const {data} = await axios.post('/payslip/generatePdf' , {html:obj.html}, {responseType:'blob'});
    return data;
}

export const getAllPayslipByMonth = async(obj) => {
    const {data} = await axios.get(`/payslip/getAllPayslipByMonth/${obj.queryKey[1]}`)
    return data;
}

export const getTotalIncomeByMonth = async(obj) => {
    const {data} = await axios.get(`/payslip/getTotalIncomeByMonth/${obj.queryKey[1]}`)
    return data;
}

export const getTotalPayslipYearly = async(obj) => {
    const {data} = await axios.get(`/payslip/getTotalPayslipYearly/${obj.queryKey[1]}`)
    return data;
}

export const deletePayslip = async(obj) => {
    const {data} = await axios.delete(`/payslip/${obj.id}`);
    return data;
}

export const updatePayslip = async(obj) => {
    const {data} = await axios.put(`/payslip/${obj.id}`, obj);
    return data;
}



