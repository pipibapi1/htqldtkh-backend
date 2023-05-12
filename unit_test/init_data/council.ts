import { ObjectId } from "mongodb";
import { CouncilStatusEnum } from "../../src/enums/councilStatus.enum";

const mongoose = require('mongoose');
const initCouncil = [
    {
        "_id": new ObjectId("64562df79ed8dbcbf591ad64"),
        "name": "Hội đồng xét duyệt 1",
        "status": CouncilStatusEnum.NEW,
        "type": "Xét duyệt",
        "period": "63efa36a1c711759b6a7e463",
        "time": "08:30",
        "date": "2023-06-15",
        "place": "110H6 Đại học Bách khoa Tp. HCM cơ sở 2",
        "members": [
            {
                "name": "Phạm Văn A",
                "gender": "Nam",
                "academyRank": "Không có",
                "degree": "Không có",
                "workUnit": "Đại học Bách khoa Tp. HCM",
                "email": "phamvana@gmail.com",
                "phoneNumber": "0397720444",
                "role": "Ủy viên"
            }
        ],
        "numMembers": 1,
        "lastModified": new Date("2023-04-26T14:52:44.000Z"),
        "__v": 0
    }, 
    {
        "_id": new ObjectId("64562df79ed8dbcbf591ad70"),
        "name": "Hội đồng xét duyệt 2",
        "status": "Mới",
        "type": "Xét duyệt",
        "period": "63efa36a1c711759b6a7e463",
        "time": "08:30",
        "date": "2023-06-18",
        "place": "111H6 Đại học Bách khoa Tp. HCM cơ sở 2",
        "members": [
            {
                "name": "Lê Thị B",
                "gender": "Nữ",
                "academyRank": "Không có",
                "degree": "Không có",
                "workUnit": "Đại học Bách khoa Tp. HCM",
                "email": "lethib@gmail.com",
                "phoneNumber": "0397777555",
                "role": "Ủy viên"
            }
        ],
        "numMembers": 1,
        "lastModified": new Date("2023-04-26T14:52:44.000Z"),
        "__v": 0
    },
    {
        "_id": new ObjectId("64562df79ed8dbcbf591ad89"),
        "name": "Hội đồng xét duyệt 3",
        "status": "Mới",
        "type": "Xét duyệt",
        "period": "63efa36a1c711759b6a7e463",
        "time": "14:30",
        "date": "2023-06-15",
        "place": "112H6 Đại học Bách khoa Tp. HCM cơ sở 2",
        "members": [
            {
                "name": "Nguyễn Văn C",
                "gender": "Nam",
                "academyRank": "Không có",
                "degree": "Không có",
                "workUnit": "Đại học Bách khoa Tp. HCM",
                "email": "nguyenvanc@gmail.com",
                "phoneNumber": "0397192222",
                "role": "Ủy viên"
            }
        ],
        "numMembers": 1,
        "lastModified": new Date("2023-04-26T14:52:44.000Z"),
    }, 
    {
        "_id": new ObjectId("64562df79ed8dbcbf591ad9a"),
        "name": "Hội đồng xét duyệt 4",
        "status": "Mới",
        "type": "Xét duyệt",
        "period": "63efa36a1c711759b6a7e463",
        "time": "14:30",
        "date": "2023-06-18",
        "place": "113H6 Đại học Bách khoa Tp. HCM cơ sở 2",
        "members": [
            {
                "name": "Lê Thị D",
                "gender": "Nữ",
                "academyRank": "Không có",
                "degree": "Không có",
                "workUnit": "Đại học Bách khoa Tp. HCM",
                "email": "lethid@gmail.com",
                "phoneNumber": "0397123123",
                "role": "Ủy viên"
            }
        ],
        "numMembers": 1,
        "lastModified": new Date("2023-04-26T14:52:44.000Z"),
    }
]

export const initCouncilCollection = async () => {
    try {
        const connection = mongoose.connection;
        const councilCollection = connection.collection('council');
        await councilCollection.drop();
        await councilCollection.insertMany(initCouncil);
    } catch (error) {
        console.log('Init council fail');
    }
}