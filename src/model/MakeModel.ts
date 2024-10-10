import mongoose from 'mongoose';

const vehicleTypeSchema = new mongoose.Schema({
  typeId: Number,
  typeName: String
});

const makeSchema = new mongoose.Schema({
  makeId: Number,
  makeName: String,
  vehicleTypes: [vehicleTypeSchema]
});

export const MakeModel = mongoose.model('Make', makeSchema);
