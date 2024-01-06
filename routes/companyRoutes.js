// routes/companyRoutes.js
import express from "express";
import companyController from "../controllers/companyController.js";

const router = express.Router();

router.post("/register", companyController.registerCompany);
router.post("/login", companyController.loginCompany);
router.post("/:companyId/profile", companyController.createCompanyProfile);
router.get("/:companyId", companyController.getCompanyProfile);
router.put("/:companyId/products", companyController.updateCompanyProducts);
router.put("/:companyId/description", companyController.updateCompanyDescription);
router.put("/:companyId/services", companyController.updateCompanyServices);



export default router;
