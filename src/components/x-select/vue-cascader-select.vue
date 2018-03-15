<template>
	<div class="wrap" :class="[pForm,tableData,rIndex,optsAll]" ref="c_select">
		<el-single-select :options="optTemp1" :food="pForm.address1" @tableChange="getChildChange1"></el-single-select>
		<el-single-select :options="optTemp2" :food="pForm.address2" @tableChange="getChildChange2"></el-single-select>
		<el-single-select :options="optTemp3" :food="pForm.address3" @tableChange="getChildChange3"></el-single-select>
	</div>
</template>

<script>
	import elSingleSelect from './vue-single-select'
	export default {
	    data() {
	      return {
	      	optAll: [],
	      	optTemp1: [],
	      	optTemp2: [],
	      	optTemp3: [],
	        changeOpt: []
	      }
	    },
	    mounted() {
	    	this.$nextTick(function () {
	    		this.handleSelectChange(this.optsAll[0].value, this.optsAll, 1)
	    		console.log(this.pForm, this.tableData)
	    	})
	    },
	    components: { elSingleSelect },
	    props: ['optsAll', 'pForm', 'tableData', 'rIndex'],
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

	  			if (optArr[num].children) {
	  				console.log(optArr[num].children[0].value)
	  				optChildVal = optArr[num].children[0].value
	  				this.handleSelectChange(optChildVal, optArr[num].children)
	  			}

	  			this.optAll.push(opt1)

	  			switch (index) {
	  				case 1: {
	  					this.optTemp1 = this.optAll[2]
	  		    		this.optTemp2 = this.optAll[1]
	  		    		this.optTemp3 = this.optAll[0]
	  		    		break
	  				}
	  				case 2: {
	  					this.optTemp2 = this.optAll[1]
	  		    		this.optTemp3 = this.optAll[0]
	  		    		break
	  				}
	  				case 3: break
	  			}
	    	},
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
		              this.tableData[this.rIndex][alias] = item2.label
		            }
		          }
		        }
		    },

		    handleChange1(val) {
	    		this.optAll = []

	    		this.handleSelectChange(val, this.optsAll, 1)

	    		this.pForm.address1 = val
	    		this.pForm.address2 = this.optTemp2[0].value
	    		this.pForm.address3 = this.optTemp3[0].value
	    	},
	    	handleChange2(val) {
	    		
	    		for (let i = 0; i < this.optsAll.length; i++) {
	    			console.log(this.pForm.address1 === this.optsAll[i].value, this.optsAll[i], this.optsAll[i].children)
	    			if (this.pForm.address1 === this.optsAll[i].value) {
	    				this.changeOpt = this.optsAll[i].children
	    			}
	    		}

	    		this.optAll = []
	    		this.handleSelectChange(val, this.changeOpt, 2)

	    		this.pForm.address2 = val
	    		this.pForm.address3 = this.optTemp3[0].value
	    	},
	    	handleChange3(val) {
	    	},

	    	getChildChange1 (val) {
	    		this.pForm.address1 = val
	    		this.handleTableChange(val, this.optTemp1, 'address1_alias')
	    		this.handleChange1(val)
	    	},
	    	getChildChange2 (val) {
	    		this.pForm.address2 = val
	    		this.handleTableChange(val, this.optTemp2, 'address2_alias')
	    		this.handleChange2(val)
	    	},
	    	getChildChange3 (val) {
	    		this.pForm.address3 = val
	    		this.handleTableChange(val, this.optTemp3, 'address3_alias')
	    	}
	    }
	}
</script>

<style scoped></style>