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
    productPath: string
}