import UserModel from "../models/UserModel";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config()
const register = async (req: any, res: any) => {
    const body = req.body
    const { email, name, password, confirmPassword } = body
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
        const newUser = new UserModel(body)
        await newUser.save()
        delete newUser.password
        res.status(200).json({
            message: "Register",
            data: body,
        })
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}

export { register }