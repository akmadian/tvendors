<template>
    <span>
        <b-field label="Search For Products">
            <b-taginput
                id="search-field"
                v-model="filteringIn.productTypes"
                :data="filteringTmp.productTypes"
                autocomplete
                field="product.type"
                placeholder="Search for tea types or products. For Example: Pu Erh, or Yixing"
                @typing="getFilteredProductTypes">
            </b-taginput>
        </b-field>
        <div class="columns">
            <div class="column">
                <b-field label="Shipping Origin">
                    <b-taginput
                        v-model="filteringIn.shippingOrigin"
                        :allow-new="false"
                        :data="filteringTmp.shippingOrigin"
                        placeholder="Any Origin"
                        @typing="getFilteredShippingOrigins">
                    </b-taginput>
                </b-field>
            </div>
            <div class="column">
                <b-field label="Known For">
                    <b-taginput
                        v-model="filteringIn.knownFor"
                        :allow-new="false"
                        :data="filteringTmp.knownFor"
                        placeholder="Anything"
                        @typing="getFilteredKnownFor">
                    </b-taginput>
                </b-field>
            </div>
            <div class="column">
                <div class="field">
                    <b-checkbox
                        v-model="filteringIn.offersSamples"
                        :indeterminate="true">
                        Offers Samples
                    </b-checkbox>
                </div>
            </div>
        </div>
        <br/>
        <section v-if="$apollo.queries.vendorsWithFilters.loading">
            <nav class="level is-mobile" v-for="_ of 5" :key="_">
                <div class="level-left">
                    <span class="level-item" style="margin-left: 1rem; margin-right: 1.1rem">
                        <b-skeleton width="2rem" height="2rem"></b-skeleton>
                    </span>
                    <span class="level-item" style="margin-right: 2.3rem">
                        <b-skeleton width="7.5rem"></b-skeleton>
                    </span>
                    <span class="level-item" style="margin-right: 1rem">
                        <b-skeleton width="4.5rem"></b-skeleton>
                    </span>
                    <span class="level-item" style="margin-right: 2rem">
                        <b-skeleton width="5rem"></b-skeleton>
                    </span>
                    <span class="level-item" style="margin-right: 2rem">
                        <b-skeleton width="7.5rem"></b-skeleton>
                    </span>
                    <span class="level-item">
                        <b-skeleton width="42rem"></b-skeleton>
                    </span>
                    <span class="level-item">
                        <b-skeleton width="7.5rem"></b-skeleton>
                    </span>
                </div>
            </nav>
        </section>
        <b-table
            v-else
            :data=vendorsWithFilters
            style="width: 100%;">
            <b-table-column field="logoUrl" label="" v-slot="props">
                <b-image
                    :src="props.row.logoUrl"
                    style="width: 2rem; height: auto; vertical-align: middle;"
                ></b-image>
            </b-table-column>
            <b-table-column field="name" label="Vendor" v-slot="props">
                <a :href="props.row.url" style="vertical-align: middle;">{{ props.row.name }}</a>
            </b-table-column>
            <b-table-column field="shippingOrigin" label="Shipping Origin" v-slot="props">
                {{ flags[props.row.shippingOrigin]}}
                {{ props.row.shippingOrigin }}
            </b-table-column>
            <!--<b-table-column field="shippingRange" label="Shipping Range" v-slot="props">
                {{ props.row.shippingRange }}
            </b-table-column>-->
            <b-table-column field="specialties" label="Known For" v-slot="props">
                <template v-for="kf in props.row.knownFor">
                    <b-tag :key="kf" rounded>{{ kf }}</b-tag>
                </template>
            </b-table-column>
            <b-table-column field="description" label="Description" v-slot="props">
                {{ props.row.description }}
            </b-table-column>
            <b-table-column v-slot="props">
                <ReviewsModal :vendor="props.row.name"/>
            </b-table-column>
        </b-table>
    </span>
