export interface topicExpenseInterface {
    _id?: string,
    type: string,
    expense: number
}

export interface topicGeneralInterface {
    _id?: string,
    name: string,
    type: string,
    startTime: string,
    endTime: string,
    isExtended: boolean,
    extensionTime: number,
    status: string,
    period: string,
    studentId: string,
    student?: {_id: string, name: string}
    creationDate: string,
    productId: string,
    topicGivenId: string,
    otherMembers?: otherMember[],
    instructorsId?: string[],
    instructors?: instructor[],
    periodValue: string;
}

export interface topicInputInterface {
    name: string,
    type: string,
    startTime?: string,
    endTime?: string,
    status: string,
    period: string,
    studentId: string,
    creationDate: string,
    productId: string,
    topicGivenId: string,
    otherMembers: otherMember[],
    instructorsId: string[],
    isExtended: boolean,
    extensionTime: number,
    expense: number,
    acceptanceCouncilId: string,
    reviewCouncilId: string
}

export interface updateTopicInputForFS {
    name?: string,
    type?: string,
    status?: string,
    isExtended?: boolean,
    extensionTime?: number,
    period?: string,
    topicGivenId?: string,
    expense?: string,
    startTime?: string,
    endTime?: string
}

export interface updateTopicInputForStudent {
    name?: string,
    type?: string,
    period?: string
}

export interface otherMember {
    _id?: string,
    studentId: string,
    fmName?: string
    name: string,
    gender: string,
    email: string,
    phoneNumber: string,
    educationType: string,
    birthDate: string
}

export interface instructor {
    _id? : string,
    staffId: string,
    fmName?: string,
    name: string,
    gender: string,
    email: string,
    phoneNumber: string,
    birthDate: string,
    academyRank: string,
    degree: string
}