import React from 'react';

const PayslipPdf = ({ payslipData }) => {
    const payslipStyles = {
        payslip: {
          margin: '20px',
          border: '1px solid #000',
          padding: '10px',
        },
        table: {
          width: '100%',
          borderCollapse: 'collapse',
        },
        td: {
          border: '1px solid #000',
          padding: '8px',
        },
      };
  return (
    <div style={payslipStyles.payslip}>
      <h2>Pay Slip</h2>
      <table style={payslipStyles.table}>
        <tbody>
          <tr>
            <td>Employee Name:</td>
            <td>{payslipData.employeeName}</td>
          </tr>
          <tr>
            <td>Employee ID:</td>
            <td>{payslipData.employeeID}</td>
          </tr>
          <tr>
            <td>Salary:</td>
            <td>{payslipData.salary}</td>
          </tr>
          {/* Add more rows for other pay details */}
        </tbody>
      </table>
    </div>
  );
};

export default PayslipPdf;
