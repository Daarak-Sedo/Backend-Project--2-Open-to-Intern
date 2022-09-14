
const isValid = function (value) {
    if (typeof (value) === undefined ||typeof (value) === null) { return false }
    if ((value).length == 0) { return false }
    if (typeof (value) === "string" && (value).length > 0) { return true }
}

const isRightFormatemail = function (email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const isRightFormatmobile = function (mobile) {
    return /^([+]\d{2})?\d{10}$/.test(mobile);
}

module.exports.isValid=isValid;
module.exports.isRightFormatemail=isRightFormatemail;
module.exports.isRightFormatmobile=isRightFormatmobile;


