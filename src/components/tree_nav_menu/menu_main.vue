 <template>
 	<items :model='menuData'></items>
 </template>

 <script>
 	import items from './menu'
 	export default {
 		data () {
 			return {
 				menuData: [{
	                "id": "1",
                    "menuName": "项目管理",
                    "menuCode": "",
                    "childTreeNode": [{
                        "menuName": "项目",
                        "menuCode": "BusProject",
	                    "childTreeNode": []
	                }, {
                        "menuName": "我的任务",
                        "menuCode": "BusProject",
	                    "childTreeNode": []
	                }, {
                        "menuName": "人员周报",
                        "menuCode": "BusProject",
	                    "childTreeNode": []
	                }]
	            }, {
	                "id": "2",
                    "menuName": "数据统计",
                    "menuCode": "BusClock",
	                "childTreeNode": []
	            }, {
	                "id": "3",
                    "menuName": "人事管理",
                    "menuCode": "",
	                "childTreeNode": []
	            }, {
	                "id": "4",
                    "menuName": "基础管理",
                    "menuCode": "",
	                "childTreeNode": []
	            }]
 			}
 		},
 		components: { items }
 	}
 </script>
