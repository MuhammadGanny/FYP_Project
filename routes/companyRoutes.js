// routes/companyRoutes.js
import express from 'express';
import companyController from '../controllers/companyController';

const router = express.Router();

router.post('/register', companyController.registerCompany);
router.post('/:companyId/profile', companyController.createCompanyProfile);
router.get('/:companyId', companyController.getCompanyProfile);
router.put('/:companyId', companyController.updateCompanyProfile);

export default router;
