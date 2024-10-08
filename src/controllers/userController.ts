import UserModel from "../models/UserModel";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { getAccessToken } from "../utils/getAccessToken";
dotenv.config()
//REGISTER
const register = async (req: any, res: any) => {
    const body = req.body
    const { email, name, password } = body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            throw new Error(`Tài khoản đã tồn tại`)
        }
        // console.log(body);
        const salt = await bcrypt.genSalt(10);
        // Hide => hash password
        const hashPassword = await bcrypt.hash(password, salt)

        // console.log("HashPassWord: ", hashPassword);
        body.password = hashPassword
        const newUser: any = new UserModel(body)
        await newUser.save()

        delete newUser._doc.password;

        res.status(200).json({
            message: "Register Successfully!",
            data: {
                ...newUser._doc, token: await getAccessToken({
                    _id: newUser._id,
                    email: newUser.email,
                    rule: 1
                }),
            },
        })
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}

//LOGIN
const login = async (req: any, res: any) => {
    const body = req.body
    const { email, password } = body
    try {
        const user: any = await UserModel.findOne({ email })
        //Check Email
        if (!user) {
            throw new Error(`Tài khoản không tồn tại`)
        }

        //Compare Password
        const isMatchPassword = await bcrypt.compare(body.password, user.password)
        if (!isMatchPassword) {
            throw new Error("Đăng nhập thất bại \n Vui lòng kiểm tra lại Email/Password")
        }

        delete user._doc.password;

        // Check Password ???

        res.status(200).json({
            message: "Login Successfully",
            data: {
                ...user._doc, token: await getAccessToken({
                    _id: user._id,
                    email: user.email,
                    rule: user.rule ?? 1
                }),
            },
        })
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}


export { register, login }