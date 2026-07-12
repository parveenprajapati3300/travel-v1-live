import mongoose from 'mongoose'

const packageSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true, lowercase: true },
    category: { type: String, required: true, enum: ['domestic', 'international'] },
    packageDestination: { type: String, default: '', trim: true },
    packageCategories: [{ type: String, trim: true }],
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, trim: true },
    rating: { type: Number, default: 4.8, min: 0, max: 5 },
    description: { type: String, required: true, trim: true },
    highlights: [{ type: String, trim: true }],
    included: [{ type: String, trim: true }],
    excluded: [{ type: String, trim: true }],
    itinerary: [
      {
        day: { type: Number, required: true },
        title: { type: String, required: true, trim: true },
        details: { type: String, required: true, trim: true },
      },
    ],
    hotel: { type: String, default: '', trim: true },
    transport: { type: String, default: '', trim: true },
    gallery: [{ type: String, trim: true }],
    reviews: [{ type: String, trim: true }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export default mongoose.model('Package', packageSchema)
