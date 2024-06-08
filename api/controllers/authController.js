exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const saltGenerated = await bcrypt.genSalt(11);
        const hashedPassword = await bcrypt.hash(req.body.password, saltGenerated);
        const savedDocument = await User.create({
            username: req.body.username,
            password: hashedPassword,
        });
        res.status(200).json({
            requestData: { username, password },
        });
    } catch (error) {
        res.status(400).json(error.errorResponse.errmsg);
    }
}