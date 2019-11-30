import Vue from 'vue';
import VueRouter from 'vue-router';

import './directives.js';
import { store } from './store.js';
import CategoryList from './components/CategoryList.js';
import MasteryList from './components/MasteryList.js';
import Saving from './components/Saving.js';
import SearchBox from './components/SearchBox.js';
import ShowMastered from './components/ShowMastered.js';

Vue.use(VueRouter);

// Create the router
const router = new VueRouter({
    routes: [
        {
            path: '/category/:slug',
            name: 'category',
            component: MasteryList,
        },
    ],
});

// Create the app
const App = new Vue({
    el: '#app',
    components: {
        CategoryList,
        MasteryList,
        Saving,
        SearchBox,
        ShowMastered,
    },
    router,
    store,
    beforeCreate() {
        this.$store.commit('loadLocalStorage');
    }
}).$mount('#app');

// jQuery
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!this.crossDomain) {
            xhr.setRequestHeader('X-CSRFToken', $("[name=csrfmiddlewaretoken]").val());
        }
    },
});

// Save timer
if (!store.state.public) {
    setInterval(function() {
        if (store.state.saving) { return; }
        store.state.saving = true;

        var updates = store.state.changedProgress.splice(0);
        if (updates.length > 0) {
            var data = {};
            for (let item_id of updates) {
                if (data[item_id] === undefined) {
                    let progress = store.getters.getProgress(item_id);
                    data[item_id] = {
                        m: progress.mastered,
                        o: progress.owned,
                        f: progress.formaed,
                        c: progress.have_components,
                    }
                }
            }

            $.post(
                '/update_progress/',
                data,
                function() {
                    store.state.saving = false;
                }
            );
        }
        else {
            store.state.saving = false;
        }
    }, 1000);
}
