//创建路由实例
import { createRouter, createWebHashHistory } from "vue-router"
import Blindbox from '../view/Blindbox.vue'
import Lucky2 from '../view/Lucky2.vue'
import Lucky1 from '../view/lucky1.vue'
import Disney from '../view/disney.vue'



//1.创建路由规则

const routes = [{
    path: '/blindbox',
    name: 'blindbox',
    component: Blindbox
},{
    path: '/Lucky2',
    name: 'Lucky2',
    component: Lucky2
},
{
    path: '/lucky1',
    name: 'lucky1',
    component: Lucky1
},
{
    path: '/disney',
    name: 'disney',
    component: Disney
}]
//2.创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
export default router;
//创建主页组件
