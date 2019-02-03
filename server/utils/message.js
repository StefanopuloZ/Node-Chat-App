const moment = require('moment');

let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};

let generateLocationMessage = (from, lat, lon) => {
    return {
        from,
        url: `https://www.google.com/maps/@?api=1&map_action=map&center=${lat},${lon}&zoom=11` ,
        createdAt: moment().valueOf()
    };
};

module.exports = { generateMessage, generateLocationMessage }