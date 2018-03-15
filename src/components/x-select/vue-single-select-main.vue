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
				<el-single-select :options="opts" :food="form.food" @tableChange="getChildChange"></el-single-select>
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
	import elSingleSelect from './vue-single-select'
	export default {
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
		        alias: '双皮奶'
		    }, {
		        food: '3',
		        alias: '蚵仔煎'
		    }],
		    form: {
	          food: ''
	        }
	      }
	    },
	    components: { elSingleSelect },
	    mounted() {
	    	this.$nextTick(function () {
	    		this.handleTableChange(this.tableData, this.opts, 'alias')
	    	})
	    },
	    methods: {
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
	    	getChildChange (val) {
	    		this.form.food = val
	    		this.handleTableChange(val, this.opts, 'alias')
	    	},

	    	handleEdit(index, row) {
		        this.dialogVisible = true
		        this.form = row
		        this._index = index
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

<style scoped></style>