</template>
<script>
import ReviewsModal from './ReviewsModal'
import gql from 'graphql-tag'
//const productTypesData = tvendors.productTypes.all

export default {
    name: 'MainTable',
    components: {
        ReviewsModal
    },
    data() {
        return {
            animated: true,
            queryCache: {
                vendors: undefined,
                distinctProductTypes: undefined,
                distinctShippingOrigins: undefined,
                distinctKnownFor: undefined
            },
            filteringTmp: {
                productTypes: [],
                shippingOrigin: [],
                knownFor: []
            },
            filteringIn: {
                productTypes: undefined,
                shippingOrigin: undefined,
                knownFor: undefined,
                offersSamples: undefined,
                style: undefined
            },
            filteringOut: {
                vendors: undefined,
                productTypes: undefined
            },
            flags: {
                "China": "🇨🇳",
                "Taiwan": "🇹🇼",
                "US": "🇺🇸",
                "UK": "🇬🇧",
                "Australia": "🇦🇺",
                "Hong Kong": "🇭🇰"
            }
        }
    },
    methods: {
        getFilteredProductTypes(text) {
            this.filteringTmp.productTypes = this.queryCache.distinctProductTypes.filter((productType) => {
                return productType.toLowerCase().includes(text.toLowerCase())
            })
        },
        getFilteredShippingOrigins(text) {
            this.filteringTmp.shippingOrigin = this.queryCache.distinctShippingOrigins.filter((shippingOrigin) => {
                return shippingOrigin.toLowerCase().includes(text.toLowerCase())
            })
        },
        getFilteredKnownFor(text) {
            this.filteringTmp.knownFor = this.queryCache.distinctKnownFor.filter((knownFor) => {
                return knownFor.toLowerCase().includes(text.toLowerCase())
            })
        }
    },
    watch: {
        filteringIn: {
            handler(newVal, oldVal) {
                console.log(oldVal)
                // In case one of the filtering options is reset to have no filtering
                // ex. productTypes['Yixing'] -> productTypes[]
                for (const [key, value] of Object.entries(newVal)) {
                    if (typeof value === "object" && value.length === 0) {
                        this.filteringIn[key] = undefined
                    }
                }
                this.$apollo.queries.vendorsWithFilters.refresh()
            },
            deep: true
        },
    },
    apollo: {
        vendorsWithFilters: {
            query: gql`query vendorsWithFilters($productTypes: [String!], $shippingOrigin: [String!], $knownFor: [String!], $offersSamples: Boolean, $style: String) {
                vendorsWithFilters(productTypes: $productTypes, shippingOrigin: $shippingOrigin, knownFor: $knownFor, offersSamples: $offersSamples, style: $style) {
                    id, name, abbreviation, url,
                    logoUrl, shippingOrigin,
                    style, description, offersSamples, knownFor,
                    productTypes
                }
            }`,
            variables() {
                return {
                    productTypes: this.filteringIn.productTypes,
                    shippingOrigin: this.filteringIn.shippingOrigin,
                    knownFor: this.filteringIn.knownFor,
                    offersSamples: this.filteringIn.offersSamples,
                    style: this.filteringIn.style
                }
            }
        },
        distinctProductTypes: {
            query: gql`
            query {
                distinctProductTypes
            }`,
            result ({ data }) {
                this.filteringOut.productTypes = data.distinctProductTypes
                this.queryCache.distinctProductTypes = data.distinctProductTypes
            }
        },
        distinctShippingOrigins: {
            query: gql`
            query {
                distinctShippingOrigins   
            }`,
            result ({ data }) {
                this.queryCache.distinctShippingOrigins = data.distinctShippingOrigins
            }
        },
        distinctKnownFor: {
            query: gql`
            query {
                distinctKnownFor
            }`,
            result ({ data }) {
                this.queryCache.distinctKnownFor = data.distinctKnownFor
            }
        },
    }
}
</script>
<style>
    .table td {
        border-bottom: none !important;
    }

    .table th {
        border-bottom: 1px solid #dbdbdb !important;
    }
</style>