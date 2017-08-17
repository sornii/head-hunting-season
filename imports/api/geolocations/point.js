import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const PointSchema = new SimpleSchema({
  type: {
    type: String,
    defaultValue: "Point"
  },
  coordinates: {
    type: Array,
    minCount: 2,
    maxCount: 2
  },
  "coordinates.$": {
    type: Number
  }
});