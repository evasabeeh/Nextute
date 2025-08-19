import prisma from "../db/index.js";

const addEmployee = async (employeeData) => {
  try {
    const newEmployee = await prisma.employee.create({
      data: {
        idNo: employeeData.idNo,
        certificateNo: employeeData.certificateNo,
        fullName: employeeData.fullName,
        email: employeeData.email,
        phoneNumber: employeeData.phoneNumber,
        joiningDate: employeeData.joiningDate,
        designation: employeeData.designation,
        department: employeeData.department,
        image: employeeData.image,
      },
    });
    return newEmployee;
  } catch (error) {
    throw new Error("Error adding employee");
  }
};

const getAllEmployees = async () => {
  try {
    const employees = await prisma.employee.findMany();
    return employees;
  } catch (error) {
    throw new Error("Error fetching employees");
  }
};

const getEmployeeById = async (employeeId) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: { employeeId },
    });
    return employee;
  } catch (error) {
    throw new Error("Error fetching employee");
  }
};

const getEmployeeByCertificateId = async (certificateId) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: { certificateId },
    });
    return employee;
  } catch (error) {
    throw new Error("Error fetching employee");
  }
};

export { addEmployee, getAllEmployees, getEmployeeByCertificateId, getEmployeeById };
