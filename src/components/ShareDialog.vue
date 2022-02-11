<template>
    <v-container>
        <div v-if="show_complaint" class="text-h2" align="center">
            {{message}} 
            <v-tooltip top>
                <template v-slot:activator="{on,attrs}">
                    <v-btn icon @click="open_share_dialog" v-bind="attrs" v-on="on"> <v-icon> mdi-share </v-icon> </v-btn>
                </template>
                <span> Share </span>
            </v-tooltip>
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
        <v-snackbar v-model="show_notification" :timeout="5000">
            {{notification_text}}
        </v-snackbar>
    </v-container>
</template>

<script>
    export default {
        name: 'ShareDialog',
        props: {
            message: {
                type: String,
                default: 'No message provided'
            },
            show_complaint: {
                type: Boolean,
                default: true,
            },
        },
        data:()=>({
            show_basic_share_dialog: false,
            notiication_text:'',
            show_notification:false,
        }),
        methods: {
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
                try {
                    await navigator.clipboard.writeText(this.message + '\nCreate your own lies at https://political-spin.netlify.app');// + '\nCreate your own lies at https://political-spin.netlify.app/');
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
