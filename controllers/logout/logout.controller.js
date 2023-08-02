const User = require('../../models/User');

const userLogout = async (req, res) => {
    const cookies = req.cookies;
    const { userId } = req.body;
    console.log(userId)
    try {

        const user = await User.findOne({ _id: userId });

        if (user) {

            res.cookie("access_token", "", {
                sameSite: "none",
                httpOnly: true,
                secure: true,
            });

            res.cookie("refresh_token", "", {
                sameSite: "none",
                httpOnly: true,
                secure: true,
            });

            return res.status(200).send("logged out");
        }

    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = {
    userLogout
};