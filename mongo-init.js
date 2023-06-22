const { ObjectId } = require("mongodb");
db = db.getSiblingDB('admin');
db.createUser({
  user: 'admin',
  pwd: 'htqldtkh_cse',
  roles: [{role: 'readWrite', db: 'htqldtkh_db',}],
});

db = db.getSiblingDB('htqldtkh_db');
db.createCollection('facultySecretary');
db.collection('facultySecretary').insertMany([
  {
    "_id": new ObjectId("63b947c224213638b201493d"),
    "name": "Giáo vụ khoa",
    "gender": "Nữ",
    "username": "secretary",
    "bỉthDate": "01/01/2023",
    "staffId": "12345678",
    "email": "secretary@gmail.com",
    "__v": 0,
    "password": "$2b$10$HHNcfdofNyWyUfhkU9z8IONU8eFIHe7ZHDuric7YOpCVLuK/LsMcO",
    "notifications": [
      ""
    ],
    "numNotification": 0
  } 
]);