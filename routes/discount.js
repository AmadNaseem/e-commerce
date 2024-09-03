const express = require('express');
const router = express.Router();
const { createDiscount, getDiscounts, applyDiscount } = require('../controllers/discountController');

/**
 * @swagger
 * /api/discounts:
 *   post:
 *     summary: Create a new discount
 *     tags: [Discounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: SUMMER20
 *               type:
 *                 type: string
 *                 example: percentage
 *               value:
 *                 type: number
 *                 example: 20
 *               expiryDate:
 *                 type: string
 *                 format: date
 *                 example: 2023-12-31
 *     responses:
 *       200:
 *         description: Discount created successfully
 *       500:
 *         description: Server error
 */
router.post('/', createDiscount);

/**
 * @swagger
 * /api/discounts:
 *   get:
 *     summary: Get all discounts
 *     tags: [Discounts]
 *     responses:
 *       200:
 *         description: List of all discounts
 *       500:
 *         description: Server error
 */
router.get('/', getDiscounts);

/**
 * @swagger
 * /api/discounts/apply:
 *   post:
 *     summary: Apply a discount code
 *     tags: [Discounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: SUMMER20
 *     responses:
 *       200:
 *         description: Discount applied successfully
 *       400:
 *         description: Invalid or expired discount code
 *       500:
 *         description: Server error
 */
router.post('/apply', applyDiscount);

module.exports = router;
