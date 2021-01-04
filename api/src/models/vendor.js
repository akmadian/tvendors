import mongoose from 'mongoose'

export const Vendor = mongoose.model('Vendor', {
    id: Number,
    name: String,
    abbreviation: String,
    url: String,
    logoUrl: String,
    shippingOrigin: String,
    style: String,
    description: String,
    offersSamples: Boolean,
    knownFor: [String],
    productTypes: [String],
})