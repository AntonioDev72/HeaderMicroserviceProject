import express from 'express';
import { createPerson, getAllPersons, getPerson, updatePerson, deletePerson } from '../controllers/personController.js';

const router = express.Router();
router.route('/').post(createPerson).get(getAllPersons);
router.route('/:id').get(getPerson).patch(updatePerson).delete(deletePerson);

export default router;
