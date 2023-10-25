import React from "react";

const styles = {
  container: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    fontFamily: "Arial, sans-serif"
  },
  header: {
    fontSize: "26px",
    marginBottom: "14px",
    color: "rgb(56, 7, 124)"
  },
  subheader: {
    fontSize: "21px",
    marginBottom: "10px",
    color: "rgb(56, 7, 124)"
  },
  attribute: {
    fontSize: "16px",
    marginBottom: "10px"
  }
};

const EmployeePdf = ({employeeData}) => {
  const {
    id,
    name,
    gender,
    dob,
    nik,
    phoneNumber,
    joinedDate,
    status
  } = employeeData;
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Employee Details</h2>
      <h2 style={styles.subheader}>Personal</h2>
      <div style={styles.attribute}>
        <strong>ID:</strong> {id}
      </div>
      <div style={styles.attribute}>
        <strong>Name:</strong> {name}
      </div>
      <div style={styles.attribute}>
        <strong>Gender:</strong> {gender}
      </div>
      <div style={styles.attribute}>
        <strong>Date of Birth:</strong> {dob}
      </div>
      <div style={styles.attribute}>
        <strong>NIK:</strong> {nik}
      </div>
      <div style={styles.attribute}>
        <strong>Phone Number:</strong> {phoneNumber}
      </div>
     
      
      <h2 style={styles.subheader}>Business</h2>
      <div style={styles.attribute}>
        <strong>Work Phone Number:</strong> 9025 9898
      </div>
      <div style={styles.attribute}>
        <strong>Email:</strong> astc@gmail.com
      </div>
      
      <h2 style={styles.subheader}>Employment</h2>
      <div style={styles.attribute}>
        <strong>Joined Date:</strong> {joinedDate}
      </div>
      <div style={styles.attribute}>
        <strong>Status:</strong> {status}
      </div>
      <div style={styles.attribute}>
        <strong>Position:</strong> Probation
      </div>
      <div style={styles.attribute}>
        <strong>Salary:</strong> Rp.5.000.000
      </div>

      <h2 style={styles.subheader}>Banking</h2>
      <div style={styles.attribute}>
        <strong>Name of bank:</strong> BCA
      </div>
      <div style={styles.attribute}>
        <strong>Account number:</strong> 9282938392
      </div>
    </div>
  );
};

export default EmployeePdf;
