import axios from "axios";

export const getAllEmployee = async (obj) => {
  const { data } = await axios.get("/employee/getAllEmployee");
  return data;
};

export const getAllEmployeeId = async (obj) => {
  const { data } = await axios.get("/employee/getAllEmployeeId");
  return data;
};

export const getAllEmployeeTrackRecords = async (obj) => {
  const { data } = await axios.get(
    `/employee/getAllEmployeeTrackRecords/${obj.queryKey[1]}`
  );
  return data;
};

export const getSingleEmployeeTrackRecordsOnMonth = async (obj) => {
  const employeeId = obj.queryKey[1];
  const year = obj.queryKey[2];
  const month = obj.queryKey[3];
  const { data } = await axios.get(
    `/employee/getSingleEmployeeTrackRecordsOnMonth/${employeeId}/${year}/${month}`
  );
  return data;
};

export const getSingleEmployeeDashboard = async (obj) => {
  const employeeId = obj.queryKey[1];
  const year = obj.queryKey[2];
  const month = obj.queryKey[3];
  const { data } = await axios.get(
    `/employee/getSingleEmployeeDashboard/${employeeId}/${year}/${month}`
  );
  return data;
};

export const createEmployee = async (obj) => {
  const { name, gender, nik, dob, phoneNumber, joinedDate, positionId } = obj;
  const { data } = await axios.post("/employee", {
    name,
    gender,
    nik,
    dob,
    phoneNumber,
    joinedDate,
    positionId,
  });
  return data;
};

export const generateEmployeePdf = async (obj) => {
  const { data } = await axios.post(
    "/employee/generatePdf",
    { html: obj.html },
    { responseType: "blob" }
  );
  return data;
};

export const updateEmployee = async (obj) => {
  const { name, gender, nik, dob, phoneNumber, joinedDate, positionId ,status} = obj;
  const { data } = await axios.put(`/employee/${obj.id}`, {
    name,
    gender,
    nik,
    dob,
    phoneNumber,
    joinedDate,
    status
  });
  return data;
};

export const getAllJournal = async (obj) => {
  let data;
  if(Array.isArray(obj.queryKey[1]) && obj.queryKey[1].includes(null)) {
    const { data: tempData } = await axios.get(`/employee/getAllJournal`);
    data = tempData;
  } else if (obj.queryKey[1] !== null) {    
    const { data: tempData } = await axios.get(
      `/employee/getAllJournalFilter/${obj.queryKey[1][0]}/${obj.queryKey[1][1]}`
    );
    data = tempData;
  } 
  else {
    
    const { data: tempData } = await axios.get(`/employee/getAllJournal`);
    data = tempData;
  }
  return data;
};
