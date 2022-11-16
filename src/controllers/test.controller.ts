import { Request, Response, NextFunction } from "express";

class TestController{
    public getTest =  async (req: Request, res: Response, next: NextFunction) => {
        res.send('Express + TypeScript Server');
    }
}
export const testController: TestController = new TestController;