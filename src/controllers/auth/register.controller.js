export function postRegister(req, res) {
    const { usn, pwd } = req.body
    res.json({ usn, pwd })
}