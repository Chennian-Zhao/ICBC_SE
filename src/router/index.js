//创建路由实例
import { createRouter, createWebHashHistory } from "vue-router"
import Index from '../view/index.vue'
import Lucky from '../view/Lucky.vue'
import test1 from '../view/test1.vue'
import test2 from '../view/test2.vue'
import lucky1 from "../view/lucky1.vue"
import Loopy from "../view/loopy.vue"
import Disney from "../view/disney.vue"



//1.创建路由规则

const routes = [{
    path: '/index',
    name: 'index',
    component: Index
},{
    path: '/',
    name: 'index',
    component: Index
},{
    path: '/lucky',
    name: 'lucky',
    component: Lucky
},
{
    path: '/lucky1',
    name: 'lucky1',
    component: lucky1
},
{
    path: '/loopy',
    name: 'loopy',
    component: Loopy
},{
    path: '/disney',
    name: 'disney',
    component: Disney
},{
    path: '/test1',
    name: 'test1',
    component: test1
},{
    path: '/test2',
    name: 'test2',
    component: test2
}]
//2.创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
export default router;
//创建主页组件
