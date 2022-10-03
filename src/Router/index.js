import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [{
    path:'/',
    redirect:'/jiuai233',
    meta:{
        isAuth:true , title:''
    }
    },{
        path: '/jiuai233',
        name:'jiuai233',
        component:()=>
            import("@/View/VupCatalogue/jiuai233/index")
    }]


const router = new Router({
    module: "hash",
    base: process.env.BASE_URL,
    routes
})

export default router