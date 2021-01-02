<template>
    <div>
        <b-field label="Search For Products">
            <b-taginput
                v-model="tags"
                :data="filteredTags"
                autocomplete
                field="product.type"
                icon="label"
                placeholder="Search for tea types or products. For Example: Pu Erh, or Yixing Pots"
                @typing="getFilteredTags">

            </b-taginput>
        </b-field>
        <!--
        <div class="columns">
            <div class="column">
                <div class="field">
                    <b-checkbox>Teaware</b-checkbox>
                </div>
                <div style="margin-left: 2rem;">
                    <div class="field">
                        <b-checkbox>Gaiwan</b-checkbox>
                    </div>
                    <div class="field">
                        <b-checkbox>Pot</b-checkbox>
                    </div>
                    <div class="field">
                        <b-checkbox>Kyusu</b-checkbox>
                    </div>
                    <div class="field">
                        <b-checkbox>Cup</b-checkbox>
                    </div>
                    <div class="field">
                        <b-checkbox>Cha Hai/ Gong Dao Bei</b-checkbox>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <b-checkbox>Tea</b-checkbox>
                </div>
                <div style="margin-left: 2rem;">
                    <div class="field">
                        <b-checkbox>Hei Cha</b-checkbox>
                    </div>
                    <div class="field">
                        <b-checkbox>Green</b-checkbox>
                    </div>
                    <div class="field">
                        <b-checkbox>White</b-checkbox>
                    </div>
                    <div class="field">
                        <b-checkbox>Pu Erh</b-checkbox>
                    </div>
                    <div class="field">
                        <b-checkbox>Black</b-checkbox>
                    </div>
                    <div class="field">
                        <b-checkbox>Oolong</b-checkbox>
                    </div>
                    <div class="field">
                        <b-checkbox>Yellow</b-checkbox>
                    </div>
                </div>
            </div>
        </div>
        -->
    </div>
</template>
<script>
export default {
    name: 'Filters'
}
</script>