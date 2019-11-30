import MasteryItemComponent from './MasteryItemComponent.js';
import PopoverMixin from './PopoverMixin.js';

export default {
    name: "mastery-item",
    components: {
        MasteryItemComponent,
    },
    mixins: [
        PopoverMixin,
    ],
    props: {
        id: Number,
        name: String,
        image_name: String,
        components: Array,
    },
    computed: {
        mastered: function() {
            return this.$store.state.progress[this.id].mastered;
        },
        owned: function() {
            return this.$store.state.progress[this.id].owned;
        },
        formaed: function() {
            return this.$store.state.progress[this.id].formaed;
        },
        have_components: function() {
            return this.$store.state.progress[this.id].have_components;
        },
        encodedName: function() {
            return this.name.replace(/ /g, '_');
        },
        masteredClass () {
            return 'item-mastered ' + (this.mastered ? 'color-have' : 'color-missing');
        },
        masteredTooltip () {
            return this.mastered ? 'Mastered' : 'Not mastered';
        },
        ownedClass () {
            return 'item-owned ' + (this.owned ? 'color-have' : 'color-missing');
        },
        ownedIcon () {
            return this.owned ? 'owned' : 'unowned';
        },
        ownedTooltip () {
            return this.owned ? 'Owned' : 'Not owned';
        },
        formaedClass () {
            return 'item-formaed ' + (this.formaed > 0 ? 'color-have' : 'color-missing');
        },
        formaedTooltip () {
            return (this.formaed > 0 ? this.formaed + 'x Forma' : 'No Forma');
        },
        drops () {
            return FramethingData.items[this.id].drops;
        },
        computedComponents: function() {
            let avail = this.have_components.slice(),
                components = [];

            for (let i = 0; i < this.components.length; i++) {
                let [ component_id, count, is_resource ] = this.components[i],
                    item = FramethingData.items[component_id],
                    have = false,
                    index = avail.indexOf(component_id);
                    
                if (index >= 0) {
                    avail.splice(index, 1);
                    have = true;
                }

                components.push({
                    auto_key: `${this.id}-${i}`,
                    item_id: this.id,
                    component_id: component_id,
                    name: item.name,
                    image_name: item.image_name,
                    count: count,
                    is_resource: is_resource,
                    have: have,
                });
            }

            return components;
            //return Object.freeze(components);
        },
    },
    methods: {
        toggleMastered (id) {
            if (!this.$store.state.public) {
                this.$store.dispatch('toggleMastered', id);
            }
        },
        toggleOwned (id) {
            if (!this.$store.state.public) {
                this.$store.dispatch('toggleOwned', id);
            }
        },
        incrementFormaed (id) {
            if (!this.$store.state.public) {
                this.$store.dispatch('incrementFormaed', id);
            }
        },
        decrementFormaed (id) {
            if (!this.$store.state.public) {
                this.$store.dispatch('decrementFormaed', id);
            }
        },
    },
    template: `
        <div class="item-box border">
            <div class="item-data">
                <div class="item-image border-right">
                    <a :href="'http://warframe.wikia.com/wiki/' + encodedName" target="_blank" rel="noopener noreferrer">
                        <img class="fit-image" :src="'https://cdn.thing.engineering/framething/' + image_name">
                    </a>
                </div>

                <div class="item-info">
                    <h6><a :href="'https://warframe.wikia.com/wiki/' + encodedName" target="_blank" rel="noopener noreferrer">{{ name }}</a></h6>

                    <div class="item-stuff">
                        <div :class="ownedClass" v-tooltip="ownedTooltip" v-on:click="toggleOwned(id)">
                            <img class="fit-image" :src="'/static/img/' + ownedIcon + '.png'">
                        </div>

                        <div :class="masteredClass" v-tooltip="masteredTooltip" v-on:click="toggleMastered(id)">
                            <img class="fit-image" src="/static/img/mastery-sigil.png">
                        </div>

                        <div :class="formaedClass" v-tooltip="formaedTooltip" v-on:click.left="incrementFormaed(id)" v-on:click.right.prevent="decrementFormaed(id)">
                            <img class="fit-image" src="https://cdn.thing.engineering/framething/generic-component.png">
                            <span v-if="formaed > 0" class="item-count">{{ formaed }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <template v-if="!(owned || mastered)">
                <div v-if="components.length" class="item-components">
                    <mastery-item-component v-for="component in computedComponents" :key="component.auto_key" v-bind="component"></mastery-item-component>
                </div>
                <div v-else class="item-components">
                    <span class="item-components-none" :title="name" v-popover="getPopoverHtml(drops)">Not a crafted item</span>
                </div>
            </template>
        </div>
    `,
}
