import { body } from "express-validator";


export const registerValidation = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Invalid email")
        .bail()
        .isLength({ max: 100 })
        .withMessage("Email must not exceed 100 characters")
    ,
    body("name")
        .notEmpty().withMessage("Name is required").bail()
        .isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 to 50 characters").bail()
        .matches(/^[a-zA-Z ]+$/)
        .withMessage("Name can contain only letters and spaces")
    ,
    body("password")
        .isLength({ min: 8, max: 30 }).withMessage("Password Must be between 8 to 30 characters").bail()
    ,

    body("confirmPassword")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        })

]






export const loginValidation = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Invalid email")
        .bail()
        .isLength({ max: 100 })
        .withMessage("Email must not exceed 100 characters")

    ,
    body("password")
        .isLength({ min: 8, max: 30 }).withMessage("Password Must be between 8 to 30 characters").bail()
    ,

]