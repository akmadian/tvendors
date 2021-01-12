<template>
    <div>
        <button class="button is-small"
            @click="modalOpen = true">
            See Reviews
        </button>
        <b-modal v-model="modalOpen">
            <div class="card">
                <div class="card-content">
                    <h1 class="is-size-4">Reviews for {{ this.vendor }}</h1>
                    <hr>
                    <b-collapse class="card" animation="slide">
                        <div
                            slot="trigger"
                            class="card-header"
                            role="button"
                            aria-controls="contentIdForA11y3">
                            <p class="card-header-title">
                                Click here to submit a review
                            </p>
                            <a class="card-header-icon">
                                <b-icon
                                    :icon="submitReviewOpen ? 'menu-down' : 'menu-up'">
                                </b-icon>
                            </a>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <b-field label="Your Name">
                                    <b-input v-model="submit_name" placeholder="Anonymous"></b-input>
                                </b-field>
                                <div class="columns">
                                    <div class="column">
                                        <b-field label="Tea Quality">
                                            <b-numberinput 
                                                min="0" 
                                                max="5" 
                                                v-model="submit_ratings.quality"
                                                type="is-light">
                                            </b-numberinput>
                                        </b-field>
                                        <b-field label="Tea Selection">
                                            <b-numberinput 
                                                min="0" 
                                                max="5" 
                                                v-model="submit_ratings.selection"
                                                type="is-light">
                                            </b-numberinput>
                                        </b-field>
                                    </div>
                                    <div class="column">
                                        <b-field label="Shipping Experience">
                                            <b-numberinput 
                                                min="0" 
                                                max="5" 
                                                v-model="submit_ratings.shipping"
                                                type="is-light">
                                            </b-numberinput>
                                        </b-field>
                                        <b-field label="Customer Service">
                                            <b-numberinput 
                                                min="0" 
                                                max="5" 
                                                v-model="submit_ratings.customer_service"
                                                type="is-light">
                                            </b-numberinput>
                                        </b-field>
                                    </div>
                                    <div class="column">
                                        <b-field label="Value">
                                            <b-numberinput 
                                                min="0" 
                                                max="5" 
                                                v-model="submit_ratings.cost_to_value"
                                                type="is-light">
                                            </b-numberinput>
                                        </b-field>
                                    </div>
                                </div>
                                <b-field label="Message">
                                    <b-input maxlength="200" type="textarea" v-model="submit_body"></b-input>
                                </b-field>
                                <div class="columns">
                                    <div class="column is-narrow">
                                        <b-button 
                                            type="is-success is-light"
                                            @click="submitReview">
                                            Submit Review
                                        </b-button>
                                    </div>
                                    <div class="column submit-result">
                                        <p v-if="submit_successful === true">
                                            Review submitted successfuly!
                                        </p>
                                        <p v-if="submit_successful === false">
                                            Oops, there was an issue with submitting your review, please try again.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-collapse>
                    <hr>
                    <div class="comments">
                        <div v-if="this.reviews_.length > 0">
                            <div v-for="rev in reviews_" :key="rev.id" class="comment">
                                <span>
                                    <p><b>{{ rev.reviewer_name }}</b> <span class="review-date">{{ new Date(rev.review_date).toDateString() }}</span></p>
                                    <b-field grouped group-multiline>
                                        <div class="control">
                                            <b-taglist attached>
                                                <b-tag type="is-dark">Tea Quality</b-tag>
                                                <b-tag type="is-light">{{ rev.quality }}</b-tag>
                                            </b-taglist>
                                        </div>
                                        <div class="control">
                                            <b-taglist attached>
                                                <b-tag type="is-dark">Shipping Experience</b-tag>
                                                <b-tag type="is-light">{{ rev.shipping }}</b-tag>
                                            </b-taglist>
                                        </div>

                                        <div class="control">
                                            <b-taglist attached>
                                                <b-tag type="is-dark">Cost to Value</b-tag>
                                                <b-tag type="is-light">{{ rev.cost_to_value }}</b-tag>
                                            </b-taglist>
                                        </div>
                                        <div class="control">
                                            <b-taglist attached>
                                                <b-tag type="is-dark">Tea Selection</b-tag>
                                                <b-tag type="is-light">{{ rev.selection }}</b-tag>
                                            </b-taglist>
                                        </div>
                                        <div class="control">
                                            <b-taglist attached>
                                                <b-tag type="is-dark">Customer Service</b-tag>
                                                <b-tag type="is-light">{{ rev.customer_service }}</b-tag>
                                            </b-taglist>
                                        </div>
                                    </b-field>
                                    <p>{{ rev.review_body }}</p>
                                    <p>{{ rev.likes }} 👍 | {{ rev.dislikes }} 👎</p>
                                </span>
                            </div>
                        </div>
                        <div v-else>
                            <p>There are no reviews for {{ this.vendor }} yet. Please add yours above!</p>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
