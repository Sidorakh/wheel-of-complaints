<template>
    <div class="home" style="padding-top: 1em;">
        <span class="d-sr-only"> This is an app that generates fake headlines from three vaguely political things. Each wheel can be spun indiviudally, or all at once. </span>
        <v-row>
            <template v-if="show_controls">
                <v-col align="center" cols="12">
                    <v-menu offset-y>
                        <template v-slot:activator="{on,attrs}">
                            <v-btn v-bind="attrs" v-on="on">
                                <v-icon :color="app_bar">mdi-circle</v-icon>{{app_bar}}
                            </v-btn>
                        </template>
                        <v-color-picker class="ma-2" v-model="app_bar"/>
                    </v-menu>
                </v-col>
                <v-col align="center">
                    <v-menu offset-y>
                        <template v-slot:activator="{on,attrs}">
                            <v-btn v-bind="attrs" v-on="on">
                                <v-icon :color="wheel_1">mdi-circle</v-icon>{{wheel_1}}
                            </v-btn>
                        </template>
                        <v-color-picker class="ma-2" v-model="wheel_1"/>
                    </v-menu>
                </v-col>
                <v-col align="center">
                    <v-menu offset-y>
                        <template v-slot:activator="{on,attrs}">
                            <v-btn v-bind="attrs" v-on="on">
                                <v-icon :color="wheel_2">mdi-circle</v-icon>{{wheel_2}}
                            </v-btn>
                        </template>
                        <v-color-picker class="ma-2" v-model="wheel_2"/>
                    </v-menu>
                </v-col>
                <v-col align="center">
                    <v-menu offset-y>
                        <template v-slot:activator="{on,attrs}">
                            <v-btn v-bind="attrs" v-on="on">
                                <v-icon :color="wheel_3">mdi-circle</v-icon>{{wheel_3}}
                            </v-btn>
                        </template>
                        <v-color-picker class="ma-2" v-model="wheel_3"/>
                    </v-menu>
                </v-col>
                <v-col cols="12" align="center">
                    <v-btn @click="setup"> Update spinners </v-btn>
                </v-col>
            </template>
        </v-row>
        <v-row>
            <v-col align="center">
                <vue-winwheel :segments="entities" :width="400" :height="400" :outer-radius="200" ref="entities" :canvasId="'winwheel-entities'" :font-size="10" :callback="cb_entity"/>
                <div> <span class="d-sr-only">Spin result #1: </span>{{complaint.entity}} </div>
                <v-container class="width-100">
                    <v-btn @click="spin_entities" color="primary"> Spin #1! </v-btn>
                </v-container>
            </v-col>
            <v-col align="center">
                <vue-winwheel :segments="problems" :width="400" :height="400" :outer-radius="200" ref="problems" :canvasId="'winwheel-problems'" :font-size="10" :callback="cb_problem"/>
                <div> <span class="d-sr-only">Spin result #2: </span> {{complaint.problem}} </div>
                <v-container class="width-100">
                    <v-btn @click="spin_problems" color="primary"> Spin #2! </v-btn>
                </v-container>
            </v-col>
            <v-col align="center">
                <vue-winwheel :segments="reasons" :width="400" :height="400" :outer-radius="200" ref="reasons" :canvasId="'winwheel-reasons'" :font-size="10" :callback="cb_reason"/>
                <div> <span class="d-sr-only">Spin result #3: </span> {{complaint.reason}} </div>
                <v-container class="width-100">
                    <v-btn @click="spin_reasons" color="primary"> Spin #3! </v-btn>
                </v-container>
            </v-col>
        </v-row>
        <v-row>
            <v-col align="center">
                <v-btn @click="spin_entities();spin_problems();spin_reasons();" color="primary" class="pa-8">
                    <div class="text-h4">
                        <b>Spin all!</b>
                    </div>
                </v-btn>
            </v-col>
        </v-row>
        <share-dialog :message="complaint_text" :show_complaint="show_complaint"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import * as colours from '../new-colours.js';
    import VueWinwheel from '@/components/vue-winwheel.vue';
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
    const problems = data.get_problems(12);
    const reasons = data.get_reasons(12);
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
            entities: null,//this.generate_prize_list(entities),
            problems: null,//this.generate_prize_list(problems),
            reasons: null,//this.generate_prize_list(reasons),
            complaint: {
                entity: '',
                problem: '',
                reason: '',
            },
            show_controls:false,
            wheel_1: colours.get_wheel_1(),
            wheel_2: colours.get_wheel_2(),
            wheel_3: colours.get_wheel_3(),
            app_bar: colours.get_app_bar(),
        }),
        watch: {
            wheel_1(){
                colours.set_wheel_1(this.wheel_1);
            },
            wheel_2(){
                colours.set_wheel_2(this.wheel_2);
            },
            wheel_3(){
                colours.set_wheel_3(this.wheel_3);
            },
            app_bar() {
                colours.set_app_bar(this.app_bar);
            },
            "$route.query.controls": function(){
                if (this.$route.query.controls == '1') {
                    this.show_controls = true;
                } else {
                    this.show_controls = false;
                }
            }
        },
        created(){
            this.setup();
            if (this.$route.query.controls == '1') {
                this.show_controls = true;
            } else {
                this.show_controls = false;
            }
        },
        computed: {
            show_complaint() {
                return !!this.complaint.entity && !!this.complaint.problem && !!this.complaint.reason;
            },
            complaint_text() {
                return `${this.complaint.entity} is ${this.complaint.problem} because ${this.complaint.reason}`;
            },
        },
        methods: {
            setup(){
                this.entities = this.generate_prize_list(entities);
                this.problems = this.generate_prize_list(problems);
                this.reasons = this.generate_prize_list(reasons);
                // if created/ready to go (hot update)
                console.log(this.$refs);
                if (this.$refs.entities) {
                    this.$refs.entities.rerender();
                    this.$refs.problems.rerender();
                    this.$refs.reasons.rerender();
                }
            },
            generate_prize_list(array){
                const palette = [
                    colours.get_wheel_1(),
                    colours.get_wheel_2(),
                    colours.get_wheel_3(),
                ]
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
            },
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
                analytics.record_item(entity,'entities');
            },
            cb_problem(problem) {
                this.complaint.problem = problem;
                analytics.record_item(problem,'problems');
            },
            cb_reason(reason) {
                this.complaint.reason = reason;
                analytics.record_item(reason,'reasons');
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
        }
    }
</script>
