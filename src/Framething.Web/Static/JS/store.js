import Vue from 'vue';
import Vuex from 'vuex';

import { FramethingData } from './generated_data.js';

Vue.use(Vuex);

// Create the store
export const store = new Vuex.Store({
    state: {
        changedProgress: [],
        progress: {},
        public: FramethingData.public,
        saving: false,
        searchString: '',
        showMastered: true,
    },
    getters: {
        getProgress: (state) => (id) => {
            if (state.progress[id] === undefined) {
                Vue.set(state.progress, id, {});
                Vue.set(state.progress[id], 'mastered', false);
                Vue.set(state.progress[id], 'owned', false);
                Vue.set(state.progress[id], 'formaed', 0);
                Vue.set(state.progress[id], 'have_components', []);
            }
            return state.progress[id];
        },
    },
    actions: {
        setMastered ({ commit, getters }, { id, value }) {
            let progress = getters.getProgress(id);
            commit('setMastered', { id, value });
        },
        setOwned ({ commit, getters }, { id, value }) {
            let progress = getters.getProgress(id);
            commit('setOwned', { id, value });
        },
        setFormaed ({ commit, getters }, { id, value }) {
            let progress = getters.getProgress(id);
            commit('setFormaed', { id, value });
        },
        setComponents ({ commit, getters }, { id, value }) {
            let progress = getters.getProgress(id);
            commit('setComponents', { id, value });
        },
        setAll({ commit, getters }, { id, data }) {
            let progress = getters.getProgress(id);
            commit('setAll', { id, data });
            //console.log(id, data);
        },
        toggleMastered ({ commit, getters }, id) {
            let progress = getters.getProgress(id);
            commit('setMastered', { id, value: !progress.mastered });
        },
        toggleOwned ({ commit, getters }, id) {
            let progress = getters.getProgress(id);
            commit('setOwned', { id, value: !progress.owned });
        },
        incrementFormaed ({ commit, getters }, id) {
            let progress = getters.getProgress(id);
            if (progress.formaed < 10) {
                commit('setFormaed', { id, value: progress.formaed + 1 });
            }
        },
        decrementFormaed ({ commit, getters }, id) {
            let progress = getters.getProgress(id);
            if (progress.formaed > 0) {
                commit('setFormaed', { id, value: progress.formaed - 1 });
            }
        },
        toggleHaveComponent({ commit, getters }, { item_id, component_id, have }) {
            let progress = getters.getProgress(item_id),
                components = progress.have_components.slice();

            if (have) {
                let index = components.indexOf(component_id);
                if (index >= 0) {
                    components.splice(index, 1);
                }
            }
            else {
                components.push(component_id);
            }

            commit('setComponents', { id: item_id, value: components });
        },
    },
    mutations: {
        loadLocalStorage(state) {
            var showMastered = localStorage.getItem('showMastered');
            if (showMastered) {
                state.showMastered = JSON.parse(showMastered);
            }
        },
        setSearchString(state, value) {
            state.searchString = value;
        },
        setShowMastered(state, value) {
            localStorage.setItem('showMastered', JSON.stringify(value));
            state.showMastered = value;
        },
        setMastered (state, { id, value }) {
            Vue.set(state.progress[id], 'mastered', value);
            state.changedProgress.push(id);
        },
        setOwned (state, { id, value }) {
            Vue.set(state.progress[id], 'owned', value);
            state.changedProgress.push(id);
        },
        setFormaed (state, { id, value }) {
            Vue.set(state.progress[id], 'formaed', value);
            state.changedProgress.push(id);
        },
        setComponents (state, { id, value }) {
            Vue.set(state.progress[id], 'have_components', value);
            state.changedProgress.push(id);
        },
        setAll (state, { id, data }) {
            Vue.set(state.progress[id], 'mastered', data.m);
            Vue.set(state.progress[id], 'owned', data.o);
            Vue.set(state.progress[id], 'formaed', data.f);
            Vue.set(state.progress[id], 'have_components', data.c);
        },
    },
});
