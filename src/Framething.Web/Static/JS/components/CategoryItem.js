export default {
    name: 'category-item',
    props: ['category'],
    template: `
        <router-link :to="{ name: 'category', params: { slug: category.slug }}" active-class="active" class="list-group-item list-group-item-action">{{ category.name }}
            <span class="badge badge-dark float-right">{{ category.mastered }} / {{ category.total }}</span>
        </router-link>
    `,
}
