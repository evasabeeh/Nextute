import {
  addEmployee,
  getAllEmployees,
  getEmployeeByCertificateNo,
  getEmployeeById,
} from "../models/employeeModel.js";
import QRCode from "qrcode";
import prisma from "../db/index.js";

// Add Employee
const createEmployee = async (req, res) => {
  let {
    idNo,
    certificateNo,
    fullName,
    email,
    phoneNumber,
    joiningDate,
    designation,
    department,
    image,
  } = req.body;

  const employeeData = {
    idNo,
    certificateNo,
    fullName,
    email,
    phoneNumber,
    joiningDate: new Date(joiningDate),
    designation,
    department,
    image,
  };

  try {
    const newEmployee = await addEmployee(employeeData);
    return res.status(201).json(newEmployee);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get All Employees
const getEmployees = async (req, res) => {
  try {
    const employees = await getAllEmployees();
    return res.json(employees);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get Employee by Certificate ID
const getEmployee = async (req, res) => {
  const { certificateNo } = req.params;

  try {
    const employee = await getEmployeeByCertificateNo(certificateNo);
    if (employee) {
      return res.json(employee);
    } else {
      return res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Generate QR Code for Employee
const generateQRCode = async (req, res) => {
  const { employeeIdNo } = req.params;
  try {
    const member = await getEmployeeById(employeeIdNo);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const url = `http://wwww.nextute.com/team/${member.certificateNo}`;
    const qrCodeUrl = await QRCode.toDataURL(url);
    await prisma.employee.update({
      where: { idNo: employeeIdNo },
      data: { qrCodeUrl },
    });
    return res.json({ qrCodeUrl });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { createEmployee, getEmployees, getEmployee, generateQRCode };
