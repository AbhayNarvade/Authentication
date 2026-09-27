import userModel from "../model/user.model.js";
import {
    createAccessToken,
    createRefreshToken,
    readRefreshToken,
} from "../utils/auth.utils.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
    const { email, password, name } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        email,
    });

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "User alredy exits with this email",
        });
    }

    const user = await userModel.create({
        email,
        name,
        passwordHash: await bcrypt.hash(password, 12),
    });

    const accessToken = createAccessToken({
        userId: user._id,
        role: user.role,
    });

    const refreshToken = createRefreshToken({
        userId: user._id,
        role: user.role,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
    });

    await userModel.findByIdAndUpdate(user._id, {
        refreshToken,
    });

    return res.status(201).json({
        message: "User Created Successfully",
        data: {
            user: {
                email: user.email,
                name: user.name,
                _id: user._id,
            },
            accessToken,
        },
    });
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email,
    });

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password",
        });
    }

    const isvalid = await bcrypt.compare(password, user.passwordHash);

    if (!isvalid) {
        return res.status(400).json({
            message: "Invalid email or password",
        });
    }

    const accessToken = createAccessToken({
        userId: user._id,
        role: user.role,
    });

    const refreshToken = createRefreshToken({
        userId: user._id,
        role: user.role,
    });

    await userModel.findByIdAndUpdate(user._id, {
        refreshToken,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
    });

    return res.status(200).json({
        message: "User logged In ",
        data: {
            user: {
                email: user.email,
                name: user.name,
                _id: user._id,
            },
            accessToken,
        },
    });
};

export const refresh = async (req, res) => {
    const refreshToken = req.cookies["refreshToken"];

    // console.log(refreshToken)
    if (!refreshToken) {
        return res.status(400).json({
            message: "Refresh token required",
        });
    }
    try {
        const decoded = readRefreshToken(refreshToken);
        const { userId, role } = decoded;

        const user = await userModel.findOne({
            _id: userId,
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid refresh token",
            });
        }

        const accessToken = createAccessToken({
            userId: user._id,
            role: user.role,
        });

        const newrefreshToken = createRefreshToken({
            userId: user._id,
            role: user.role,
        });

        await userModel.findByIdAndUpdate(user._id, {
            newrefreshToken,
        });

        res.cookie("refreshToken", newrefreshToken, {
            httpOnly: true,
        });

        return res.status(200).json({
            message: "Tokens rotated successfully ",
            data: {
                user: {
                    email: user.email,
                    name: user.name,
                    _id: user._id,
                },
                accessToken,
            },
        });
    } catch (e) {
        return res.status(400).json({
            message: "something went wrong",
        });
    }
};



export const getme = async (req, res) => {

    try {
        const { userId, role } = req.user;

        const user = await userModel.findOne({
            _id: userId,
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(200).json({
            message: "User data fetch successfully",
            data: {
                user: {
                    email: user.email,
                    name: user.name,
                    id: user._id
                }
            }
        })
    } catch (e) {
        return res.status(400).json({
            message: "something went wrong"
        })
    }

}