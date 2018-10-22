import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import DistrictMap from '@/pages/DistrictMap'
import MsrcHome from '@/pages/MsrcHome'
import DataHome from '@/pages/DataHome'
import DashboardHome from '@/pages/DashboardHome'
import MsisHome from '@/pages/MsisHome'
import EntityPage from '@/pages/EntityPage'
import NewMap from '@/pages/NewMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/msis',
      name: 'MSIS',
      component: MsisHome
    },
    {
      path: '/msrc',
      name: 'MSRC',
      component: MsrcHome
    },
    {
      path: '/data',
      name: 'Data',
      component: DataHome
    },
    {
      path: '/dashboards',
      name: 'Dashboards',
      component: DashboardHome
    },
    {
      path: '/maps',
      name: 'Maps',
      component: DistrictMap
    },
    {
      path: '/entity/:id',
      name: 'entity',
      component: EntityPage,
      props: true
    },
    {
      path: '/newmap',
      name: 'New Map',
      component: NewMap
    }
  ]
})
