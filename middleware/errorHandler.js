const { constants } = require("../constants")
const errHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation failded", message: err.message, stackTrcs: err.stack });
            break;
        case constants.NOT_FOUND:
            res.json({ title: "Not found", message: err.message, stackTrcs: err.stack });
            break;
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message, stackTrcs: err.stack });
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "Unauthorized", message: err.message, stackTrcs: err.stack });
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "Server error", message: err.message, stackTrcs: err.stack });
            break;
        default:
            console.log("no error");
            break;
    }

}
module.exports = errHandler;