import { readAccessToken } from "../utils/auth.utils.js"


export const authenticate = (req, res, next) => {

    const accessToken = req.headers.authorization?.split(" ")[1]

    if (!accessToken) {
        return res.status(400).json({
            "Message": " Access token not found in the request header"
        })
    }

    try {
        const decoded = readAccessToken(accessToken);
        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({
            message: "Invalid or expired access token"
        })
    }

}

