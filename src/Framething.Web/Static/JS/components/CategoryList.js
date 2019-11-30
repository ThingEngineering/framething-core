import Vuex from 'vuex';

import CategoryItem from './CategoryItem.js';

export default {
    name: 'category-list',
    components: {
        CategoryItem,
    },
    created () {
        for (let item_id in FramethingData.progress) {
            this.setAll({ id: item_id, data: FramethingData.progress[item_id] });
        }
    },
    computed: {
        categories () {
            let cats = [],
                total_mastered = 0,
                total_items = 0;

            for (let [ slug, id, name ] of FramethingData.category_order) {
                let items = FramethingData.categories[id],
                    mastered = 0;
                for (let item_id of items) {
                    let progress = this.$store.getters.getProgress(item_id);
                    if (progress.mastered) {
                        mastered++;
                    }
                }

                cats.push({
                    slug: slug,
                    name: name,
                    mastered: mastered,
                    total: items.length,
                });
                total_mastered += mastered;
                total_items += items.length;
            }

            cats.push({
                slug: 'everything',
                name: 'Everything (slow!)',
                mastered: total_mastered,
                total: total_items,
            });

            return cats;
        },
    },
    methods: {
        ...Vuex.mapActions([
            'setAll',
        ]),
    },
    template: `
        <div class="list-group">
            <category-item v-for="category in categories" :key="category.id" :category="category"></category-item>
        </div>
    `,
}
