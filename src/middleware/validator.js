import { validationResult } from "express-validator"

const validate = (req, res, next) => {
    let errors = validationResult(req);
    // console.log(errors);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message : "Invalid Request",
            errors: errors.array().map((e) => {
                return {
                    field: e.path,
                    message: e.msg
                }
            })
        });
    }
    next();

}

export default validate;