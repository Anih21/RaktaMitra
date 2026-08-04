exports.createRequest = async (req, res) => {
    try {

        console.log(req.body);

        res.status(200).json({
            success: true,
            message: "Request received successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};