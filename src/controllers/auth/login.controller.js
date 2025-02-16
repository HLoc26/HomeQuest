import { AuthService } from "../../services/index.js"

export async function postLogin(req, res) {
    const { usn, pwd } = req.body

    try {
        if (!usn || !pwd) {
            throw new SyntaxError("Missing username or password")
        }

        const { token, user } = await AuthService.login({ usn, pwd })

        res.status(200).json({
            success: true,
            token,
            user
        })

    } catch (error) {
        if (error instanceof SyntaxError) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
        else {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}