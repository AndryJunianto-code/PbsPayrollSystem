// Payslip.js

import React from 'react';
import dayjs from 'dayjs';
import getCurrency from '../../utils/getCurrency';

const styles = {
  payslip: {
    width: '21cm',
    height: '29.7cm',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #333',
    padding: '20px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  company: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  payslipId: {
    fontSize: '14px',
    marginTop: '8px',
  },
  payDate: {
    fontSize: '14px', 
    marginTop: '8px',
  },
  employeeInfo: {
    marginTop: '20px',
  },
  name: {
    fontSize: '16px',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  salaryDetails: {
    width: '100%',
    marginTop: '20px',
    borderCollapse: 'collapse',
  },
  salaryDetail: {
    padding: '8px',
    border: '1px solid #333',
  },
  amountDetail: {
    padding: '8px',
    border: '1px solid #333',
    textAlign: 'right',
  },
  netSalary: {
    backgroundColor: '#eee',
    fontWeight: 'bold',
  },
};
const PayslipPdf = ({payslipData}) => {
  const {
    id,
    date,
    employeeName,
    phoneNumber,
    basicSalary,
    commision,
    deduction,
    netSalary,
  } = payslipData;

  return (
    <div style={styles.payslip}>
      <div style={styles.header}>
        <div style={styles.company}>Cv. Permata Batam Suksesindo</div>
        <div style={styles.payslipId}>Payslip ID: {id}</div>
        <div style={styles.payDate}>Pay Date: {dayjs(date).format('DD MMM YYYY')}</div>
      </div>
      <div style={styles.employeeInfo}>
        <div style={styles.name}>Employee Name: {employeeName}</div>
        <div>Phone Number: {phoneNumber}</div>
      </div>
      <table style={styles.salaryDetails}>
        <tbody>
          <tr>
            <td style={styles.salaryDetail}>Basic Salary:</td>
            <td style={styles.amountDetail}>Rp{getCurrency(basicSalary)}</td>
          </tr>
          <tr>
            <td style={styles.salaryDetail}>Total Commission:</td>
            <td style={styles.amountDetail}>Rp{getCurrency(commision)}</td>
          </tr>
          <tr>
            <td style={styles.salaryDetail}>Total Deduction:</td>
            <td style={styles.amountDetail}>Rp{getCurrency(deduction)}</td>
          </tr>
          <tr>
            <td style={{ ...styles.salaryDetail, ...styles.netSalary }}>Net Salary:</td>
            <td style={{ ...styles.salaryDetail, ...styles.netSalary, ...styles.amountDetail }}>Rp{getCurrency(netSalary)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PayslipPdf;
