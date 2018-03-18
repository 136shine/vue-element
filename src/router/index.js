import Vue from 'vue'
import Router from 'vue-router'
import Recursion from '@/components/recursion_components/recursion_main'
import Menu from '@/components/tree_nav_menu/menu_main'
import Table from '@/components/x-table/table'
import SingleSelect from '@/components/x-single-select/vue-single-select-main'
import CascaderSelect from '@/components/x-cascader-select/vue-cascader-select-main'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'Recursion',
		component: Recursion
	}, {
		path: '/menu',
		name: 'Menu',
		component: Menu
	}, {
		path: '/table',
		name: 'Table',
		component: Table
	}, {
		path: '/single-select',
		name: 'SingleSelect',
		component: SingleSelect
	}, {
		path: '/cascader-select',
		name: 'CascaderSelect',
		component: CascaderSelect
	}]
})