import mongoose from 'mongoose'

const hotSellingTripSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    price: { type: Number, min: 0, default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export default mongoose.model('HotSellingTrip', hotSellingTripSchema)
