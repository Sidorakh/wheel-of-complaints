<template>
    <v-container>
        <v-virtual-scroll :height="height" :item-height="itemHeight" :items="items">
            <template v-slot:default="{item}">
                <v-list-item>
                    <slot v-bind:item="item">
                        {{item}}
                    </slot>
                </v-list-item>
            </template>
        </v-virtual-scroll>
    </v-container>
</template>
<script>
    export default {
        name: 'Slot',
        props: {
            items: {
                type: Array,
                default: [],
            },
            itemHeight: {
                type: Number,
                default: 20,
            },
            height: {
                type: Number,
                default:100,
            }
        }
    }
</script>