<template>
    <div class="home" style="padding-top: 1em;">
        <!--
        <fortune-wheel style="width:800px" :canvas="canvas_options" :prizes="entities" :useWeight="true"/>
        -->
        <v-row>
            <v-col align="center">
                <v-container class="width-100">
                    <v-btn @click="spin_entities" color="primary"> Spin! </v-btn>
                </v-container>
                <vue-winwheel :segments="entities" :width="400" :height="400" :outer-radius="200" ref="entities" :canvasId="'winwheel-entities'" :font-size="10" :callback="cb_entity"/>
                <div> {{complaint.entity}} </div>
            </v-col>
            <v-col align="center">
                <v-container class="width-100">
                    <v-btn @click="spin_problems" color="primary"> Spin! </v-btn>
                </v-container>
                <vue-winwheel :segments="problems" :width="400" :height="400" :outer-radius="200" ref="problems" :canvasId="'winwheel-problems'" :font-size="10" :callback="cb_problem"/>
                <div> {{complaint.problem}} </div>
            </v-col>
            <v-col align="center">
                <v-container class="width-100">
                    <v-btn @click="spin_reasons" color="primary"> Spin! </v-btn>
                </v-container>
                <vue-winwheel :segments="reasons" :width="400" :height="400" :outer-radius="200" ref="reasons" :canvasId="'winwheel-reasons'" :font-size="10" :callback="cb_reason"/>
                <div> {{complaint.reason}} </div>
            </v-col>
        </v-row>
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
    </div>
</template>

<script>
    // @ is an alias to /src
    import FortuneWheel from 'vue-fortune-wheel';
    import 'vue-fortune-wheel/lib/vue-fortune-wheel.css';

    import VueWinwheel from '@/components/vue-winwheel';

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
    const entities = [
        "The AEC",
        "Leonardo Puglisi",
        "Dan Andrews",
        "The ABC",
        "The Greens party",
        "The Labor party",
        "The Guardian",
        "Pfizer",
        "Moderna",
        "AstraZeneca",
        "The Unofficial Chaser Discord Server",
        "The Great Mouse Plague of 2021",
        "The Chaser",
        "The Shovel",
        "The Betoota Advocate",
        "Antony Green",
    ];
    const problems = [
        "right wing",
        "problematic",
        "a liberal front",
        "run by a Lib/Nat staffer",
        "generally crap",
        "even worse than the LNP",
        "not even slightly impartial",
        "a front for Nazis",
        "perpetuating cancel culture",
        "spreading fake news",
    ];
    const reasons = [
        "I'm secretly a Nazi",
        "they criticised Labor",
        "they criticised Albo",
        "PRGuy said so",
        "my friend's cousins ballsack tripled in size",
        "they're pink",
        "they steal votes from Labor",
        "they dared remind us that preferential voting exists",
        "they're a loaf of milk",
        "a fact check hurt my fee fees",
        "the UAP showed me the truth",
        "the frogs turned gay",
        "they need to smile more",
        "we don't have free RATs",
        "they defamed me on Twitter",
        "I couldn't purchase soft serve today",
        "I sent a spicy text message",
        "the milkshake did not consent",
        "they went woke",
        "they fondled a lump of coal",
        "they texted me like a cringy ex",
        "they are a Rupert Murdoch simp",
    ];
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
            FortuneWheel,
            VueWinwheel,
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
            entities: generate_prize_list(entities),
            problems: generate_prize_list(problems),
            reasons: generate_prize_list(reasons),
            complaint: {
                entity: '',
                problem: '',
                reason: '',
            }
        }),
        computed: {
            show_complaint() {
                return !!this.complaint.entity && !!this.complaint.problem && !!this.complaint.reason;
            },
            complaint_text() {
                return `${this.complaint.entity} is ${this.complaint.problem} because ${this.complaint.reason}`;
            }
        },
        methods: {
            generate_prize() {
                const entity = this.entities[Math.floor(Math.random()*this.entities.length)].name;
                const problem = this.problems[Math.floor(Math.random()*this.problems.length)].name;
                const reason = this.reasons[Math.floor(Math.random()*this.reasons.length)].name;
                alert(`${entity} is ${problem} because ${reason}`);
            },
            wheel_spun(params){
                alert(params);
            },
            spin_entities() {
                this.$refs.entities.startSpin();
            },
            spin_problems() {
                this.$refs.problems.startSpin();
            },
            spin_reasons() {
                this.$refs.reasons.startSpin();
            },
            cb_entity(entity) {
                this.complaint.entity = entity;
            },
            cb_problem(problem) {
                this.complaint.problem = problem;
            },
            cb_reason(reason) {
                this.complaint.reason = reason;
            },
            show_share(){
                this.show_share_dialog = true;
            },
            async copy_complaint() {
                try {
                    await navigator.clipboard.writeText(this.complaint_text);// + '\nCreate your own lies at https://political-spin.netlify.app/');
                    this.show_notification = true;
                    this.notification_text = 'Copied to clipboard!';
                } catch(e) {
                    this.show_notification = true;
                    this.notification_text = 'Error copying text';
                    console.log(e);
                }
            },
            async share_facebook(){

            }

        }
    }
</script>
