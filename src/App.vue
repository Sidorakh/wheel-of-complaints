<template>
    <v-app>
        <v-app-bar app color="primary" dark @click="set_tagline">
            <div class="d-flex align-center" >
                <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40"/>
                <span class="text-h4"> Political Spin! </span>
                <span class="text-subtitle pl-4" v-if="!$vuetify.breakpoint.mobile">
                    {{tagline}}
                </span>
            </div>
                <v-spacer></v-spacer>
                <template v-if="!$vuetify.breakpoint.mobile">
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

<script>
    import data from './wheel-data.js';
    import analytics from './analytics.js';
    export default {
        name: 'App',

        data: () => ({
            taglines:[],
            tagline:'',
        }),
        created(){
            this.taglines = data.get_taglines();
            this.set_tagline();
        },
        methods: {
            set_tagline(){
                this.tagline = this.taglines[Math.floor(Math.random()*this.taglines.length)];
                analytics.header_clicked();
            },
        }
    };
</script>
