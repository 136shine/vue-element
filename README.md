# vue-element

> encapsulation element-ui（封装 element-ui）

   根据工作时的需求，进一步封装 element-UI部分常用模块，减少element-UI模版代码量，更加简洁

 ### 一、table
 	
  调用示例：</br> 
 	1、template 示例
```vue
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
  
```vue
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
### 二、select
#### 2.1 single-select 
`说明:该组件主要是为了在从后台获取的特殊含义的key的数据转化为中文语义化显示，同时修改提交时转化为原数据`

1、template 模版 示例
```vue
<template>
	<div class="wrap">
		<el-table
	      :data="tableData"
	      border
	      style="width: 100%">
	      <el-table-column
	        prop="alias"
	        label="食品"
	        width="180"
	        header-align="center">
	      </el-table-column>
	      <el-table-column label="操作" width="180" header-align="center">
		  	<template slot-scope="scope">
		        <el-button
		          size="mini"
		          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      </template>
		  </el-table-column>
	    </el-table>
    	<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="30%">
		  <el-form ref="form" :model="form" label-width="80px" style="width: 300px">
	  		<el-form-item label="食品">
        <!-- 重点 `single-select`组件 -->
				<x-single-select :options="opts" :item="form.food" @tableChange="getChildChange"></x-single-select>
        
			</el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="handleSub">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
```

2、数据data格式
```
data() {
  return {
    dialogVisible: false,
    _index: 0,
    opts: [{
      value: '1',
      label: '黄金糕'
    }, {
      value: '2',
      label: '双皮奶'
    }, {
      value: '3',
      label: '蚵仔煎'
    }, {
      value: '4',
      label: '龙须面'
    }, {
      value: '5',
      label: '北京烤鸭'
    }],
    tableData: [{
      food: '2',
      alias: '双皮奶' // 别名，语义化显示
    }, {
      food: '3',
      alias: '蚵仔煎'
    }],
    form: {
      food: ''
    }
  }
}
```
3、方法调用
```javascrpt
methods: {
  // 表格转化语义化的内容
  handleTableChange(data, opt, alias) {
      if (typeof data == 'object') {
        for (let item1 of data) {
          for (let item2 of opt) {
            if (item1.food === item2.value) {
              item1[alias] = item2.label
            }
          }
        }
      } else {
        for (let item2 of opt) {
          if (data === item2.value) {
            this.tableData[this._index][alias] = item2.label
          }
        }
      }
  },
  // 下拉框改变时，调用，同时改变表格内容
  getChildChange (val) {
    this.form.food = val
    this.handleTableChange(val, this.opts, 'alias')
  },
  // 修改表格
  handleEdit(index, row) {
      this.dialogVisible = true
      this.form = row
      this._index = index
  }
  // ....
}
```


#### 2.2 cascader-select 级联选择器
`说明:该组件以single-select为基础组件，进一步级联联动选择`

1、template模版 示例
```vue 
<template>
  <div class="wrap">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
	      ......
        用法格式与上文中single-select类似
        ......
    </el-table>
  	<el-dialog
  	  title="提示"
  	  :visible.sync="dialogVisible"
  	  width="30%">
	    <el-form ref="form" :model="form" label-width="80px" style="width: 300px">
		    <el-form-item label="地址">
         <!-- 重点 `cascader-select`组件 -->
		  	 <v-cascader-select :pForm="form" :optsAll="optionsAddr" :rIndex="rowIndex" :tableData="tableData"></v-cascader-select>
		    </el-form-item>
	    </el-form>
  	  ......
       此处与上文中single-select相同
      ......
	  </el-dialog>
  </div>
</template>
```

2、数据data格式
```
data() {
  return {
    dialogVisible: false,
    form: {
      address1: '',
      address1_alias: '',
      address2: '',
      address2_alias: '',
      address3: '',
      address3_alias: ''
    },
    tableData: [{
      address1: '1',
      address1_alias: '北京市',
      address2: '1-1',
      address2_alias: '海淀区',
      address3: '1-1-1',
      address3_alias: '双清路'
    }, {
      address1: '1',
      address1_alias: '北京市',
      address2: '1-2',
      address2_alias: '朝阳区',
      address3: '1-2-1',
      address3_alias: '朝阳区1-2-1'
    }],
    optionsAddr: [{
      value: '1',
      label: '北京市',
      children: [{
        value: '1-1',
        label: '海淀区',
        children: [{
          value: '1-1-1',
          label: '双清路'
        }, {
          value: '1-1-2',
          label: '学清路'
        }]
       }, {
        value: '1-2',
        label: '朝阳区',
        children: [{
          value: '1-2-1',
          label: '朝阳区1-2-1'
        }, {
          value: '1-2-2',
          label: '朝阳区1-2-2'
        }]
      }]
    }, {
      value: '2',
      label: '江西省',
      children: [{
        value: '2-1',
        label: '宜春市',
        children: [{
          value: '2-1-1',
          label: '宜春市2-1-1'
        }, {
          value: '2-1-2',
          label: '宜春市2-1-2'
        }]
      }, {
        value: '2-2',
        label: 'xx市',
        children: [{
          value: '2-2-1',
          label: 'xx市2-1-1'
        }, {
          value: '2-2-2',
          label: 'xx市2-1-2'
        }]
      }]
    }],
    rowIndex: 0
  }
}
```

3、方法调用
```javascript
methods: {
  handleTableChange(opt, key, alias) {
    for (let item1 of this.tableData) {
      for (let item2 of opt) {
        if (item1.key === item2.value) {
          item1[alias] = item2.label
        }
      }
    }
  },

  handleEdit(index, row) {
      this.dialogVisible = true
      this.form = row
      this.rowIndex = index
      console.log(this.form)
  }
}
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

