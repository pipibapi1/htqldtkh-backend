import express, {Router} from 'express';
import { authorizationMiddleware } from '../middlewares/authorize.middleware';
import { getAllocatedExpenseList, getAllocatedExpenseDetail, postAllocatedExpense,
putUpdateAllocatedExpense, deleteAllocatedExpense } from '../controllers/allocatedExpense.controller';
const router: Router = express.Router();

/**
  * @openapi
  * tags:
  *   - name: allocated expense
  *     description: For allocate expense
  * /api/expense/:
  *  post:
  *     tags:
  *     - allocated expense
  *     summary: create new allocated expense
  *     description: secretary create a new allocated expense
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *             type: object
  *             properties:
  *               expense:
  *                 $ref: '#/components/schemas/AllocatedExpenseInput'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *             type: object
  *             properties:
  *               expense:
  *                 $ref: '#/components/schemas/AllocatedExpenseResponse'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  *  get:
  *     tags:
  *     - allocated expense
  *     summary: get allocated expense list
  *     description: secretary get allocated expense list
  *     parameters:
  *       - in: query
  *         name: page
  *         schema:
  *           type: string
  *           example: 1
  *         required: false
  *         description: page num
  *       - in: query
  *         name: limit
  *         schema:
  *           type: string
  *           example: 5
  *         required: false
  *         description: num item per page
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *             type: object
  *             properties:
  *               expenses:
  *                 type: array
  *                 items:
  *                   $ref: '#/components/schemas/ExpenseGeneralInfo'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  * /api/expense/{expenseId}:
  *  get:
  *     tags:
  *     - allocated expense
  *     summary: get allocated expense detail
  *     description: secretary get allocated expense detail
  *     parameters:
  *       - in: path
  *         name: expenseId
  *         required: true
  *         scheme:
  *           type: string
  *         description: id of allocated expense
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *             type: object
  *             properties:
  *               expense:
  *                 $ref: '#/components/schemas/AllocatedExpenseResponse'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  *  put:
  *     tags:
  *     - allocated expense
  *     summary: update allocated expense detail
  *     description: secretary update allocated expense
  *     parameters:
  *       - in: path
  *         name: expenseId
  *         required: true
  *         scheme:
  *           type: string
  *         description: id of allocated expense
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *          schema:
  *           type: object
  *           properties:
  *             expense:
  *               $ref: '#/components/schemas/UpdateAllocatedExpenseInput'
  *     responses:
  *      200:
  *        description: Success
  *        content:
  *          application/json:
  *            schema:
  *             type: object
  *             properties:
  *               expense:
  *                 $ref: '#/components/schemas/AllocatedExpenseResponse'
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  *  delete:
  *     tags:
  *     - allocated expense
  *     summary: delete allocated expense detail
  *     description: secretary delete allocated expense
  *     parameters:
  *       - in: path
  *         name: expenseId
  *         required: true
  *         scheme:
  *           type: string
  *         description: id of allocated expense
  *     requestBody:
  *      required: false
  *     responses:
  *      200:
  *        description: Success
  *      409:
  *        description: Conflict
  *      400:
  *        description: Bad request
  *      403:
  *        description: Not authorized
  *      404:
  *        description: Not found
  */

router.get('/', authorizationMiddleware, getAllocatedExpenseList);
router.post('/', authorizationMiddleware, postAllocatedExpense);
router.get('/:expenseId', authorizationMiddleware, getAllocatedExpenseDetail);
router.put('/:expenseId', authorizationMiddleware, putUpdateAllocatedExpense);
router.delete('/:expenseId', authorizationMiddleware, deleteAllocatedExpense);

export const allocatedExpenseRouter: Router = router;