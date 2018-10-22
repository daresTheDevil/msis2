import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import DistrictMap from '@/pages/DistrictMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Districts',
      component: DistrictMap
    }
  ]
})
