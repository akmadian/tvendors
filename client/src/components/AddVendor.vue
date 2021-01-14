<template>
    <section>
        <a
            class="spawn-a"
            @click="active = true">
            Spawn Add Vendor Panel
        </a>
        <b-modal v-model="active" full-screen>
            <div class="card">
                <div class="card-content">
                    <div class="columns">
                        <div class="column is-narrow">
                            <h1 class="is-size-3">Add Vendor</h1>
                        </div>
                        <div class="column is-narrow">
                            <b-button type="is-link" @click="active = false">
                                Close Panel
                            </b-button>
                        </div>
                        <div class="column is-narrow">
                            <b-button 
                                type="is-success is-light"
                                @click="submitForm">
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
                    <hr/>
                    <p>

                    </p>
                    <hr>
                    <div class="columns">
                        <div class="column">
                            <b-field label="Vendor Name">
                                <b-input placeholder="Name" v-model="submit.name"></b-input>
                            </b-field>
                        </div>
                        <div class="column">
                            <b-field label="Vendor URL">
                                <b-input placeholder="URL" v-model="submit.url"></b-input>
                            </b-field>
                        </div>
                        <div class="column">
                            <b-field label="Vendor Name Abbreviation">
                                <b-input placeholder="abbreviation" v-model="submit.abbreviation"></b-input>
                            </b-field>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <b-field label="Shipping Origin">
                                <b-input placeholder="Origin" v-model="submit.origin"></b-input>
                            </b-field>
                        </div>
                        <div class="column">
                            <b-field label="Shipping Range">
                                <b-input placeholder="Range" v-model="submit.range"></b-input>
                            </b-field>
                        </div>
                        <div class="column">
                            <b-field label="Offers Samples">
                                <b-checkbox v-model="submit.has_samples">
                                    {{ submit.has_samples }}
                                </b-checkbox>
                            </b-field>
                        </div>
                    </div>
                    <b-field label="Description">
                        <b-input placeholder="Vendor Description" type="textarea" v-model="submit.description"></b-input>
                    </b-field>
                    <hr>
                    <div class="columns">
                        <div class="column">
                            <h1 class="is-size-4">Teaware Categories</h1>
                            <div v-for="[name, _] of Object.entries(teawareCategories)" :key="name">
                                <b-checkbox v-model="teawareCategories[name]" :var="_">
                                    {{ name }}
                                </b-checkbox>
                            </div>
                        </div>
                        <div class="column">
                            <h1 class="is-size-4">Teaware Material Categories</h1>
                            <div v-for="[name, _] of Object.entries(teawareMaterialCategories)" :key="name">
                                <b-checkbox v-model="teawareMaterialCategories[name]" :var="_">
                                    {{ name }}
                                </b-checkbox>
                            </div>
                        </div>
                        <div class="column">
                            <h1 class="is-size-4">Tea Categories</h1>
                            <div v-for="[name, _] of Object.entries(teaCategories)" :key="name">
                                <b-checkbox v-model="teaCategories[name]" :var="_">
                                    {{ name }}
                                </b-checkbox>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
    </section>
</template>
<script>
import gql from 'graphql-tag'

export default {
    name: 'AddVendor',
    components: {
    },
    data() {
        return {
            active: true,
            submit_successful: undefined,
            teaCategories: {
                "Pu Erh": false,
                "Shou": false,
                "Sheng": false,
                "Aged Sheng": false,
                "Hei Cha": false,
                "Yellow": false,
                "Green": false,
                "Japanese Greens": false,
                "Matcha": false,
                "White": false,
                "Oolong": false,
                "Yancha": false,
                "Anxi Oolong": false,
                "Taiwan Oolongs": false,
                "Dancong": false,
                "Black": false,
                "Tisane": false,
                "Decaf": false,
                "Flavored": false
            },
            teawareCategories: {
                "Boveda": false,
                "Hygrometer": false,
                "Cake Storage Bag": false,
                "Metal Tin": false,
                "Ceramic Jar": false,
                "Kraft Paper Pouches": false,
                "Cha Dao": false,
                "Pick": false,
                "Brush": false,
                "Matcha Whisk": false,
                "Pot Lid Rope": false,
                "Tea Pet": false,
                "Luffa Pad": false,
                "Coaster": false,
                "Cup Stand": false,
                "Lid Holder": false,
                "Scale": false,
                "Matcha Whisk Holder": false,
                "Gaiwan": false,
                "Gong Fu Starter Kit": false,
                "Travel Set": false,
                "Cup": false,
                "Waste Bowl": false,
                "Tea Table": false,
                "Strainer": false,
                "Shibordashi": false,
                "Tetsubin": false,
                "Cha Hai": false,
                "Kyusu": false,
                "Pot": false
            },
            teawareMaterialCategories: {
                "Yixing": false,
                "Nixing": false,
                "Jianshui": false,
                "Silver": false,
                "Ruyao": false,
                "Glass": false,
                "Celadon": false
            },
            submit: {
                name: undefined,
                url: undefined,
                logoUrl: undefined,
                abbreviation: undefined,
                shippingOrigin: undefined,
                shippingRange: undefined,
                offersSamples: false,
                description: undefined,
                productTypes: undefined
            }
        }
    },
    methods: {
        compileObjectsToArray() {
            var arr = []
            const merged = Object.assign(
                {},
                this.teaCategories,
                this.teawareCategories,
                this.teawareMaterialCategories
            )

            for (const [name, value] of Object.entries(merged)) {
                if (value) {
                    arr.push(name)
                }
            }
            this.submit.productTypes = arr
        },
        async submitForm() {
            this.submitLoading();
            const result = await this.$apollo.mutate({
                mutation: gql`mutation (
                    $name: String,
                    $abbreviation: String,
                    $url: String,
                    $logoUrl: String,
                    $shippingOrigin: String,
                    $shippingRange: [String!],
                    $description: String,
                    $offersSamples: Boolean,
                    $knownFor: [String!],
                    $productTypes: [String!]!
                    ) {
                    createVendor(
                        name: $name,
                        abbreviation: $abbreviation, 
                        url: $url,
                        logoUrl: $logoUrl,
                        shippingOrigin: $shippingOrigin,
                        shippingRange: $shippingRange,
                        description: $description,
                        offersSamples: $offersSamples,
                        knownFor: $knownFor,
                        productTypes: $productTypes) {
                        id
                    }
                }`,
                variables: {
                    ...this.submit
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
.spawn-a {
  filter: opacity(.4);
  font-size: .7rem;
  font-weight: 600;
  color: rgb(50, 50, 50);
  text-decoration: underline dotted;
}

.spawn-a:hover {
  filter: opacity(1);
  color: black;
  text-decoration: underline solid;
}
</style>