import prisma from "../db/index.js";

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

export { getAllEmployees, getEmployeeByCertificateId, getEmployeeById };
