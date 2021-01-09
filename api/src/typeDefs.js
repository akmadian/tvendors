import pkg from 'apollo-server-express';
const { gql } = pkg;

export const typeDefs = gql`

type Query {
    allreviews: [Review!]!
    review(id: ID!): Review
    reviews(vendor_name: String): [Review!]!
    vendors: [Vendor!]!
    distinctShippingOrigins: [String!]!
    distinctProductTypes: [String!]!
    distinctKnownFor: [String!]!
    vendorsWithFilters(
        productTypes: [String!],
        shippingOrigin: [String!],
        knownFor: [String!],
        offersSamples: Boolean,
        style: String
    ): [Vendor!]!
}

type Review {
    id: ID
    reviewer_name: String
    vendor_name: String
    review_date: String
    likes: Int
    dislikes: Int
    review_body: String
    quality: Int
    selection: Int
    cost_to_value: Int
    shipping: Int
    customer_service: Int
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
    nReviews: Int,
    avg_quality: Int,
    avg_shipping: Int,
    avg_value: Int,
    avg_selection: Int,
    avg_cust: Int,
    rating_composite: Int
}

type Mutation {
    createReview (
        reviewer_name: String!,
        vendor_name: String!,
        review_body: String!,
        quality: Int,
        selection: Int,
        cost_to_value: Int,
        shipping: Int,
        customer_service: Int
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
    ): Boolean
}`