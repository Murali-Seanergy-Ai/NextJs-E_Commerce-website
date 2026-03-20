/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, quantity]
 *             properties:
 *               productId:
 *                 oneOf:
 *                   - type: string
 *                     description: Mongo ObjectId of the product
 *                     example: 6649ad8735d2e2c15c82a812
 *                   - type: number
 *                     description: Numeric `id` field on the product document
 *                     example: 101
 *               quantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Added to cart
 *       400:
 *         description: Invalid input (missing productId/quantity)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or Product not found
 *       500:
 *         description: Server error
 *
 *   get:
 *     summary: Get cart items
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart Items are successfully fetched
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: Remove cart item
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item id (Mongo ObjectId)
 *         example: 6649ad8735d2e2c15c82a812
 *     responses:
 *       200:
 *         description: Cart Item removed successfully
 *       400:
 *         description: Invalid Cart Item Id / missing id
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or Cart Item not found
 *       500:
 *         description: Internal Server Error
 */

