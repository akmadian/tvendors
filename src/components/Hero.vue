<template>
    <section class="hero">
        <div class="hero-body">
            <div class="columns">
                <div class="column">
                    <div class="container">
                        <h1 class="title">tvendors</h1>
                        <h2 class="subtitle">Looking for a specific type of product but not sure where to get it from? Use tvendors.</h2>
                        <div>
                            <b-button tag="a" href="https://forms.gle/MSkFQr1g7kNTfTwr9">Can't Find a Vendor? Let us Know!</b-button>
                            <br/><br/>
                        </div>
                        <div>
                            <b-button tag="a" href="https://github.com/akmadian/tvendors" size="is-small" style="margin-right: 1rem;">
                                <img src="../assets/github.png" 
                                 style="height: 1.1rem; width: auto; vertical-align: middle; display: inline;"> 
                                 <p style="vertical-align: middle; display: inline; margin-left: .5rem;">
                                    tvendors is open source
                                 </p>
                            </b-button>
                            <b-button tag="a" href="https://discord.gg/qeGMFjvg5D" size="is-small">
                                 <img src="../assets/discord.png" 
                                 style="height: 1.3rem; width: auto; vertical-align: middle; display: inline;"> 
                                 <p style="vertical-align: middle; display: inline; margin-left: .5rem;">
                                    Looking for CommuniTEA? Join the r/tea Discord server!
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

export default {
    name: 'Hero'
}
</script>