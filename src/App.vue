<template>
    <v-app>
        <v-app-bar app :color="bar_color" dark @click="set_tagline">
            <div class="d-flex align-center" >
                <v-img alt="Vuetify Logo" class="shrink mr-2" contain :src="require('./assets/spinny.png')" transition="scale-transition" width="40"/>
                <span class="text-h4"> Political Spinner! </span>
                <span class="text-subtitle pl-4" v-if="!$vuetify.breakpoint.mobile">
                    {{tagline}}
                </span>
            </div>
                <v-spacer></v-spacer>
                <template v-if="!$vuetify.breakpoint.mobile">
                    <template v-if="show_control_toggle">
                        <v-btn text :to="colour_destination"> Colours </v-btn>
                    </template>
                    <v-btn text to="/" class="white--text"> Spinners </v-btn>
                    <v-btn text to="/slots" class="white--text"> Slots </v-btn>
                    <v-btn text to="/about" class="white--text"> About </v-btn>
                </template>
            <template v-slot:extension v-if="$vuetify.breakpoint.mobile"> 
                <v-row class="text-center">
                    <v-col>
                        <v-btn text to="/" class="white--text"> Spinners </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn text to="/slots" class="white--text"> Slots </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn text to="/about" class="white--text"> About </v-btn>
                    </v-col>
                </v-row>
            </template>
        </v-app-bar>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>
<style>
    @font-face {
        font-family: 'Univers LT 47 CondensedLt';
        src: url('/assets/UniversLT-CondensedBold.woff2') format('woff2'),
            url('/assets/UniversLT-CondensedBold.woff') format('woff');
        font-weight: bold;
        font-style: normal;
        font-display: swap;
    }

</style>
<script>
    import data from './wheel-data.js';
    import analytics from './analytics.js';
    import {get_app_bar,set_app_bar_listener} from './new-colours';
    export default {
        name: 'App',

        data: () => ({
            taglines:[],
            tagline:'',
            bar_color: get_app_bar(),
        }),
        created(){
            this.taglines = data.get_taglines();
            this.set_tagline();
            set_app_bar_listener(this.set_bar_colour);
            console.log(this);
        },
        methods: {
            set_tagline(){
                this.tagline = this.taglines[Math.floor(Math.random()*this.taglines.length)];
                analytics.header_clicked();
            },
            set_bar_colour(nc){
                this.bar_color = nc;
            },
            toggle_controls(){
                if (this.$route.query.controls) {
                    this.$router.push('/colours?controls=1',()=>{})
                } else {
                    this.$router.push('/colours?controls=0',()=>{})
                }
            },
        },
        computed: {
            show_control_toggle(){
                return this.$router.currentRoute.path=='/colours';
            },
            colour_destination(){
                if (this.$route.query.controls == '0') {
                    return '/colours?controls=1';
                } else {
                    return '/colours?controls=0';
                }
            },
        }
    };
</script>
