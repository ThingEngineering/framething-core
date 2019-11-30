import Vuex from 'vuex';

import MasteryItem from './MasteryItem.js';

export default {
    name: "mastery-list-category",
    components: {
        MasteryItem,
    },
    props: {
        name: String,
        items: Array,
        mastered: Boolean,
    },
    computed: {
        filteredItems: function() {
            if (this.mastered) {
                return this.items.filter(item => this.showMastered && this.itemMastered(item.id) && this.hasSearchString(item.id));
            }
            else {
                return this.items.filter(item => !this.itemMastered(item.id) && this.hasSearchString(item.id));
            }
        },
        masteredItems: function(key) {
            return this.items.filter(item => this.showMastered && this.itemMastered(item.id) && this.hasSearchString(item.id));
        },
        ...Vuex.mapState({
            searchString: state => state.searchString,
            showMastered: state => state.showMastered,
        }),
    },
    methods: {
        itemMastered(item_id) {
            return this.$store.getters.getProgress(item_id).mastered;
        },
        hasSearchString(item_id) {
            return this.searchString === '' || FramethingData.items[item_id].name.toLowerCase().indexOf(this.$store.state.searchString) >= 0;
        },
    },
    template: `
        <div v-if="filteredItems.length" class="item-container">
            <div class="item-container-name">{{ name }}</div>
            <mastery-item v-for="item in filteredItems" :key="item.id" v-bind.sync="item"></mastery-item>
        </div>
    `,
}

/*
        <div v-for="key in items" class="item-container">
            </div>
            <div v-if="unmasteredItems.length" class="item-container">
                <mastery-item v-for="item in unmasteredItems" :key="item.id" v-bind.sync="item"></mastery-item>
            </div>
            <div v-if="masteredItems.length" class="item-container">
                <div class="item-container-title">Mastered</div>
                <mastery-item v-for="item in masteredItems" :key="item.id" v-bind.sync="item"></mastery-item>
            </div>
            <div v-if="unmasteredItems.length == 0 && masteredItems.length == 0">
                No results found :(
            </div>
        </div>
*/
