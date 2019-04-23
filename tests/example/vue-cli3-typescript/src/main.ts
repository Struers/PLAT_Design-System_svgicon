import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import svgicon from '@struers/svgicon'
import '@/components/icons'

Vue.use(svgicon, {
    tagName: 'icon'
})

new Vue({
    render: h => h(App)
}).$mount('#app')
