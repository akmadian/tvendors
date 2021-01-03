<template>
    <section class="hero">
        <div class="hero-body" id="hero">
            <div class="columns">
                <div class="column">
                    <div class="container">
                        <h1 class="title">tvendors</h1>
                        <h2 class="subtitle">Looking for a specific type of product but not sure where to get it from? Use tvendors.</h2>
                            <div class="columns">
                                <div class="column is-narrow">
                                    <b-button tag="a" href="https://forms.gle/MSkFQr1g7kNTfTwr9">
                                        Can't Find a Vendor? Let us Know!
                                    </b-button>
                                </div>
                                <div class="column">
                                    <HelpModal />
                                </div>
                            </div>
                        <div>
                            <b-button tag="a" href="https://github.com/akmadian/tvendors" size="is-small" style="margin-right: 1rem;">
                                <img src="../assets/github.png" 
                                 style="height: 1.1rem; width: auto; vertical-align: middle; display: inline;"> 
                                 <p style="vertical-align: middle; display: inline; margin-left: .5rem;">
                                    tvendors is open source
                                 </p>
                            </b-button>
                            <b-button tag="a" href="https://discord.gg/tea" size="is-small">
                                 <img src="../assets/discord.png" 
                                 style="height: 1.3rem; width: auto; vertical-align: middle; display: inline;"> 
                                 <p style="vertical-align: middle; display: inline; margin-left: .5rem;">
                                    Join the CommuniTEA Discord server!
                                 </p>
                            </b-button>
                        </div>
                    </div>
                </div>
                <div class="column is-narrow" style="font-size: 5rem;">
                    ☕
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import HelpModal from './HelpModal'

export default {
    name: 'Hero',
    components: {
        HelpModal
    }
}
</script>
<style>
    #hero {
        border-radius: 20px;
        box-shadow: 
            8px 8px 16px rgba(0, 0, 0, 0.2), 
            -6px -6px 14px rgba(200, 200, 200, 0.3);
        margin-bottom: 2rem;
        margin-top: 2rem;
    }
</style>