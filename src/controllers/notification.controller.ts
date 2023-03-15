import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum} from "../enums/roleType.enum";
import { NotificationIntf } from "../interface/notification.interface";

const StudentModel = require('../models/student.model');
const SecretaryModel = require('../models/facultySecretary.model');
const ViceDeanModel = require('../models/facultyViceDean.model');

interface UserInfo {
    numNotification: number,
    notifications: NotificationIntf[]
}

export const getUnreadNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = req.body.author;
        if (author.role == RoleTypeEnum.Student) {
            const userId = author._id;
            const userInfo: UserInfo = await StudentModel.findById(userId)
                                    .select("numNotification notifications")
                                    .lean();
            let numNotification = userInfo.numNotification? userInfo.numNotification : 0;
            numNotification = (numNotification > 20)? 20 : numNotification;
            const totalLength = userInfo.notifications?.length;
            const notificationsList = userInfo.notifications.slice(totalLength - numNotification, totalLength);
            res.status(200).send({
                numNotification: numNotification,
                notifications: notificationsList
            })
        }
        else {
            res.status(403).send({msg: 'Not authorized'})
        }
    } catch (error) {
        res.status(400).send({err: error})
    }
}