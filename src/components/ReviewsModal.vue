<template>
    <div>
        <b-modal v-model="modalOpen">
            <div class="card">
                <div class="card-content">
                    <h1 class="is-size-4">Reviews for {{ this.vendor }}</h1>
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
            modalOpen: true
        }
    },
    apollo: {
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