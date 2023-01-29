export interface expenseInterface {
    period: string,
    lastModified?: string,
    createAt?: string,
    allocated: allocatedExpenseForType[],
    totalExpense: number,
    generalExpense: number,
    used?: usedExpenseForType,
    usedExpense?: number, 
    note?: string
}

export interface allocatedExpenseForType {
    type: string,
    totalExpense?: number,
    maxExpensePerTopic?: number
}

export interface usedExpenseForType {
    [k: string] : number
}

export interface updateExpenseInterface{
    totalExpense?: number,
    generalExpense?: number,
    allocated?: allocatedExpenseForType[],
    note?: string,
    lastModified?: string
}