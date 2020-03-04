const express = require('express');
const get = require('./controllers/get.controller');
const remove = require('./controllers/remove.controller');
const update = require('./controllers/update.controller');
const create = require('./controllers/create.controller');

const router = express.Router({ mergeParams: true });

// some api
/**
 * @swagger
 *
 * /some/{someId}:
 *   get:
 *     tags:
 *       - Some
 *     summary: Gets some resource by id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: someId
 *         in: path
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns some resource
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SomeResource'
 */
router.post('/', get);

/**
 * @swagger
 *
 * /some/:
 *   post:
 *     tags:
 *       - Some
 *     summary: Create a Some Resource
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SomeBody'
 *     responses:
 *       201:
 *         description: Returns the created Some resource
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Some'
 */
router.post('/', create);

/**
 * @swagger
 *
 * /some/{someId}:
 *   put:
 *     tags:
 *       - Some
 *     summary: Updates Some by id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: someId
 *         description: the unique identifier of Some
 *         in:  params
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SomeBody'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Some'
 */
router.put('/:someId', update);

/**
 * @swagger
 *
 * /some/{someId}:
 *   delete:
 *     tags:
 *       - Some
 *     summary: Delete a some resource by id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: someId
 *         description: the unique identifier of some resource
 *         in:  params
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.delete('/:someId', remove);


module.exports = router;
