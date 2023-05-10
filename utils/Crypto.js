const crypto = require('crypto');

/*******
 * Create landom string
 * @returns {string}
 */
const randomString = () => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    const stringLength = 8;
    let randomString = '';
    for (let i=0; i<stringLength; i++) {
        let rnum = Math.floor(Math.random() * chars.length);
        randomString += chars.substring(rnum,rnum+1);
    }
    return randomString;
};


/*************
 * Crypto
 *************/
exports.doCipher = (inputPass, salt = randomString()) => {
    const iterations = 100;
    const keylen = 24;
    
    const derivedKey = crypto.createHash("sha256").update(inputPass + "|" + salt).digest("hex");
    const pw = new Buffer(derivedKey, 'binary').toString('hex');
    
    return { pw, salt };
};

/*************
 * jwt
 *************/
exports.jwt = {
    cert: "secret"
};


