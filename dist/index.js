"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
function SoftDeletePlugin(schema, options) {
    schema.add({ deleted: { type: Boolean, default: false } });
    schema.statics.deleteOne = function (filters) {
        return this.updateOne(filters, { deleted: true });
    };
    schema.statics.deleteMany = function (filters) {
        return this.updateMany(filters, { deleted: true });
    };
    schema.statics.hardDeleteOne = function (filters) {
        return mongoose.Model.deleteOne.apply(this, arguments);
    };
    schema.statics.hardDeleteMany = function (filters) {
        return mongoose.Model.deleteMany.apply(this, arguments);
    };
    schema.statics.find = function () {
        return mongoose.Model.find.apply(this, arguments).where('deleted').ne(true);
    };
    schema.statics.findOne = function () {
        return mongoose.Model.findOne.apply(this, arguments).where('deleted').ne(true);
    };
    schema.statics.findWithDeleted = function () {
        return mongoose.Model.find.apply(this, arguments);
    };
    schema.statics.findOneWithDeleted = function () {
        return mongoose.Model.findOne.apply(this, arguments);
    };
    schema.statics.update = function () {
        return mongoose.Model.update.apply(this, arguments).where('deleted').ne(true);
    };
    schema.statics.updateOne = function () {
        return mongoose.Model.updateOne.apply(this, arguments).where('deleted').ne(true);
    };
    schema.statics.updateWithDeleted = function () {
        return mongoose.Model.update.apply(this, arguments);
    };
    schema.statics.updateOneWithDeleted = function () {
        return mongoose.Model.updateOne.apply(this, arguments);
    };
    schema.statics.findOneAndUpdate = function () {
        return mongoose.Model.findOneAndUpdate.apply(this, arguments).where('deleted').ne(true);
    };
    schema.statics.findOneAndUpdateWithDeleted = function () {
        return mongoose.Model.findOneAndUpdate.apply(this, arguments);
    };
    if (options && options.index) {
        schema.path('deleted').index(options.index);
    }
}
exports.default = SoftDeletePlugin;
//# sourceMappingURL=index.js.map