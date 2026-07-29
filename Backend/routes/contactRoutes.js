const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/contact', contactController.getAllContacts);
router.get('/contactbyId', contactController.getContactById);
router.delete('/contactDelById', contactController.deleteContactById);
router.post('/addcontact', contactController.addContact);
router.put('/updcontact', contactController.updateContact);
router.patch('/patchcontact', contactController.patchContact);

module.exports = router;
