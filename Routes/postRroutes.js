const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');

router.post('/', postController.create);
router.get('/', postController.index);
router.get('/byUser/:userId', postController.showByUser);
router.get('/byItem/:ItemId', postController.showByProperty);
router.get('/:id/edit', postController.updateForm);
router.put('/:id', postController.update);
router.delete('/:id', postController.delete);

module.exports = router;