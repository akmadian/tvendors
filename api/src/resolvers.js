import { Review } from './models/review.js'
import { Vendor } from './models/vendor.js'

export const resolvers = {
    Query: {
        reviews: (_, { vendor_name }, __, ___) => {
            const res = Review.find(
                { 'vendor_name': vendor_name },
                'reviewer_name id vendor_name review_date review_body likes dislikes'
            )
            console.log(res)
            return res
            
        },
        vendors: (_, __, ___, ____) => {
            const res = Vendor.find()
            return res
        },
        review: (_, { id }, __, ___) => {
            const res = Review.findOne(
                { 'id': id },
                'reviewer_name id vendor_name'
            )
            console.log(res)
            return res
        },
        allreviews: (_, __, ___, ____) => {
            const res = Review.find();
            console.log(res)
            return res
        },
        distinctShippingOrigins: (_, __, ___, ____) => {
            const res = Vendor.distinct("shippingOrigin")
            return res
        },
        distinctProductTypes: (_, __, ___, ____) => {
            const res = Vendor.distinct("productTypes")
            return res
        }
    },
    Mutation: {
        updateLikeDislike: (_, {id, isLike, add}, __, ___) => {
            var review = reviews.find(review => review.id === Number(id));
            console.log(review)

            if (isLike) {
                if (add) {
                    review.likes++
                } else {
                    review.likes--
                }
            } else {
                if (add) {
                    review.dislikes++
                } else {
                    review.dislikes--
                }
            }

            return review
        },
        createReview: async (_, { reviewer_name, vendor_name, review_body }, __, ___) => {
            console.log(reviewer_name, vendor_name, review_body)
            const id = Date.now()
            const date = Date().toString()
            const newReview = new Review({
                id,
                reviewer_name,
                vendor_name,
                review_body,
                likes: 0,
                dislikes: 0,
                review_date: date
            })
            await newReview.save()
            console.log(newReview)
            return newReview
        },
        createVendor: async(_, { name, abbreviation, url, logoUrl, shippingOrigin, shippingRange, style, description, offersSamples, knownFor, productTypes}, __, ___) => {
            console.log(`Creating record for vendor: ${name}`)
            const id = Date.now()
            const newVendor = new Vendor({
                id, name, abbreviation, url, logoUrl,
                shippingOrigin, shippingRange, style, description,
                offersSamples, knownFor, productTypes
            })
            await newVendor.save()
            console.log(newVendor)
            return newVendor
        }
    }
}