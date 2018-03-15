import Vue from 'vue'
import Router from 'vue-router'
import Table from '@/components/table'
import Select from '@/components/x-select/vue-elem-select'
import SelectMain from '@/components/x-select/vue-single-select-main'
import SelectMain2 from '@/components/x-select/vue-cascader-select-main'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'Table',
		component: Table
	}, {
		path: '/select',
		name: 'Select',
		component: Select
	}, {
		path: '/main',
		name: 'SelectMain',
		component: SelectMain
	}, {
		path: '/main2',
		name: 'SelectMain2',
		component: SelectMain2
	}]
})