import { ObjectId } from "mongodb";

const mongoose = require('mongoose');
const initStudent = [{
	_id: new ObjectId("641b292640220cc79148bd8c"),
	lastModifiedAt: new Date("2023-03-22T16:13:26.421Z"),
	name: "Pham Duy",
	gender: "Nam",
	phoneNumber: "0397770433",
	email: "duypm1711ak@gmail.com",
	role: "sinh viên",
	username: "phamduy",
	password: "$2b$10$ViVn1Y0u7Nf9vB2xEK9ztugaWGyfNAYLdjCZUFLdtks1hoV9JDrtS",
	image: "",
	studentId: "1911111",
	educationType: "chính quy",
	accountStatus: "đã duyệt",
	accountCreationDate: new Date("2023-03-22T16:13:26.421Z"),
	birthDate: new Date("2001-03-22T16:12:02.000Z"),
	notifications: [],
	numNotification: 0
	},{
	_id: new ObjectId("6427d7ebbe785ed24c364ea7"),
	lastModifiedAt: new Date("2023-04-01T07:06:18.942Z"),
	name: "Lê Quốc Đại",
	gender: "Nam",
	phoneNumber: "0398820413",
	email: "lequocdai@gmail.com",
	role: "sinh viên",
	username: "lequocdai",
	password: "$2b$10$A8zD3XaQuMQ2VU7v/Urkhu.wtG14m2c0pi0P1X6zMXcifYU1aWgSi",
	image: "",
	studentId: "2110220",
	educationType: "kỹ sư tài năng",
	accountStatus: "đã duyệt",
	accountCreationDate: new Date("2023-04-01T07:06:18.942Z"),
	birthDate: new Date("2003-04-01T07:04:56.000Z"),
	notifications: [],
	numNotification: 0
}]

export const initStudentCollection = async () => {
	try {
		const connection = mongoose.connection;
		const studentCollection = connection.collection('student');
		await studentCollection.drop();
		await studentCollection.insertMany(initStudent);
	} catch (error) {
		console.log("Init student fail");
	}
}