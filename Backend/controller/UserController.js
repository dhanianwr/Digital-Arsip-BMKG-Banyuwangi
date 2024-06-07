import Users from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const getUsers = async(req, res) => {
    try {
        const users= await Users.findAll({
            attributes: ['id', 'name', 'nip']
        });
        res.json(users);
    } catch (error) {
        console.log(error.message);
    }
}

export const Register = async(req, res) => {
    const { name, nip, password, confPassword } = req.body;
   
    if (password !== confPassword)
       return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    
    if(nip.length !== 18)
       return res.status(400).json ({msg: "NIP and Kurang dari 18 Karakter"});

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
   
    try {
       await Users.create({
           name: name,
           nip: nip,
           password: hashPassword,
       });
       res.json({ msg: "Register Berhasil" });
    } catch (error) {
       console.log(error);
    }
   }

   export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                nip: req.body.nip
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg:"Password Salah"});
        const userId = user[0].id;
        const name = user[0].name;
        const nip = user[0].nip;
        const accessToken = jwt.sign({userId, name, nip}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, name, nip}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken},{
            where: {
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 7200000
            // secure: true (untuk HTTPS jika diperlukan)
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"NIP tidak ditemukan"});
    }
   }

   export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(204);
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(403);
        const userId = user[0].id;
        await Users.update({refresh_token: null}, {
            where: {
                id: userId
            }
        });
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
   }