import PopoverMixin from './PopoverMixin.js';

export default {
    name: "mastery-item-component",
    mixins: [
        PopoverMixin,
    ],
    props: {
        auto_key: String,
        item_id: Number,
        component_id: Number,
        name: String,
        image_name: String,
        count: Number,
        is_resource: Boolean,
        have: Boolean,
    },
    computed: {
        static_url: function() {
            return FramethingData.static_url;
        },
        cssClass: function() {
            return 'item-component ' + (this.is_resource ? 'color-resource' : (this.have ? 'color-have' : 'color-missing'));
        },
        popoverTitle () {
            return (this.count > 1 ? this.count + 'x ' : '') + this.name;
        },
        drops () {
            return FramethingData.items[this.component_id].drops;
        },
    },
    methods: {
        toggleHaveComponent () {
            if (!this.is_resource && !this.$store.state.public) {
                this.$store.dispatch('toggleHaveComponent', { item_id: this.item_id, component_id: this.component_id, have: this.have });
            }
        },
    },
    template: `
        <div :class="cssClass" :title="popoverTitle" v-popover="getPopoverHtml(drops)" v-on:click="toggleHaveComponent">
            <img class="fit-image" :src="'https://cdn.thing.engineering/framething/' + image_name">
            <span v-if="count > 1" class="item-count">{{ count }}</span>
        </div>
    `,
}
