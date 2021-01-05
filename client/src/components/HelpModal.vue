<template>
    <section>
        <b-button
            @click="helpModalActive = true">
            Not sure how to use tvendors? Click here.
        </b-button>
        <b-modal v-model="helpModalActive">
            <div class="card">
                <div class="card-content">
                    <h1 class="is-size-3">How to use tvendors</h1>
                    <hr/>
                    <b>Searching</b>
                    <p>
                        You can type search terms into the "Search For Products" field. Search terms might be something like "Yixing", or "Gaiwan", or "Hei Cha".
                        The search functionality only has so much granularity. For example, if you want a Yixing pot, tvendors can find sites that sell Yixing pots.
                        However, if you want a specific shape, for example, a Shui Ping Yixing pot, tvendors will not work for this since it doesn't track the specific
                        shapes that sites stock.
                    </p>
                    <br>
                    <p>
                        Levels of specificity that are beyond tvendors' capability may include search terms such as:
                        <ul>
                            <li> - Dayi Shou</li>
                            <li> - Shui Ping Pot</li>
                            <li> - Porcelain Gaiwan</li>
                        </ul>
                    </p>
                    <br>
                    <p>
                        Once you enter some search terms, tvendors will filter the list of vendors to show only the vendors that generally carry the
                        product that you searched for. Whether or not that product will actually be in stock is another thing. The data that tvendors
                        uses may be outdated occasionally. For example, if you search for "Luffa Pads" for a pot, some vendors may be shown that used
                        to carry luffa pads, but don't anymore. If this happens, please let me know!
                    </p>
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
            helpModalActive: false
        }
    }
}
</script>