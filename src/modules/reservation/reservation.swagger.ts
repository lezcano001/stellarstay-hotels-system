/**
 * @openapi
 * tags:
 *   - name: Reservation
 *     description: Reservation management
 *
 * /api/reservations:
 *   get:
 *     tags:
 *       - Reservation
 *     summary: Get all reservations
 *     responses:
 *       200:
 *         description: List of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 *
 *   post:
 *     tags:
 *       - Reservation
 *     summary: Reserve a room
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomId
 *               - checkIn
 *               - checkOut
 *             properties:
 *               roomId:
 *                 type: string
 *               checkIn:
 *                 type: string
 *                 format: date-time
 *               checkOut:
 *                 type: string
 *                 format: date-time
 *               breakfastIncluded:
 *                 type: boolean
 *                 default: false
 *               guests:
 *                 type: integer
 *                 default: 1
 *               paymentSource:
 *                 type: string
 *                 description: Payment token
 *     responses:
 *       200:
 *         description: Room reserved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Room reserved successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         roomId:
 *           type: string
 *         checkIn:
 *           type: string
 *           format: date-time
 *         checkOut:
 *           type: string
 *           format: date-time
 *         totalCost:
 *           type: number
 *           format: float
 *         status:
 *           type: string
 *           enum: [pending, confirmed, canceled]
 *         breakfastIncluded:
 *           type: boolean
 *         guests:
 *           type: integer
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         message:
 *           type: string
 *   responses:
 *     BadRequest:
 *       description: Bad request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *     InternalError:
 *       description: Internal server error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 */