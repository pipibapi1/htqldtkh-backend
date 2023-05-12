import { ObjectId } from "mongodb";
import { TopicStatusEnum } from "../../src/enums/topicStatus.enum";

const mongoose = require('mongoose');
const initTopic = [{
	"_id": new ObjectId("64493abceeb51a44b8a2bff6"),
	"name": "Hệ thống chuyển văn bản thành hình ảnh",
	"type": "Kĩ sư tài năng",
	"startTime": "",
	"endTime": "",
	"isExtended": false,
	"extensionTime": 0,
	"expense": 0,
	"status": TopicStatusEnum.NEW,
	"period": "63efa36a1c711759b6a7e463",
	"productId": "",
	"studentId": "6427d7ebbe785ed24c364ea7",
	"acceptanceCouncilId": "",
	"reviewCouncilId": "",
	"creationDate": new Date("2023-04-26T14:52:44.000Z"
	),
	"acceptanceResult": "Đang chờ",
	"reviewResult": "Đang chờ",
	"instructorsId": [
	  "FAKESTAFFID001"
	],
	"instructors": [
	  {
		"staffId": "FAKESTAFFID001",
		"name": "Bùi Hoài Thắng",
		"gender": "Nam",
		"email": "bhthang@hcmut.edu.vn",
		"phoneNumber": "38658689",
		"academyRank": "Phó giáo sư",
		"degree": "Tiến sỹ"
	  }
	],
	"otherMembers": [
	  {
		"studentId": "1912916",
		"name": "Phạm Minh Duy",
		"gender": "Nam",
		"email": "duy.pham1711a@hcmut.edu.vn",
		"phoneNumber": "",
		"educationType": "Chính quy",
		"birthDate": "2001-11-17"
	  }
	],
	"topicGivenId": "",
	"__v": 0
},{
	"_id": new ObjectId("64493abceeb51a44b8a2bff8"),
	"name": "Hệ thống chuyển văn bản thành hình ảnh",
	"type": "Kĩ sư tài năng",
	"startTime": "",
	"endTime": "",
	"isExtended": false,
	"extensionTime": 0,
	"expense": 0,
	"status": TopicStatusEnum.READY,
	"period": "63efa36a1c711759b6a7e463",
	"productId": "",
	"studentId": "6427d7ebbe785ed24c364ea7",
	"acceptanceCouncilId": "",
	"reviewCouncilId": "64562df79ed8dbcbf591ad64",
	"creationDate": new Date("2023-04-26T14:52:44.000Z"),
	"acceptanceResult": "Đang chờ",
	"reviewResult": "Đang chờ",
	"instructorsId": [
	  "FAKESTAFFID001"
	],
	"instructors": [
	  {
		"staffId": "FAKESTAFFID001",
		"name": "Bùi Hoài Thắng",
		"gender": "Nam",
		"email": "bhthang@hcmut.edu.vn",
		"phoneNumber": "38658689",
		"academyRank": "Phó giáo sư",
		"degree": "Tiến sỹ"
	  }
	],
	"otherMembers": [
	  {
		"studentId": "1912916",
		"name": "Phạm Minh Duy",
		"gender": "Nam",
		"email": "duy.pham1711a@hcmut.edu.vn",
		"phoneNumber": "",
		"educationType": "Chính quy",
		"birthDate": "2001-11-17"
	  }
	],
	"topicGivenId": "",
	"__v": 0
},{
	"_id": new ObjectId("64493abceeb51a44b8a2c004"),
	"name": "Hệ thống quản lý đề tài nghiên cứu khoa học",
	"type": "Chính quy",
	"startTime": "",
	"endTime": "",
	"isExtended": false,
	"extensionTime": 0,
	"expense": 0,
	"status": TopicStatusEnum.NEW,
	"period": "63efa36a1c711759b6a7e463",
	"productId": "",
	"studentId": "641b292640220cc79148bd8c",
	"acceptanceCouncilId": "",
	"reviewCouncilId": "",
	"creationDate": new Date("2023-04-26T14:52:44.000Z"),
	"acceptanceResult": "Đang chờ",
	"reviewResult": "Đang chờ",
	"instructorsId": [
	  "FAKESTAFFID002"
	],
	"instructors": [
	  {
		"staffId": "FAKESTAFFID002",
		"name": "Quản Thành Thơ",
		"gender": "Nam",
		"email": "qttho@hcmut.edu.vn",
		"phoneNumber": "38658689",
		"academyRank": "Phó giáo sư",
		"degree": "Tiến sỹ"
	  }
	],
	"otherMembers": [
	  {
		"studentId": "1912916",
		"name": "Phạm Minh Duy",
		"gender": "Nam",
		"email": "duy.pham1711a@hcmut.edu.vn",
		"phoneNumber": "",
		"educationType": "Chính quy",
		"birthDate": "2001-11-17"
	  }
	],
	"topicGivenId": "",
	"__v": 0
},{
	"_id": new ObjectId("64493abceeb51a44b8a2c006"),
	"name": "Hệ thống quản lý đề tài nghiên cứu khoa học",
	"type": "Chính quy",
	"startTime": "",
	"endTime": "",
	"isExtended": false,
	"extensionTime": 0,
	"expense": 0,
	"status": TopicStatusEnum.READY,
	"period": "63efa36a1c711759b6a7e463",
	"productId": "",
	"studentId": "641b292640220cc79148bd8c",
	"acceptanceCouncilId": "",
	"reviewCouncilId": "",
	"creationDate": new Date("2023-04-26T14:52:44.000Z"),
	"acceptanceResult": "Đang chờ",
	"reviewResult": "Đang chờ",
	"instructorsId": [
	  "FAKESTAFFID002"
	],
	"instructors": [
	  {
		"staffId": "FAKESTAFFID002",
		"name": "Quản Thành Thơ",
		"gender": "Nam",
		"email": "qttho@hcmut.edu.vn",
		"phoneNumber": "38658689",
		"academyRank": "Phó giáo sư",
		"degree": "Tiến sỹ"
	  }
	],
	"otherMembers": [
	  {
		"studentId": "1912916",
		"name": "Phạm Minh Duy",
		"gender": "Nam",
		"email": "duy.pham1711a@hcmut.edu.vn",
		"phoneNumber": "",
		"educationType": "Chính quy",
		"birthDate": "2001-11-17"
	  }
	],
	"topicGivenId": "",
	"__v": 0
}]

export const initTopicCollection = async () => {
	try {
		const connection = mongoose.connection;
		const topicCollection = connection.collection('topic');
		await topicCollection.drop();
		await topicCollection.insertMany(initTopic);
	} catch (error) {
		console.log("Init topic fail");
	}
}