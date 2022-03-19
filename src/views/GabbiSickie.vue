<template>
    <div class="home" style="padding-top: 1em;">
        <span class="d-sr-only"> This is an app that generates fake headlines from three chunks of political-related things. Each wheel can be spun indiviudally, or all at once. </span>
        <v-row>
            <v-col align="center">
                <vue-winwheel :segments="events" :width="400" :height="400" :outer-radius="200" ref="events" :canvasId="'winwheel-events'" :font-size="10" :callback="cb_event"/>
                <div> <span class="d-sr-only">Spin result: </span> {{complaint.event}} </div>
            </v-col>
            <v-col align="center">
                <vue-winwheel :segments="excuses" :width="400" :height="400" :outer-radius="200" ref="excuses" :canvasId="'winwheel-excuses'" :font-size="10" :callback="cb_excuse"/>
                <div> <span class="d-sr-only">Spin result: </span> {{complaint.excuse}} </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col align="center">
                <v-btn @click="spin_events();spin_excuses();" color="primary" class="pa-8">
                    <div class="text-h4">
                        <b>Spin!</b>
                    </div>
                </v-btn>
            </v-col>
        </v-row>
        <share-dialog :message="complaint_text" :show_complaint="show_complaint" tagline="Create some more excuses for Gabbi at {URL}"/>
        <!--
            <div v-if="show_complaint" align="center" class="text-h2 px-4">
                {{complaint_text}}
                <v-tooltip top>
                    <template v-slot:activator="{on,attrs}">
                        <v-btn icon @click="show_share_dialog=true" v-bind="attrs" v-on="on"> <v-icon> mdi-share </v-icon> </v-btn>
                    </template>
                    <span> Share </span>
                </v-tooltip>
            </div>
            <v-snackbar v-model="show_notification" :timeout="5000">
                {{notification_text}}
            </v-snackbar>
            <v-dialog v-model="show_share_dialog" max-width="600">
                <v-card>
                    <v-card-title>
                        Share this hot take?
                    </v-card-title>
                    <v-card-text>
                        {{complaint_text}}
                    </v-card-text>
                    <v-card-actions>
                        <v-tooltip top>
                            <template v-slot:activator="{on,attrs}">
                                <v-btn @click="copy_complaint" icon target="_blank">
                                    <v-icon> mdi-content-copy </v-icon>
                                </v-btn>
                            </template>
                            <span>
                                Copy to Clipboard
                            </span>
                        </v-tooltip>
                        <v-tooltip top>
                            <template v-slot:activator="{on,attrs}">
                                <v-btn :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(complaint_text + '\nCreate your own lies at ')}&url=${encodeURIComponent('https://political-spin.netlify.app/')}`" icon target="_blank">
                                    <v-icon> mdi-twitter </v-icon>
                                </v-btn>
                            </template>
                            <span>
                                Tweet this
                            </span>
                        </v-tooltip>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        -->
    </div>
</template>

<script>
    // @ is an alias to /src

    import VueWinwheel from '@/components/vue-winwheel';
    import ShareDialog from '../components/ShareDialog.vue';
    import data from '../wheel-data.js';
    import analytics from '../analytics.js';

    const palette = [
        //"#383F51",
        //"#BF1A2F",
        //"#5398BE",
        //"#646F4B",
        //"#582244",
        "#0A2463",
        "#CC001B",
        "#388D16",
    ];
    const entities = data.get_entities(12);
    const events = data.get_events(9);
    const excuses = data.get_excuses(9);
    function generate_prize_list(array) {
        let prizes = []
        for (let i=0;i<array.length;i++) {
            prizes.push({
                name: array[i],
                bgColor: palette[i % (palette.length)],
                color: '#fff',
                weight: 10,
                probaility:10,
                text: array[i],
                textFillStyle: "#fff",
                fillStyle: palette[i % palette.length],
            });
        }
        return prizes;
    }

    export default {
        name: 'Home',
        components: {
            VueWinwheel,
            ShareDialog,
        },
        data:()=>({
            show_share_dialog:false,
            show_notification:false,
            notification_text:'',
            canvas_options: {
                borderWidth: 6,
                borderColor: "#0e1821",
                fontSize: 10,
                textDirection: 'horizontal',
            },
            events: generate_prize_list(events),
            excuses: generate_prize_list(excuses),
            complaint: {
                event:'',
                excuse:'',
            }
        }),
        computed: {
            show_complaint() {
                return !!this.complaint.event && !!this.complaint.excuse;
            },
            complaint_text() {
                return `Gabbi can't make it to ${this.complaint.event} because ${this.complaint.excuse}`;
            }
        },
        methods: {
            spin_events() {
                this.$refs.events.startSpin();
            },
            spin_excuses() {
                this.$refs.excuses.startSpin();
            },
            cb_event(event) {
                this.complaint.event = event;
                analytics.record_item(event,'event');
            },
            cb_excuse(excuse) {
                this.complaint.excuse = excuse;
                analytics.record_item(excuse,'excuses');
            },
            show_share(){
                this.show_share_dialog = true;
            },
            async copy_complaint() {
                try {
                    await navigator.clipboard.writeText(this.complaint_text);// + '\nHelp Gabbi chuck another sickie at https://political-spin.netlify.app/#/sickie');
                    this.show_notification = true;
                    this.notification_text = 'Copied to clipboard!';
                } catch(e) {
                    this.show_notification = true;
                    this.notification_text = 'Error copying text';
                    console.log(e);
                }
            },
        }
    }
</script>
