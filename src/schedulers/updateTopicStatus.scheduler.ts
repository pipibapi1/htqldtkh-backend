import cron from 'node-cron';
import moment from 'moment';
import { regexInterface } from "../interface/general.interface";
import { TopicStatusEnum } from '../enums/topicStatus.enum';

const TopicModel = require('../models/topic.model');

interface Topic {
    _id: string,
    startTime: string,
    endTime: string,
    productId: string
}


const getOnGoingTopics: () => Promise<Topic[]> = async () => {
    const chosenField: string[] = ["_id", "startTime", "endTime", "productId"];

    let filter: {[k: string]: regexInterface | string} = {};
    filter.status = TopicStatusEnum.CARRY_OUT;

    const onGoingTopics: Topic[] = await TopicModel.find(filter)
                                                    .select(chosenField.join(" "))
                                                    .lean();
    return onGoingTopics;
}

const updateTopicStatus = async (topicId: string, newStatus: string) => {
    let existedTopic = await TopicModel.findById(topicId);
    if(existedTopic){
        existedTopic.status = newStatus;
        await existedTopic.save();
    }
    else{
        console.log("topic not found")
    }
}

export let updateTopicStatusScheduler = cron.schedule('0 14 * * *', async () => {
    try {
      const onGoingTopics: Topic[] = await getOnGoingTopics();
      onGoingTopics.map(async(topic) => {
        if(moment().isAfter(moment(new Date(topic.endTime))) && topic.productId === ""){
            // chuyen qua tre han
            await updateTopicStatus(topic._id, TopicStatusEnum.OUT_OF_DATE);
        }
        else if(moment().isAfter(moment(new Date(topic.endTime))) && topic.productId !== ""){
            // chuyen qua den han nghiem thu
            await updateTopicStatus(topic._id, TopicStatusEnum.DUE_TO_ACCEPT);
        }
      });
    } catch (error) {
      console.error(error);
    }
}, {
    scheduled: true,
    timezone: "America/Sao_Paulo"
});