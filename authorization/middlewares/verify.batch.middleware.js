var fs = require('fs');

exports.hasAuthValidFileType = (req, res, next) => {
    let errors = [];

    if (req.body) {
        // if (!req.body.vendorId) {
        //     errors.push('Missing vendorId field');
        // }
        if (!req.body.fileName) {
            errors.push('Missing fileName field');
        }

        fs.readFile(req.body.fileName, 'utf8', function (err, data) {
            if (err) return res.status(422).send({errors: 'File type is invalid. Please provide a JSON file.'});
            // let obj = JSON.parse(data);
        });

        if (errors.length) {
            return res.status(400).send({errors: errors.join(',')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({errors: 'Missing fileName fields'});
    }
};