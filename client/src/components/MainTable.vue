<template>
    <span>
        <b-field label="Search For Products">
            <b-taginput
                id="search-field"
                v-model="tags"
                :data="filteredTags"
                autocomplete
                field="product.type"
                placeholder="Search for tea types or products. For Example: Pu Erh, or Yixing"
                @typing="getFilteredTags">
            </b-taginput>
        </b-field>
        <br/>
        <b-table 
            :data=filteredVendors
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
            <b-table-column field="style" label="Style" v-slot="props">
                <b-tag rounded>
                    {{ props.row.style }}
                </b-tag>
            </b-table-column>
            <b-table-column field="shippingOrigin" label="Shipping Origin" v-slot="props">
                {{ flags[props.row.shippingOrigin]}}
                {{ props.row.shippingOrigin }}
            </b-table-column>
            <!--<b-table-column field="shippingRange" label="Shipping Range" v-slot="props">
                {{ props.row.shippingRange }}
            </b-table-column>-->
            <b-table-column field="specialties" label="Specialties" v-slot="props">
                <template v-for="specialty in props.row.specialties">
                    <b-tag :key="specialty" rounded>{{ specialty }}</b-tag>
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

import tvendors from '../tvendors.json'
const productTypesData = tvendors.productTypes.all

export default {
    name: 'MainTable',
    components: {
        ReviewsModal
    },
    data() {
        return {
            filteredVendors: tvendors.vendors,
            filteredTags: productTypesData,
            originCountries: tvendors.shippingOriginCountries,
            tags: [],
            allowedOrigins: [],
            flags: {
                "China": "🇨🇳",
                "Taiwan": "🇹🇼",
                "US": "🇺🇸",
                "UK": "🇬🇧",
                "Australia": "🇦🇺"
            }
        }
    },
    methods: {
        getFilteredTags(text) {
            this.filteredTags = productTypesData.filter((productType) => {
                return productType.toLowerCase().includes(text.toLowerCase())
            })
        },
        filterVendors() {
            if (this.tags.length === 0) {
                this.filteredVendors = tvendors.vendors
            } else {
                this.filteredVendors = tvendors.vendors.filter((vendor) => {
                    return this.tags.some(r => vendor.productTypes.includes(r))
                })
            }
        }
    },
    watch: {
        tags: {
            handler() {
                this.filterVendors()
            },
            deep: true
        }
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