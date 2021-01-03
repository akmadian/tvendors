/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTvendorsReviewsModel = /* GraphQL */ `
  query GetTvendorsReviewsModel($id: ID!) {
    getTvendors_reviews_model(id: $id) {
      id
      reviewer_name
      rating
      review_date
      likes
      dislikes
      review_body
      vendor_name
    }
  }
`;
export const listTvendorsReviewsModels = /* GraphQL */ `
  query ListTvendorsReviewsModels(
    $filter: TableTvendors_reviews_modelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTvendors_reviews_models(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        reviewer_name
        rating
        review_date
        likes
        dislikes
        review_body
        vendor_name
      }
      nextToken
    }
  }
`;
