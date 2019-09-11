import vue from 'vue';
import vue_router from 'vue-router';

import a from './pages/a'
import b from "./pages/b"

vue.use(vue_router)

const routes = [
    {path:'/a',component:a},
    {path:'/b',component:b},
]

const router = new vue_router({
    routes
})

export default router;