<template>
    <section>
        <a
            class="spawn-a"
            @click="DBPanelActive = true">
            Spawn DB Panel
        </a>
        <b-modal v-model="DBPanelActive" full-screen>
            <div class="card">
                <div class="card-content">
                    <h1 class="is-size-3">DB Panel</h1>
                    <b-button type="is-link" @click="DBPanelActive = false">
                        Close DB Panel
                    </b-button>
                    <hr/>
                    <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
                        <div
                            slot="trigger" 
                            slot-scope="props"
                            class="card-header"
                            role="button"
                            aria-controls="contentIdForA11y3">
                            <p class="card-header-title">
                                Distinct Product Types
                            </p>
                            <a class="card-header-icon">
                                <b-icon
                                    :icon="props.open ? 'menu-down' : 'menu-up'">
                                </b-icon>
                            </a>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <template v-for="type in distinctProductTypes">
                                    <b-tag :key="type" rounded>{{ type }}</b-tag>
                                </template>
                            </div>
                        </div>
                    </b-collapse>
                    <hr/>
                    <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
                        <div
                            slot="trigger" 
                            slot-scope="props"
                            class="card-header"
                            role="button"
                            aria-controls="contentIdForA11y3">
                            <p class="card-header-title">
                                Distinct Shipping Origins
                            </p>
                            <a class="card-header-icon">
                                <b-icon
                                    :icon="props.open ? 'menu-down' : 'menu-up'">
                                </b-icon>
                            </a>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <template v-for="origin in distinctShippingOrigins">
                                    <b-tag :key="origin" rounded>{{ origin }}</b-tag>
                                </template>
                            </div>
                        </div>
                    </b-collapse>
                    <hr>
                    <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
                        <div
                            slot="trigger" 
                            slot-scope="props"
                            class="card-header"
                            role="button"
                            aria-controls="contentIdForA11y3">
                            <p class="card-header-title">
                                All Reviews
                            </p>
                            <a class="card-header-icon">
                                <b-icon
                                    :icon="props.open ? 'menu-down' : 'menu-up'">
                                </b-icon>
                            </a>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <b-table :data="allreviews" :columns="reviews_columns"></b-table>
                            </div>
                        </div>
                    </b-collapse>
                    <hr>
                    <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
                        <div
                            slot="trigger" 
                            slot-scope="props"
                            class="card-header"
                            role="button"
                            aria-controls="contentIdForA11y3">
                            <p class="card-header-title">
                                All vendors
                            </p>
                            <a class="card-header-icon">
                                <b-icon
                                    :icon="props.open ? 'menu-down' : 'menu-up'">
                                </b-icon>
                            </a>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <b-table 
                                    :data=vendors
                                    style="width: 100%;">
                                    <b-table-column field="name" label="name" v-slot="props">
                                        <a :href="props.row.url" style="vertical-align: middle;">{{ props.row.name }}</a>
                                    </b-table-column>
                                    <b-table-column label="abbreviation" v-slot="props">
                                        {{ props.row.abbreviation }}
                                    </b-table-column>
                                    <b-table-column label="url" v-slot="props">
                                        {{ props.row.url }}
                                    </b-table-column>
                                    <b-table-column label="logoUrl" v-slot="props">
                                        <b-image
                                            :src="props.row.logoUrl"
                                            style="width: 2rem; height: auto; vertical-align: middle;"
                                        ></b-image>
                                        {{ props.row.logoUrl }}
                                    </b-table-column>
                                    <b-table-column field="style" label="Style" v-slot="props">
                                        <b-tag rounded>
                                            {{ props.row.style }}
                                        </b-tag>
                                    </b-table-column>
                                    <b-table-column field="shippingOrigin" label="Shipping Origin" v-slot="props">
                                        {{ props.row.shippingOrigin }}
                                    </b-table-column>
                                    <b-table-column label="knownFor" v-slot="props">
                                        <template v-for="kf in props.row.knownFor">
                                            <b-tag :key="kf" rounded>{{ kf }}</b-tag>
                                        </template>
                                    </b-table-column>
                                    <b-table-column label="productTypes" v-slot="props">
                                        <template v-for="type in props.row.productTypes">
                                            <b-tag :key="type" rounded>{{ type }}</b-tag>
                                        </template>
                                    </b-table-column>
                                    <b-table-column field="description" label="Description" v-slot="props">
                                        {{ props.row.description }}
                                    </b-table-column>
                                </b-table>
                            </div>
                        </div>
                    </b-collapse>
                </div>
            </div>
        </b-modal>
    </section>
</template>
<script>
import gql from 'graphql-tag'

export default {
    name: 'DBPanel',
    components: {
    },
    data() {
        return {
            DBPanelActive: false,
            reviews_columns: [
                {
                    field: "id",
                    label: "id"
                },
                {
                    field: "reviewer_name",
                    label: "reviewer_name"
                },
                {
                    field: "vendor_name",
                    label: "vendor_name"
                },
                {
                    field: "review_body",
                    label: "review_body"
                },
                {
                    field: "likes",
                    label: "likes"
                },
                {
                    field: "dislikes",
                    label: "dislikes"
                },
                {
                    field: "review_date",
                    label: "review_date"
                }
            ]
        }
    },
    apollo: {
        allreviews: {
            query: gql`
            query {
                allreviews {
                    id
                    reviewer_name
                    vendor_name
                    review_date
                    review_body
                    likes
                    dislikes
                }
            }`
        },
        vendors: {
            query: gql`
            query {
                vendors {
                    id, name, abbreviation, url,
                    logoUrl, shippingOrigin,
                    style, description, offersSamples, knownFor,
                    productTypes
                }
            }`
        },
        distinctShippingOrigins: {
            query: gql`
            query {
                distinctShippingOrigins   
            }`
        },
        distinctProductTypes: {
            query: gql`
            query {
                distinctProductTypes
            }
            `
        }
    },
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