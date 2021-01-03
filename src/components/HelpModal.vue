<template>
    <section>
        <b-button
            @click="isHelpModalActive = true">
            Not sure how to use tvendors? Click here.
        </b-button>
        <b-modal v-model="isHelpModalActive">
            <div class="card">
                <div class="card-content">
                    <h1 class="is-size-4">How to use tvendors</h1>
                </div>
            </div>
        </b-modal>
    </section>
</template>
<script>
export default {
    name: 'HelpModal',
    data() {
        return {
            isHelpModalActive: false
        }
    }
}
</script>