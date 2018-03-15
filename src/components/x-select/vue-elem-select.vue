<!-- vue-elem-select.vue -->
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
      <el-table-column
        prop="address1"
        label="省"
        width="180"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="address2"
        label="市区"
        width="180"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="address3"
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
  	<!-- <span>{{value}}</span> -->
  	<el-dialog
	  title="提示"
	  :visible.sync="dialogVisible"
	  width="30%">
	   <el-form ref="form" :model="form" label-width="80px" style="width: 300px">
  		<el-form-item label="食品">
		  	<el-select v-model="form.food" placeholder="请选择" @change="handleChange">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="地址">
		  	<el-select v-model="form.address1" placeholder="请选择" @change="handleChange1">
			    <el-option
			      v-for="item in options1"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
			<el-select v-model="form.address2" placeholder="请选择" @change="handleChange2">
			    <el-option
			      v-for="item in options2"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
			<el-select v-model="form.address3" placeholder="请选择" @change="handleChange3">
			    <el-option
			      v-for="item in options3"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
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
  export default {
    data() {
      return {
      	dialogVisible: false,
      	form: {
          food: '',
          address1: '',
          address2: '',
          address3: ''
        },
      	tableData: [{
	        food: '2',
	        alias: '双皮奶',
	        address1: '1',
	        address1_alias: '北京市',
	        address2: '1-1',
	        address2_alias: '海淀区',
	        address3: '1-1-1',
	        address3_alias: '双清路'
	    }, {
	        food: '3',
	        alias: '蚵仔煎',
	        address1: '1',
	        address1_alias: '北京市',
	        address2: '1-2',
	        address2_alias: '朝阳区',
	        address3: '1-2-1',
	        address3_alias: '朝阳区1-2-1'
	    }],
        options: [{
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
        options1: [{
          value: '1',
          label: '北京市'
        }, {
          value: '2',
          label: '江西省'
        }],
        options2: [{
          value: '1',
          id: '1',
          label: '海淀区'
        }, {
          value: '2',
          id: '1',
          label: '朝阳区'
        }, {
          value: '3',
          id: '2',
          label: '宜春市'
        }, {
          value: '4',
          id: '2',
          label: '高安市'
        }],
        options3: [],
        _index: 0,
        optAll: [],
        optChild: [],
        changeOpt: []
      }
    },
    mounted() {
    	this.$nextTick(function () {
    		this.handleTableChange(this.tableData)
    		this.handleSelectChange(this.optionsAddr[0].value, this.optionsAddr, 1)
    		this.options1 = this.optAll[2]
    		this.options2 = this.optAll[1]
    		this.options3 = this.optAll[0]
    	})
    },
    methods: {
    	handleSelectChange(val, optArr, index) {
    		let opt1 = [], num = 0, optChildVal

    		for (let opt of optArr) {
    			let { value, label } = opt
    			opt1.push({ value, label })

    			for (let i = 0; i < opt1.length; i++) {
    				if (opt1[i].value === val) {
    					num = i
    				}
    			}
    		}

    		console.log(opt1[num], optArr[num])
			if (optArr[num].children) {
				console.log(optArr[num].children[0].value)
				optChildVal = optArr[num].children[0].value
				this.handleSelectChange(optChildVal, optArr[num].children)
			}

			this.optAll.push(opt1)

			switch (index) {
				case 1: {
					this.options1 = this.optAll[2]
		    		this.options2 = this.optAll[1]
		    		this.options3 = this.optAll[0]
		    		break
				}
				case 2: {
					this.options2 = this.optAll[1]
		    		this.options3 = this.optAll[0]
		    		break
				}
				case 3: break
			}
    	},
    	handleTableChange(data) {
    		if (typeof data == 'object') {
    			for (let item1 of data) {
	    			for (let item2 of this.options) {
	    				if (item1.food === item2.value) {
	    					item1['alias'] = item2.label
	    				}
	    			}
	    		}
    		} else {
    			for (let item2 of this.options) {
    				if (data === item2.value) {
    					this.tableData[this._index]['alias'] = item2.label
    				}
    			}
    		}
    	},
    	handleChange(val) {
    		this.handleTableChange(val)
    	},

    	handleChange1(val) {
    		this.optAll = []

    		this.handleSelectChange(val, this.optionsAddr, 1)

    		this.form.address1 = val
    		this.form.address2 = this.options2[0].value
    		this.form.address3 = this.options3[0].value
    	},
    	handleChange2(val) {
    		
    		for (let i = 0; i < this.optionsAddr.length; i++) {
    			console.log(this.form.address1 === this.optionsAddr[i].value, this.optionsAddr[i], this.optionsAddr[i].children)
    			if (this.form.address1 === this.optionsAddr[i].value) {
    				this.changeOpt = this.optionsAddr[i].children
    			}
    		}

    		this.optAll = []
    		this.handleSelectChange(val, this.changeOpt, 2)

    		this.form.address2 = val
    		this.form.address3 = this.options3[0].value
    	},
    	handleChange3(val) {
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
