import Vuex from 'vuex';

export default {
    name: "show-mastered",
    computed: {
        ...Vuex.mapState({
            showMastered: state => state.showMastered,
        }),
    },
    methods: {
        updateShowMastered (e) {
            this.$store.commit('setShowMastered', e.target.checked);
        },
    },
    template: `
        <label><input :checked="showMastered" @input="updateShowMastered" id="show-mastered" type="checkbox"> Show Mastered</label>
    `,
}
