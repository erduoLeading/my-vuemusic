import Vue from 'vue'
import Router from "vue-router"
import Recommend from '../components/recommend/recommend'
import Rank from '../components/rank/rank'
import Singer from '../components/singer/singer'
import Search from '../components/search/search'
import SingerDetail from  '../components/singer-detail/singer-detail'
import disc from "../components/disc/disc";
import TopList from '../components/top-list/top-list'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/recommend' // 默认跳转到推荐页面
    }, {
        path: "/rank",
        component: Rank,
		children:[
			{
				path: ':id',
				component: TopList,
			}
		],
    }, {
        path: "/search",
        component: Search
    }, {
        path: "/singer",
        component: Singer,
        children:[
            {
                path:':mid',
                component:SingerDetail
            }
        ]
    }, {
        path: "/recommend",
        component: Recommend,
		children: [ // 增加一个二级路由
			{
				path: ":id",
				component: disc
			}
		]
    }]
})
