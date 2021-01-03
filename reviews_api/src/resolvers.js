import { users, reviews } from './db'

const resolvers = {
    Query: {
        reviews: (parent, { vendor_name }, context, info) => {
            console.log(new Date().toLocaleString())
            console.log(reviews.filter(rv => rv.vendor_name === vendor_name))
            return reviews.filter(rv => rv.vendor_name === vendor_name)
            
        },
        review: (parent, { id }, context, info) => {
            console.log(new Date().toLocaleString() + reviews.find(rv => rv.id === Number(id)))
            return reviews.find(rv => rv.id === Number(id));
        },
        allreviews: (parent, args, context, info) => {
            return reviews;
        }
    },
    Mutation: {
        createReview: (parent, {id, reviewer_name, vendor_name, review_body}, context, info) => {
            const newReview = {
                id,
                reviewer_name,
                vendor_name,
                review_body,
                likes: 0,
                dislikes: 0,
                review_date: "newdate"
            }
            
            reviews.push(newReview)
            return newReview
        },
        updateLikeDislike: (parent, {id, isLike, add}, context, info) => {
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
        }
    }
}

export default resolvers;