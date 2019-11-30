import Vue from 'vue';

// Bootstrap tooltips
Vue.directive('tooltip', {
    bind (el, binding) {
        $(el).tooltip({
            placement: 'right',
            title: binding.value,
            trigger: 'hover',
        });
    },
    update (el, binding) {
        el.setAttribute('data-original-title', binding.value);
        
        let describedBy = $(el).attr('aria-describedby');
        if (describedBy) {
            $('#' + describedBy + ' .tooltip-inner').text(binding.value);
        }
    },
    unbind (el, binding) {
        $(el).tooltip('dispose');
    },
});

// Bootstrap popovers
Vue.directive('popover', {
    bind (el, binding) {
        let $el = $(el);
        $el.popover({
            animation: false,
            container: 'body',
            content: binding.value,
            html: true,
            placement: 'right',
            title: $el.attr('title'),
            trigger: 'hover',
        })
    },
});
