import prisma from "../db/index.js";
import { nanoid } from "nanoid";

const createStudent = async (student) => {
  const student_id = `NXS_${nanoid(6)}`;
  return await prisma.student.create({
    data: {
      student_id,
      name: student.name,
      email: student.email,
      password: student.password,
      gender: student.gender,
      phone_number: student.phoneNumber,
      date_of_birth: student.dateOfBirth,
      code: student.code,
      code_expires_at: student.code_expires_at,
      is_verified: false,
    },
  });
};

const findStudentByEmail = async (email) => {
  return await prisma.student.findUnique({
    where: { email },
  });
};

const findStudentByPhone = async (phone) => {
  return await prisma.student.findFirst({
    where: { phone_number: phone },
  });
};

const verifyStudent = async (email) => {
  return await prisma.student.update({
    where: { email },
    data: { is_verified: true, code: null, code_expires_at: null },
  });
};

const updateStudentResendVerificationCode = async (email, code, expiresAt) => {
  return await prisma.student.update({
    where: { email },
    data: { code, code_expires_at: expiresAt },
  });
};

const findStudentById = async (id) => {
  return await prisma.student.findUnique({
    where: { id },
  });
};

const isStudentIdUnique = async (student_id) => {
  const existingStudent = await findStudentById(student_id);
  return !existingStudent;
};


const getAllStudents = async () => {
  return await prisma.student.findMany();
};

const deleteStudentByEmail = async (email) => {
  return await prisma.student.delete({
    where: { email },
  });
};

// Edit student by id (UUID)
const editStudentById = async (id, updateData) => {
  // Convert date_of_birth to ISO-8601 if present and is a string
  if (updateData.date_of_birth && typeof updateData.date_of_birth === 'string') {
    // If already in ISO format, this will not change it
    updateData.date_of_birth = new Date(updateData.date_of_birth).toISOString();
  }
  return await prisma.student.update({
    where: { id },
    data: updateData,
  });
};

export {
  createStudent,
  findStudentByEmail,
  findStudentByPhone,
  verifyStudent,
  updateStudentResendVerificationCode,
  isStudentIdUnique,
  findStudentById,
  deleteStudentByEmail,
  getAllStudents,
  editStudentById,
};
