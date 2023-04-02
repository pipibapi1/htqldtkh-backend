import { instructor } from "./topic.interface"

export interface CouncilInfoIntf {
    _id: string,
    name: string,
    type: string,
    status: string,
    period: string,
    time: string,
    date: string,
    place: string,
    numMembers: number,
    numTopics?: number,
    lastModified: string
}

export interface CouncilInputIntf {
    _id?: string,
    name: string,
    type: string,
    status?: string,
    period: string,
    time: string,
    date: string,
    place: string,
    numMembers: number,
    numTopics: number,
    members: CouncilMemberIntf[],
    topics: string[],
    lastModified?: string
}

export interface CouncilDetailIntf {
    _id?: string,
    name: string,
    type: string,
    status: string,
    period: string,
    time: string,
    date: string,
    place: string,
    numMembers: number,
    numTopics: number,
    members?: CouncilMemberIntf[],
    topicGeneralInfos?: TopicInfoIntf[],
    lastModified?: string
}

export interface TopicInfoIntf {
    _id: string,
    topicGivenId: string,
    name: string,
    type: string,
    studentId: string,
    studentName?: string,
    acceptanceResult?: string,
    reviewResult?: string,
    expense?: number,
    instructors?: instructor[],
    instructorsId?: string[],
    instructorsName?: string[]
}

export interface CouncilMemberIntf {
    name: string,
    academyRank?: string,
    degree?: string,
    workUnit: string,
    role: string,
    gender: string,
    email: string,
    phoneNumber: string
}