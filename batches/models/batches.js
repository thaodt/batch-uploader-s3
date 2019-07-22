const mongoose = require('mongoose');
const dbUrl = require('../../utils/config/env.config.js').db_url;
mongoose.connect(dbUrl);
const Schema = mongoose.Schema;

const batchSchema = new Schema({
    size: String,
    createdAt: Date,
    updatedAt: Date,
    vendorId: String,
    fileName: String,
    status: {type: String, default: 'PENDING'} 
});

batchSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialized.
batchSchema.set('toJSON', {
    virtuals: true
});

batchSchema.set('toObject', {
    virtuals: true
});

batchSchema.findById = function (cb) {
    return this.model('Batches').find({id: this.id}, cb);
};

const Batch = mongoose.model('Batches', batchSchema);

exports.addBatch = (batchData) => {
    const batch_inst = new Batch(batchData);
    return batch_inst.save();
};

exports.list = (perPage, page, vendorIdInput) => {
    return new Promise((resolve, reject) => {
        Batch.find({vendorId: vendorIdInput})
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, batches) {
                if (err) {
                    reject(err);
                } else {
                    resolve(batches);
                }
            })
    });
};

exports.removeById = (batchId) => {
    return new Promise((resolve, reject) => {
        Batch.remove({_id: batchId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

