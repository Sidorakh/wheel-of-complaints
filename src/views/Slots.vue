<template>
    <div class="home" style="padding-top: 1em;">
        <v-container id="slot-container">
            <v-row justify="center" style="overflow-x:hidden">
                <v-col cols="4" class="text-center">
                    <v-virtual-scroll :items="entities" :height="300" :itemHeight="300" :class="reel_classes()" :bench="2" ref="scroller_entities">
                        <template v-slot:default="{item}">
                            <v-list-item :key="item" class="justify-center" :height="300">
                                <v-container class="fill-height align-center justify-center" style="height:300px;">
                                    {{item}}
                                </v-container>
                            </v-list-item>
                        </template>
                    </v-virtual-scroll>
                </v-col>
                <v-col cols="4" class="text-center">
                    <v-virtual-scroll :items="problems" :height="300" :itemHeight="300" :class="reel_classes()" :bench="2" ref="scroller_problems">
                        <template v-slot:default="{item}">
                            <v-list-item :key="item" class="justify-center" :height="300">
                                <v-container class="fill-height align-center justify-center" style="height:300px;">
                                    {{item}}
                                </v-container>
                            </v-list-item>
                        </template>
                    </v-virtual-scroll>
                </v-col>
                <v-col cols="4" class="text-center">
                    <v-virtual-scroll :items="reasons" :height="300" :itemHeight="300" :class="reel_classes()" :bench="2" ref="scroller_reasons">
                        <template v-slot:default="{item}">
                            <v-list-item :key="item" class="justify-center" :height="300">
                                <v-container class="fill-height align-center justify-center" style="height:300px;">
                                    {{item}}
                                </v-container>
                            </v-list-item>
                        </template>
                    </v-virtual-scroll>
                </v-col>
            </v-row>
            <div id="lever" class="mx-auto mt-16" @click="spin" role="button">
                <div id="stick" ref="stick" class=""/>
                <div id="knob" ref="knob" class=""/>
            </div>
        </v-container>
        <share-dialog :message="complaint_text" :show_complaint="show_complaint" url="https://politicalspinner.com/#/slots"/>
    </div>
</template>
<style>
    /* lets hide that scrollbar */
    .scrollbar-hidden::-webkit-scrollbar {
        display: none;
    }

        /* Hide scrollbar for IE, Edge add Firefox */
    .scrollbar-hidden {
        -ms-overflow-style: none;
        scrollbar-width: none; /* Firefox */
    }
    .reel-item {
        padding:0;
        border: 2px solid black;
        box-shadow: inset 0 32px 24px -24px grey, inset 0 -32px 24px -24px grey;
        font-family: 'Univers LT 47 CondensedLt'
    }
    .reel-item-large {
        font-size: 3em;
    }
    .reel-item-mobile {
        font-size: 1em;
    }
    .blur {
        filter: blur(1px);
    }
    #lever {
        position:relative;
        height:10em;
        padding: 0;
        width:4em;
        cursor: pointer;
    }
    #knob {
        position:absolute;
        transform: translate(0,-2em);
        width:4em;
        height:4em;
        background-color: red;
        border-radius:50%;
        z-index:1;
    }
    #stick {
        position:absolute;
        transform:translate(1.6em,0em);
        margin: auto;
        width:0.8em;
        height: 8em;
        background-color:grey;
    }
    .animate-knob {
        animation: .5s 1 alternate yankknob;
    }
    .animate-stick {
        animation: .5s 1 alternate yankstick;
    }
    @keyframes yankknob {
        0% {
        transform: translate(0,-2em);
        }
        50% {
            transform: translate(0,3em);
        }
        100% {
        transform: translate(0,-2em);
        }
    }
    @keyframes yankstick {
        0% {
            height:8em;
            transform: translate(1.6em,0em);
        }
        50% {
            height:3em;
            transform: translate(1.6em,5em);
        }
        100% {
            height:8em;
            transform: translate(1.6em,0em);
        }
    }
