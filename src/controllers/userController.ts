import UserModel from "../models/UserModel";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { getAccessToken } from "../utils/getAccessToken";
import { generatorRandomText } from "../utils/generatorRandomText";
dotenv.config()
// REGISTER
const register = async (req: any, res: any) => {
    const body = req.body
    const { name, email, password } = body
    try {
        // if (!username) {
        //     throw new Error(`Username is required`)
        // }
        const user = await UserModel.findOne({ email })
        if (user) {
            throw new Error(`Tài khoản đã tồn tại`)
        }
        const salt = await bcrypt.genSalt(10);
        // Hide => hash password
        const hashPassword = await bcrypt.hash(password, salt)
        body.password = hashPassword

        // Tạo người dùng mới
        const newUser: any = new UserModel(body)
        // console.log('newUser:', newUser.toObject());

        // Lưu người dùng vào cơ sở dữ liệu
        await newUser.save() //Từ chỗ này là k còn thấy có thong tin của newUser.

        // Xóa mật khẩu trước khi trả về phản hồi
        delete newUser._doc?.password;
        console.log('newUser:', newUser._doc?.email);


        // Trả về phản hồi thành công
        res.status(200).json({
            message: "Register Successfully!",
            data: {
                ...newUser._doc, token: await getAccessToken({
                    _id: newUser?._id,
                    email: newUser?.email,
                    rule: 1, // 1 User 0 Admin
                }),
            },
        }
        )
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}

// LOGIN
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

// LOGIN WITH GOOGLE
const loginWithGoogle = async (req: any, res: any) => {
    const body = req.body
    const { email, name } = body
    try {
        const user: any = await UserModel.findOne({ email })
        if (user) {
            // throw new Error(`Tài khoản đã tồn tại`)

            delete user._doc.password;

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
        }
        else {
            const salt = await bcrypt.genSalt(10);
            // Hide => hash password
            const hashPassword = await bcrypt.hash(generatorRandomText(6), salt)

            body.password = hashPassword
            const newUser: any = new UserModel(body)
            await newUser.save()

            delete newUser._doc.password;

            res.status(200).json({
                message: "Login Successfully!",
                data: {
                    ...newUser._doc,
                    token: await getAccessToken({
                        _id: newUser._id,
                        email: newUser.email,
                        rule: 1
                    }),
                },
            })
        }

    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}

// REFRESH TOKEN
const refreshToken = async (req: any, res: any) => {
    const { id } = req.query
    // console.log(id);
    try {

        const user = await UserModel.findById(id);
        if (!user) {
            throw new Error("User not found")
        }
        const token = await getAccessToken({
            _id: id,
            email: user.email,
            rule: user.rule
        })

        res.status(200).json({
            message: "check refresh token oke",
            data: token
        });
    } catch (error: any) {
        res.status(404).json({ message: error.message })
    }
}
export { register, login, loginWithGoogle, refreshToken }