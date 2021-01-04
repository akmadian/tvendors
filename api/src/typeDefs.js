import pkg from 'apollo-server-express';
const { gql } = pkg;

export const typeDefs = gql`
type Query {
    allreviews: [Review!]!
    review(id: ID!): Review
    reviews(vendor_name: String): [Review!]!
    vendors: [Vendor!]!
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
    id: ID!,
    name: String!,
    abbreviation: String,
    url: String!,
    logoUrl: String!,
    shippingOrigin: String!,
    shippingRange: String!
    style: String!,
    description: String!,
    offersSamples: Boolean!,
    knownFor: [String!],
    productTypes: [String!]!,
}

type Mutation {
    createReview (
        reviewer_name: String!,
        vendor_name: String!,
        review_body: String!
    ): Review!
    createVendor (
        id: ID
        name: String!,
        abbreviation: String,
        url: String!,
        logoUrl: String!,
        shippingOrigin: String!,
        shippingRange: String!,
        style: String!,
        description: String!,
        offersSamples: Boolean!,
        knownFor: [String!],
        productTypes: [String!]!
    ): Vendor!
    updateLikeDislike (
        id: ID!,
        isLike: Boolean!,
        add: Boolean!
    ): Review!
}`