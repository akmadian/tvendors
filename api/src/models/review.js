import mongoose from 'mongoose'

export const Review = mongoose.model('Review', {
    id: Number,
    reviewer_name: String,
    vendor_name: String,
    review_date: String,
    likes: Number,
    dislikes: Number,
    review_body: String,
    quality: Number,
    selection: Number,
    cost_to_value: Number,
    shipping: Number,
    customer_service: Number
})