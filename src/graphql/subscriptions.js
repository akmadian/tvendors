/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTvendorsReviewsModel = /* GraphQL */ `
  subscription OnCreateTvendorsReviewsModel(
    $id: ID
    $reviewer_name: String
    $rating: Int
    $review_date: AWSDate
    $likes: Int
  ) {
    onCreateTvendors_reviews_model(
      id: $id
      reviewer_name: $reviewer_name
      rating: $rating
      review_date: $review_date
      likes: $likes
    ) {
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
export const onUpdateTvendorsReviewsModel = /* GraphQL */ `
  subscription OnUpdateTvendorsReviewsModel(
    $id: ID
    $reviewer_name: String
    $rating: Int
    $review_date: AWSDate
    $likes: Int
  ) {
    onUpdateTvendors_reviews_model(
      id: $id
      reviewer_name: $reviewer_name
      rating: $rating
      review_date: $review_date
      likes: $likes
    ) {
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
export const onDeleteTvendorsReviewsModel = /* GraphQL */ `
  subscription OnDeleteTvendorsReviewsModel(
    $id: ID
    $reviewer_name: String
    $rating: Int
    $review_date: AWSDate
    $likes: Int
  ) {
    onDeleteTvendors_reviews_model(
      id: $id
      reviewer_name: $reviewer_name
      rating: $rating
      review_date: $review_date
      likes: $likes
    ) {
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
