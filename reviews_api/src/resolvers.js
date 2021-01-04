import { Review } from './models/review.js'

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
        review: (_, { id }, __, ___) => {
            const res = Review.findOne(
                { 'id': id },
                'reviewer_name id vendor_name'
            )
            console.log(res)
            return res
        },
        allreviews: (_, __, ___, ____) => {
            return reviews;
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
        }
    }
}