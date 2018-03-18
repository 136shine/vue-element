# vue-element

> encapsulation element-ui（封装 element-ui）

   根据工作时的需求，进一步封装 element-UI部分常用模块，减少element-UI模版代码量，更加简洁

 一、table
 	调用示例： 
 	1、template 示例
 	``` 
 	<d-table :tableData="table.data" :tableKey="table.key" :isExpand="isExpand" :isExpandOnly="isExpandOnly" :sortObj="sortObj" :isCheckbox="isCheckbox" :maxHeight="maxHei" ref="p_table">
 		<!-- table的 可配置的和递归column 插入到 d-table组件的el-table中-->
		<template slot="column">
			<!-- table的 column 组件-->
			<vue-table-column :tKey="table.key" v-for="(item, key) in table.key" :item="item" :key="key">
				<!-- template 中是自定义列的内容，为了插入到vue-table-column组件，与elment-ui一一致 -->
				......

				<template slot="name" slot-scope="scope">
			        ......
			        ......
				</template>

				......

			</vue-table-column>
		</template>
		<!-- table的可展开功能（可选）-->
		<template slot="expand" slot-scope="props">
			......
		</template>
	</d-table>	
	```
	2、数据data 示例
	```
		// 表格数据样式
		table: {
          key: [{
          	label: '日期', 
          	value: 'date', 
          	template: true, 是否自定义列的内容
          	isSortable: true, 是否列排序
          	width: 180
          }, {
          	label: '姓名', 
          	value: 'name', 
          	template: true, 
          	width: 180
          }, {
          	label: '地址',
          	value: 'address', 
          	template: false,
          	child: [{
          		label: '省份', 
          		value: 'province', 
          		template: false, 
          		isSortable: true, 
          		width: 120
          	}, {
          		label: '市区', 
          		value: 'city', 
          		template: false, 
          		width: 120
          	}, {
          		label: '详细地址', 
          		value: 'detail', 
          		template: false, 
          		width: 220
          	}]
          }, {
          	label: '操作', 
          	value: 'operate', 
          	template: true,
          	width: 300
          }],
          data: [{
            date: '2016-05-02',
            name: '王小虎',
        	province: '上海',
	        city: '普陀区',
	        detail: '金沙江路 1518 弄',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-08',
            name: '王小虎',
            province: '上海',
	        city: '普陀区',
	        detail: '金沙江路 15180 弄',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        },
        sortObj: {prop: 'date', order: 'descending'}, // 排序规则
        isExpand: true, // 是否添加展开选项
        isExpandOnly: true, // 是否唯一展开
        isCheckbox: true, // 是否添加可选选项
        maxHei: 350 // 最大高度
	```





## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```

