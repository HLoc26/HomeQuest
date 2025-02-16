import { AuthService } from "../../services/index.js";
export async function postRegister(req, res) {
    const { usn, pwd } = req.body
    try {
        const user = await AuthService.register({ usn, pwd })
        if (user) {
            res.status(200).json({
                success: true,
            })
        } else {
            throw new Error("Register failed: Internal server error");
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}