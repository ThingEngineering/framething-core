import MasteryItem from './MasteryItem.js';
import MasteryListCategory from './MasteryListCategory.js';

export default {
    name: "mastery-list",
    components: {
        MasteryItem,
        MasteryListCategory,
    },
    computed: {
        items: function() {
            let items = { 0: {name: 'Not Mastered', items: [], mastered: false}, 9999: {name: 'Mastered', items:[], mastered: true} },
                everything = (this.$route.params.slug === 'everything'),
                found_no_sub = false,
                found_sub = false;

            for (let [ slug, id, name, has_subs ] of FramethingData.category_order) {
                if (everything || slug === this.$route.params.slug) {
                    for (let item_id of FramethingData.categories[id]) {
                        let item = FramethingData.items[item_id];
                        let itemData = {
                            id: item_id,
                            name: item.name,
                            image_name: item.image_name,
                            components: item.components || [],
                        };
                        
                        items[0].items.push(itemData);
                        if (!everything && item.sub_category > 0) {
                            found_sub = true;
                            items[item.sub_category] = items[item.sub_category] || {name: FramethingData.sub_categories[item.sub_category], items: []};
                            items[item.sub_category].items.push(itemData);
                        }
                    }
                    if (!everything) {
                        break;
                    }
                }
            }
            
            if (everything) {
                items[0].items.sort(function(a, b) { return a.name.localeCompare(b.name) });
            }
            
            items[9999].items = items[0].items;
            if (found_sub) {
                delete items[0];
            }

            return items;
        },
    },
    template: `
        <div class="col col-items">
            <div v-for="itemData in items" class="item-container">
                <mastery-list-category v-bind.sync="itemData"></mastery-list-category>
            </div>
        </div>
    `,
}
