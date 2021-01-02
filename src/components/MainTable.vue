<template>
    <b-table :data=data>
        <template v-for="column in columns">
            <b-table-column :key="column.id" v-bind="column">
                <template
                    v-if="column.searchable && !column.numeric"
                    slot="searchable"
                    slot-scope="props">
                    <b-input 
                        v-model="props.filters[props.column.field]"
                        placeholder="Search..."
                        icon="Magnify"
                        size="is-small"
                    />
                </template>
                <template v-slot="props">
                    {{ props.row[column.field] }}
                </template>
            </b-table-column>
        </template>
    </b-table>
</template>
<script>
export default {
    name: 'MainTable',
    data() {
        return {
            data: [
                {
                    "name": "White2Tea",
                    "id": "white2tea",
                    "url": "https://white2tea.com/",
                    "logoUrl": "",
                    "shippingOrigin": "China",
                    "productTypes": [
                        "Teaware",
                        "Tea",
                        "Shou",
                        "Sheng",
                        "Black",
                        "Oolong",
                        "White"
                    ]
                },
                {
                    "name": "Yunnan Sourcing",
                    "id": "yunnansourcing",
                    "url": "https://yunnansourcing.com/",
                    "logoUrl": "",
                    "shippingOrigin": "China",
                    "productTypes": [
                        "Teaware",
                        "Yixing",
                        "Tea",
                        "Shou",
                        "Sheng",
                        "Black",
                        "Oolong",
                        "White",
                        "Green"
                    ]
                },
                {
                    "name": "Crimson Lotus",
                    "id": "crimsonlotus",
                    "url": "https://crimsonlotustea.com/",
                    "logoUrl": "",
                    "shippingOrigin": "China",
                    "productTypes": [
                        "Teaware",
                        "Tea",
                        "Shou",
                        "Sheng",
                    ]
                }
            ],
            columns: [
                {
                    field: 'name',
                    label: 'Name'
                },
                {
                    field: 'shippingOrigin',
                    label: 'Shipping Origin',
                    searchable: true
                },
                {
                    field: 'productTypes',
                    label: 'Product Types',
                    searchable: true
                }
            ]
        }
    }
}
</script>