import Vuex from 'vuex';

export default {
    name: "search-box",
    computed: {
        ...Vuex.mapState({
            searchString: state => state.searchString,
        }),
    },
    methods: {
        updateSearchString (e) {
            this.$store.commit('setSearchString', e.target.value.toLowerCase());
        },
    },
    template: `
        <input :value="searchString" @input="updateSearchString" class="form-control" type="text" placeholder="Filter...">
    `,
}
