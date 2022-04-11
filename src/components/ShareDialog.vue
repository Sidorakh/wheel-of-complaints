<template>
    <v-container>
        <div v-if="show_complaint" class="text-h2" align="center">
            <div>
                <span class="d-sr-only">Result: </span>{{message}} 
            </div>
            <v-tooltip top>
                <template v-slot:activator="{on,attrs}">
                    <v-btn v-bind="attrs" v-on="on" @click="copy_complaint" icon target="_blank">
                        <v-icon> mdi-content-copy </v-icon>
                        <span class="d-sr-only"> Copy to Clipboard </span>
                    </v-btn>
                </template>
                <span>
                    Copy to Clipboard
                </span>
            </v-tooltip>
            <v-tooltip top>
                <template v-slot:activator="{on,attrs}">
                    <v-btn v-bind="attrs" v-on="on" @click="twitter_share" icon target="_blank">
                        <v-icon> mdi-twitter </v-icon>
                        <span class="d-sr-only"> Tweet this </span>
                    </v-btn>
                </template>
                <span>
                    Tweet this
                </span>
            </v-tooltip>
            <v-tooltip top>
                <template v-slot:activator="{on,attrs}">
                    <v-btn v-bind="attrs" v-on="on" icon @click="facebook_share">
                        <v-icon> mdi-facebook </v-icon>
                        <span class="d-sr-only"> Share this on Facebook </span>
                    </v-btn>
                </template>
                <span>
                    Share this on Facebook
                </span>
            </v-tooltip>
            <!--
            <v-tooltip top>
                <template v-slot:activator="{on,attrs}">
                    <v-btn icon @click="open_share_dialog" v-bind="attrs" v-on="on"> <v-icon> mdi-share </v-icon> </v-btn>
                </template>
                <span> Share </span>
            </v-tooltip>
            -->
        </div>
        <v-dialog v-model="show_basic_share_dialog" max-width="600">
            <v-card>
                <v-card-title>
                    Share this hot take?
                </v-card-title>
                <v-card-text>
                    {{message}}
                </v-card-text>
                <v-card-actions>
                    <v-tooltip top>
                        <template v-slot:activator="{on,attrs}">
                            <v-btn v-bind="attrs" v-on="on" @click="copy_complaint" icon target="_blank">
                                <v-icon> mdi-content-copy </v-icon>
                            </v-btn>
                        </template>
                        <span>
                            Copy to Clipboard
                        </span>
                    </v-tooltip>
                    <v-tooltip top>
                        <template v-slot:activator="{on,attrs}">
                            <v-btn v-bind="attrs" v-on="on" icon target="_blank" @click="twitter_share">
                                <v-icon> mdi-twitter </v-icon>
                            </v-btn>
                        </template>
                        <span>
                            Tweet this
                        </span>
                    </v-tooltip>
                    <v-tooltip top>
                        <template v-slot:activator="{on,attrs}">
                            <v-btn v-bind="attrs" v-on="on" icon @click="facebook_share">
                                <v-icon> mdi-facebook </v-icon>
                            </v-btn>
                        </template>
                        <span>
                            Share this on Facebook
                        </span>
                    </v-tooltip>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="show_notification" :timeout="5000">
            {{notification_text}}
        </v-snackbar>
    </v-container>
</template>

<script>
    import analytics from '../analytics';
    export default {
        name: 'ShareDialog',
        created(){
            console.log(this.$router);
        },
        props: {
            message: {
                type: String,
                default: 'No message provided',
            },
            show_complaint: {
                type: Boolean,
                default: true,
            },
            tagline: {
                type: String,
                default: 'Spin your own truth with {URL}',
            },
            url: {
                type: String,
                default: 'https://politicalspinner.com'
            }
        },
        data:()=>({
            show_basic_share_dialog: false,
            notification_text:'',
            show_notification:false,
        }),
        methods: {
            twitter_share() {
                analytics.record_share('twitter');
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(this.complaint_text())}&hashtags=auspolspin`,'_blank');
            },
            facebook_share() {
                analytics.record_share('facebook');
                const share_url = `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fpolitical-spin.netlify.app&title=Political%20Spin&quote=${this.complaint_text()}&hashtag=%23auspolspin`;
                // const share_url = `https://www.facebook.com/dialog/feed?&app_id=1209310536142969&link=https%3A%2F%2Fpolitical-spin.netlify.app&display=popup&quote=${this.complaint_text()}`;
                window.open(share_url,'_blank','menubar=no,width=500,height=500')
            },
            complaint_text(){
                return '"' + this.message + '". \n\n' + this.tagline.replace('{URL}',this.url);//'\n\nSpin your own truth with https://political-spin.netlify.app';
            },
            async open_share_dialog(){
                // if ('share' in navigator) {
                //     await navigator.share({
                //         title: 'Political Spin',
                //         text: this.message + '\n\nCreate your own lies at https://political-spin.netlify.app'
                //     });
                // } else {
                    this.show_basic_share_dialog = true;
                // }
            },
            async copy_complaint() {
                analytics.record_share('clipboard');
                try {
                    await navigator.clipboard.writeText(this.complaint_text());// + '\nCreate your own lies at https://political-spin.netlify.app/');
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
