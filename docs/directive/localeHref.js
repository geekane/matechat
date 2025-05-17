import { getLocaleUrlPrefix } from '../theme-default/support/utils';

export default {
    mounted(el, binding) {
        el.href = getLocaleUrlPrefix(binding.value)
    },
    updated(el, binding) {
        el.href = getLocaleUrlPrefix(binding.value)
    }
}