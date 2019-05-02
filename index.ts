import * as mongoose from 'mongoose';

export default function SoftDeletePlugin (schema, options) {
  schema.add({ deleted: { type: Boolean, default: false }});

  schema.statics.deleteOne = function(filters: any)  {
    return this.updateOne(filters, {deleted: true});
  };

  schema.statics.find = function()  {
    return mongoose.Model.find.apply(this, arguments).where('deleted').ne(true);
  };

  schema.statics.findOne = function()  {
    return mongoose.Model.findOne.apply(this, arguments).where('deleted').ne(true);
  };

  schema.statics.findWithDeleted = function() {
    return mongoose.Model.find.apply(this, arguments);
  };

  schema.statics.findOneWithDeleted = function() {
    return mongoose.Model.findOne.apply(this, arguments);
  };

  if (options && options.index) {
    schema.path('deleted').index(options.index);
  }
}

