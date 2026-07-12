import mongoose from 'mongoose'

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    travelDate: { type: Date, required: true },
    people: { type: Number, required: true, min: 1 },
    budget: { type: String, required: true, trim: true },
    message: { type: String, trim: true, default: '' },
    status: { type: String, enum: ['New', 'Contacted'], default: 'New' },
  },
  { timestamps: true },
)

export default mongoose.model('Inquiry', inquirySchema)
