import pkg from 'apollo-server-express';
const { gql } = pkg;

export const typeDefs = gql`
type Query {
    allreviews: [Review!]!
    review(id: ID!): Review
    reviews(vendor_name: String): [Review!]!
}

type Review {
    id: ID
    reviewer_name: String
    vendor_name: String
    review_date: String
    likes: Int
    dislikes: Int
    review_body: String
}

type Vendor {
    id: ID
    name: String

}


type Mutation {
    createReview (
        reviewer_name: String!,
        vendor_name: String!,
        review_body: String!
    ): Review!
    updateLikeDislike (
        id: ID!,
        isLike: Boolean!,
        add: Boolean!
    ): Review!
}`