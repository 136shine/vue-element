<!-- vue-elem-select.vue -->
<template>
  <div class="wrap">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="address1_alias"
        label="省"
        width="180"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="address2_alias"
        label="市区"
        width="180"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="address3_alias"
        label="详细"
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
		    <el-form-item label="地址">
		  	 <v-cascader-select :pForm="form" :optsAll="optionsAddr" :rIndex="rowIndex" :tableData="tableData"></v-cascader-select>
		    </el-form-item>
	    </el-form>
  	  <span slot="footer" class="dialog-footer">
  	    <el-button @click="dialogVisible = false">取 消</el-button>
  	    <el-button type="primary" @click="handleSub">确 定</el-button>
  	  </span>
	  </el-dialog>
  </div>
</template>

<script>
  import vCascaderSelect from './vue-cascader-select'
  export default {
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
	        label: '高安市',
	        children: [{
          	  value: '2-2-1',
	          label: '高安市2-1-1'
	        }, {
	          value: '2-2-2',
	          label: '高安市2-1-2'
	        }]
	      }]
        }],
        rowIndex: 0
      }
    },
    components: { vCascaderSelect },
    mounted() {
    	this.$nextTick(function () {
    	})
    },
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
	    },
	    handleDelete(index, row) {
	        console.log(index, row);
	    },
	    handleSub() {
	    	this.dialogVisible = false
	    	console.log('this.form===>',this.form)
	    }
    }
  }
</script>
