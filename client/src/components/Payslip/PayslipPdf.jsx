// Payslip.js

import React from 'react';

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
  netSalary: {
    backgroundColor: '#eee',
    fontWeight: 'bold',
    textAlign: 'right',
  },
};
const PayslipPdf = ({payslipData}) => {
  const {
    id,
    date,
    employeeName,
    phoneNumber,
    basicSalary,
    totalCommision,
    totalDeduction,
    netSalary,
  } = payslipData;

  return (
    <div style={styles.payslip}>
      <div style={styles.header}>
        <div style={styles.company}>Cv. Permata Batam Suksesindo</div>
        <div style={styles.payslipId}>Payslip ID: {id}</div>
        <div style={styles.payDate}>Pay Date: {date}</div>
      </div>
      <div style={styles.employeeInfo}>
        <div style={styles.name}>Employee Name: {employeeName}</div>
        <div>Phone Number: {phoneNumber}</div>
      </div>
      <table style={styles.salaryDetails}>
        <tbody>
          <tr>
            <td style={styles.salaryDetail}>Basic Salary:</td>
            <td style={styles.salaryDetail}>{basicSalary}</td>
          </tr>
          <tr>
            <td style={styles.salaryDetail}>Total Commission:</td>
            <td style={styles.salaryDetail}>{totalCommision}</td>
          </tr>
          <tr>
            <td style={styles.salaryDetail}>Total Deduction:</td>
            <td style={styles.salaryDetail}>{totalDeduction}</td>
          </tr>
          <tr>
            <td style={{ ...styles.salaryDetail, ...styles.netSalary }}>Net Salary:</td>
            <td style={{ ...styles.salaryDetail, ...styles.netSalary }}>{netSalary}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PayslipPdf;
