import mongoose from 'mongoose'

export const Review = mongoose.model('Review', {
    id: Number,
    reviewer_name: String,
    vendor_name: String,
    review_date: { type: Date, default: Date.now },
    likes: Number,
    dislikes: Number,
    review_body: String,
})