</style>
<script>
    // @ is an alias to /src
    import ShareDialog from '../components/ShareDialog.vue';
    import SlotWheel from '../components/Slot.vue';
    import data from '../wheel-data.js';
    const entities = data.get_entities();
    const problems = data.get_problems();
    const reasons = data.get_reasons();
    function get_animation(el,anim) {
        const anims = el.getAnimations();
        return anims.find((anim) => anim.animationName === anim);
    }
    export default {
        name: 'Slots',
        components: {SlotWheel,ShareDialog},
        data:()=>({
            entities: [...entities],
            problems: [...problems],
            reasons: [...reasons],
            complaint: {
                entity: '',
                problem: '',
                reason: '',
            },
            doors: [],
            interval:null,
        }),
        mounted(){
            
        },
        computed: {
            show_complaint() {
                return !!this.complaint.entity && !!this.complaint.problem && !!this.complaint.reason;
            },
            complaint_text() {
                return `${this.complaint.entity} is ${this.complaint.problem} because ${this.complaint.reason}`;
            }
        },
        methods: {
            reel_classes(){
                if (this.$vuetify.breakpoint.mobile) {
                    return 'scrollbar-hidden reel-item reel-item-mobile';
                } else {
                    return 'scrollbar-hidden reel-item reel-item-large';
                }
            },
            spin() {
                this.$refs.stick.classList.add('animate','animate-stick');
                this.$refs.knob.classList.add('animate','animate-knob');
                if (this.interval != null) {
                    console.log('already running')
                    return;
                }
                const spins = 12;
                const target_entity = Math.floor(Math.random()*entities.length)+entities.length*spins;
                const position_entity = 300*target_entity;
                const slot_entity = this.$refs.scroller_entities.$el;
                const target_problem = Math.floor(Math.random()*problems.length)+problems.length*spins;
                const position_problem = 300*target_problem;
                const slot_problem = this.$refs.scroller_problems.$el;
                const target_reason = Math.floor(Math.random()*reasons.length)+reasons.length*spins;
                const position_reason = 300*target_reason;
                const slot_reason = this.$refs.scroller_reasons.$el;
                slot_entity.classList.add('blur');
                slot_problem.classList.add('blur');
                slot_reason.classList.add('blur');
                //slot_entity.scrollTo({left:0,top:position_entity,behaviour:'smooth'})
                console.log(this.$refs.scroller_entities);
                for (let i=0;i<=spins;i++) {
                    this.entities.push(...entities);
                    this.problems.push(...problems);
                    this.reasons.push(...reasons);
                }
                this.interval = setInterval(()=>{
                    const spin_speed = 0.125;
                    //console.log(slot_entity.scrollTop);
                    slot_entity.scrollTop = lerp(slot_entity.scrollTop,position_entity,spin_speed);
                    slot_problem.scrollTop = lerp(slot_problem.scrollTop,position_problem,spin_speed);
                    slot_reason.scrollTop = lerp(slot_reason.scrollTop,position_reason,spin_speed);
                    if ((position_entity-slot_entity.scrollTop) < 10) {
                        slot_entity.scrollTop = position_entity;
                        slot_problem.scrollTop = position_problem;
                        slot_reason.scrollTop = position_reason;
                        clearInterval(this.interval);
                        this.interval = null;
                        this.spin_end();
                    }
                },10);
                //window.requestAnimationFrame(step);
            },
            spin_end(){
                console.log('spin end');
                this.$refs.stick.classList.remove('animate','animate-stick');
                this.$refs.knob.classList.remove('animate','animate-knob');
                const slot_entity = this.$refs.scroller_entities.$el;
                const slot_problem = this.$refs.scroller_problems.$el;
                const slot_reason = this.$refs.scroller_reasons.$el;
                slot_entity.classList.remove('blur');
                slot_problem.classList.remove('blur');
                slot_reason.classList.remove('blur');
                const position_entity = slot_entity.scrollTop % (300*entities.length);
                const position_problem = slot_problem.scrollTop % (300*problems.length);
                const position_reason = slot_reason.scrollTop % (300*reasons.length);
                this.entities.splice(0,this.entities.length);
                this.problems.splice(0,this.problems.length);
                this.reasons.splice(0,this.reasons.length);
                this.entities.push(...entities);
                this.problems.push(...problems);
                this.reasons.push(...reasons);
                slot_entity.scrollTop = position_entity;
                slot_problem.scrollTop = position_problem;
                slot_reason.scrollTop = position_reason;
                this.complaint.entity = this.entities[Math.floor(position_entity/300)];
                this.complaint.problem = this.problems[Math.floor(position_problem/300)];
                this.complaint.reason = this.reasons[Math.floor(position_reason/300)];
            },
            
        }
    }
    function lerp(a,b,t) {
        //console.log(a,b,t);
        return (a+(b-a)*t)
    }
</script>
