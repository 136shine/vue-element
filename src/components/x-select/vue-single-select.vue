<template>
	<el-select v-model="foodChild" placeholder="请选择" @change="handleChange">
	    <el-option
	      v-for="item in options"
	      :key="item.value"
	      :label="item.label"
	      :value="item.value">
	    </el-option>
	</el-select>
</template>

<script>
	export default {
	    data() {
	      return {
	      	foodChild: this.food
	      }
	    },
	    props: ['options', 'food'],
	    methods: {
	    	handleChange(val) {
	    		// console.log(val)
	    		this.$emit('tableChange', val)
	    	}
	    }
	}
</script>

<style scoped></style>