import gql from 'graphql-tag'

export default {
    name: 'ReviewsModal',
    props: ['vendor'],
    data() {
        return {
            modalOpen: false,
            submitReviewOpen: true,
            submit_name: '',
            submit_body: '',
            submit_ratings: {
                quality: 3,
                selection: 3,
                cost_to_value: 3,
                shipping: 3,
                customer_service: 3
            },
            submit_loading: false,
            submit_successful: undefined,
            reviews_: []
        }
    },
    apollo: {
        // https://apollo.vuejs.org/guide/apollo/#queries
        reviews: {
            query: gql`query reviews($vendor_name: String!) {
                reviews(vendor_name: $vendor_name) {
                    id
                    reviewer_name
                    review_date
                    review_body
                    likes
                    dislikes
                    quality
                    selection
                    cost_to_value
                    shipping
                    customer_service
                }
            }`,
            variables() {
                return {
                    vendor_name: this.vendor
                }
            },
            skip() {
                // Only fetch reviews for this vendor when the reviews modal is opened
                return !this.modalOpen
            },
            result ({ data }) {
                this.reviews_ = data.reviews
            }
        }
    },
    methods: {
        async submitReview() {
            this.submitLoading();
            const result = await this.$apollo.mutate({
                mutation: gql`mutation (
                    $reviewer_name: String!, 
                    $review_body: String!, 
                    $vendor_name: String!, 
                    $quality: Int,
                    $selection: Int,
                    $cost_to_value: Int,
                    $shipping: Int,
                    $customer_service: Int,
                    ) {
                    createReview(
                        reviewer_name: $reviewer_name, 
                        vendor_name: $vendor_name, 
                        review_body: $review_body,
                        quality: $quality,
                        selection: $selection,
                        cost_to_value: $cost_to_value,
                        shipping: $shipping,
                        customer_service: $customer_service) {
                        id
                    }
                }`,
                variables: {
                    reviewer_name: this.submit_name.trim() !== "" ? this.submit_name : "Anonymous",
                    review_body: this.submit_body,
                    vendor_name: this.vendor,
                    quality: this.submit_ratings.quality,
                    selection: this.submit_ratings.selection,
                    cost_to_value: this.submit_ratings.cost_to_value,
                    shipping: this.submit_ratings.shipping,
                    customer_service: this.submit_ratings.customer_service
                }
            })
            if (result.data.createReview.id) {
                this.submit_successful = true
            } else {
                this.submit_successful = false
            }
            setTimeout(() => {
                this.submit_successful = undefined
            }, 3000)
        },
        submitLoading() {
            this.submit_loading = true
            setTimeout(() => {
                this.isLoading = false
            }, 5 * 1000)
        }
    }
}
</script>
<style>
    .comments {
        margin-left: 1rem;
    }

    .comment {
        margin-bottom: 1rem;
    }

    .review-date {
        font-size: .8rem;
        margin-left: .5rem;
    }

    .submit-result {
        vertical-align: middle;
    }


</style>