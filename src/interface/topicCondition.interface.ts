export interface topicConditionIntf {
    _id?: string,
    type: string,
    createAt?: string,
    requireLevel: string,
    expression: {[k: string]: (relationExprIntf | logicExprIntf)},
    leaderCondition?: string[],
    instructorCondition: instructorConditionIntf
}

export interface instructorConditionIntf {
    degree: string[],
    academyRank: string[],
    approveWay: string
}

export interface relationExprIntf {
    operator: string
}

export interface logicExprIntf{
    operator: string,
    object: topicMemberObject,
    leftExpr: variableIntf[],
    rightValue: string
}

interface variableIntf {
    variable: string, 
    weight?: string,
    key: string,
    subjectName?: string,
    subjectId?: string
}

interface topicMemberObject {
    name: string,
    quantity?: string,
    compare?: string
}