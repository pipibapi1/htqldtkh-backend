export interface topicConditionIntf {
    _id?: string,
    type: string,
    createAt?: string,
    expression: {[k: string]: (relationExprIntf | logicExprIntf)},
    leaderCondition?: string[]
}

export interface relationExprIntf {
    operator: string
}

export interface logicExprIntf{
    operator: string,
    object: string,
    leftExpr: {variable: string, weight?: string}[],
    rightValue: string
}