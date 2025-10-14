/**
 * @openapi
 * tags:
 *   - name: Room
 *     description: Room management
 *
 * /api/rooms:
 *   get:
 *     tags:
 *       - Room
 *     summary: List all rooms
 *     responses:
 *       200:
 *         description: List of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 *
 *   post:
 *     tags:
 *       - Room
 *     summary: Create a new room
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - direction
 *               - roomTypeId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Room number or name
 *               description:
 *                 type: string
 *               direction:
 *                 type: string
 *               roomTypeId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 *
 * /api/rooms/available:
 *   get:
 *     tags:
 *       - Room
 *     summary: Get available rooms for a given period
 *     parameters:
 *       - in: query
 *         name: checkIn
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *       - in: query
 *         name: checkOut
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *     responses:
 *       200:
 *         description: List of available rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         roomTypeId:
 *           type: string
 *         roomNumber:
 *           type: string
 *         description:
 *           type: string
 *         direction:
 *           type: string
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