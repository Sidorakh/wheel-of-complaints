<template>
    <v-container class="about">
        <div class="text-h4"> What is this thing? </div>
        <div class="py-4 pl-4">
            After seeing the latest Twitter drama, we joked that someone
            was just spinning wheels to determine the latest outrage. Then
            we made the wheels. 
        </div>
        <div class="text-h4"> How about some testimonials? </div>
        <div class="pl-4 py-4">
            <v-row>
                <template v-for="(testimonial,i) of testimonials">
                    <v-col cols="6" md="4" :key="'testimonial-+i'">
                        <figure>
                            <blockquote>
                                &ldquo;{{testimonial.quote}}&rdquo;
                            </blockquote>
                            <figcaption>
                                &mdash; {{testimonial.by}}
                            </figcaption>
                        </figure>
                    </v-col>
                </template>
            </v-row>
        </div>
        <div class="text-h4"> Who even built this anyway? </div>
        <div class="py-4">
            <v-list>
                <v-list-item three-line v-for="(person,i) of credits" :key="'person-'+i">
                    <v-list-item-content>
                        <v-list-item-title> {{person.name}} </v-list-item-title>
                        <v-list-item-subtitle> {{person.for}} </v-list-item-subtitle>
                        <v-list-item-subtitle> 
                            <template v-for="(link,j) of person.links">
                                <a :key="'link-'+i+'-'+j" :href="link.url" target="_blank" class="icon-link px-1">
                                    <v-icon> mdi-{{link.type}}</v-icon>
                                </a>
                            </template>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </div>
    </v-container>
</template>
<script> 
    export default {
        name: 'About',
        data:()=>({
            credits: [
                {
                    name: 'Andrew "Sidorakh" Rutherford',
                    for: 'Writing the damn thing',
                    links: [
                        {
                            url: 'https://twitter.com/Sidorakh',
                            type: 'twitter'
                        },
                        {
                            url: 'https://sidorakh.net',
                            type: 'link'
                        }
                    ]
                },
                {
                    name: 'A piece of non-binary candy',
                    for: 'Being the right kind of bad influence this project required',
                    links:[],
                },
                {
                    name: 'Cowsy',
                    for: 'About half the ideas thanks to her otherwise mindless tractor squircles',
                    links: [],
                },
                {
                    name: 'Grae Hall',
                    for: 'Helping make this look less godawful',
                    links: [
                        {
                            url: 'https://twitter.com/HallGrae',
                            type: 'twitter'
                        }
                    ]
                }
            ],
            testimonials: [
                {
                    quote: 'This is weirdly hypnotic and great',
                    by: 'James Schloeffel, The Shovel',
                },
            ]
        })
    }
</script>
<style scoped>
    .icon-link {
        text-decoration: none;
    }
</style>