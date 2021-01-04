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
                                <div class="columns">
                                    <div class="column">
                                        <b-field label="Name">
                                            <b-input v-model="submit_name"></b-input>
                                        </b-field>
                                    </div>
                                    <div class="column">
                                        <b-field label="Rating">
                                            <b-slider v-model="submit_rating" :min="0" :max="5" ticks></b-slider>
                                            <span v-for="i in submit_rating" :key="i">⭐</span>
                                        </b-field>
                                        <!-- ADD VENDOR TAGS? EX. "fast shipping" or "great customer service"-->
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
                    {{ reviews }}
                    <hr>
                    <div class="comments">
                        <div v-for="rev in reviews" :key="rev.id" class="comment">
                            <span>
                                <p><b>{{ rev.reviewer_name }}</b> <span class="review-date">{{ rev.review_date }}</span></p>
    
                                <p>{{ rev.review_body }}</p>
                                <p style="display: none;">{{ rev.likes }} likes, {{ rev.dislikes }} dislikes</p>
                            </span>
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
            modalOpen: this.vendor === "White2Tea",
            submitReviewOpen: true,
            submit_name: '',
            submit_body: '',
            submit_loading: false,
            submit_successful: undefined
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
                }
            }`,
            variables() {
                return {
                    vendor_name: this.vendor
                }
            }
        }
    },
    methods: {
        async submitReview() {
            this.submitLoading();
            const result = await this.$apollo.mutate({
                mutation: gql`mutation ($reviewer_name: String!, $review_body: String!, $vendor_name: String!) {
                    createReview(reviewer_name: $reviewer_name, vendor_name: $vendor_name, review_body: $review_body) {
                        id
                    }
                }`,
                variables: {
                    reviewer_name: this.submit_name.trim() !== "" ? this.submit_name : "Anonymous",
                    review_body: this.submit_body,
                    vendor_name: this.vendor
                }
            })
            console.log(result)
            console.log(result.data.createReview.id)
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