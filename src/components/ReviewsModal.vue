<template>
    <div>
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
                                    <b-input maxlength="200" type="textarea"></b-input>
                                </b-field>
                                <b-button type="is-success is-light">Submit Review</b-button>
                            </div>
                        </div>
                    </b-collapse>
                    <hr>
                    <div class="comments">
                        <div v-for="rev in reviews" :key="rev.id" class="comment">
                            <span>
                                <b>{{ rev.reviewer_name }} {{ rev.review_date }}</b>
    
                                <p>{{ rev.review_body }}</p>
                                <p>{{ rev.likes }} likes, {{ rev.dislikes }} dislikes</p>
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
            modalOpen: true,
            submitReviewOpen: true
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
                    vendor_name: this.vendor,
                    submit_name: ''
                }
            }
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
</style>