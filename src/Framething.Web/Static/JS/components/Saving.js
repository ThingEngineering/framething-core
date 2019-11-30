export default {
    name: "saving",
    computed: {
        saving: function() {
            return this.$store.state.saving;
        },
    },
    template: `
        <div v-if="saving" class="saving">Saving...</div>
    `,
}
