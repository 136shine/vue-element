<template>
	<div id="vue-table-column" class="table-column-wrap" :class="item">
	    <el-table-column
	      :class="item"
	      v-if="item.template"
	      :label="item.label"
	      :prop="item.value"
	      :sortable="item.isSortable"
	      :width="item.width"
	      header-align="center">
	      	<template slot-scope="scope">
		        <slot :name="item.value" :$index="scope.$index" :row="scope.row"></slot>
		    </template>
	    </el-table-column>
	    <el-table-column
	      v-if="item.child"
	      :label="item.label"
	      :prop="item.value"
	      :sortable="item.isSortable"
	      :width="item.width"
	      header-align="center">
	      	<template>
	      		<vue-table-column :tKey="item.child" v-for="(item1, key) in item.child" :item="item1" :key="key"></vue-table-column>
	      	</template>
	    </el-table-column> 
	    <el-table-column
	      v-if="!item.child && !item.template"
	      :label="item.label"
	      :prop="item.value"
	      :sortable="item.isSortable"
	      :width="item.width"
	      header-align="center">
	    </el-table-column>
	    <!-- <el-table-column
	      v-for="(item, key) in tKey"
	      v-if="item.template"
	      :key="key"
	      :label="item.label"
	      :prop="item.value"
	      :sortable="item.isSortable"
	      :width="item.width"
	      header-align="center">
	      	<template slot-scope="scope">
		        <slot :name="item.value" :$index="scope.$index" :row="scope.row"></slot>
		    </template>
	    </el-table-column>

	    <el-table-column
	      v-for="(item, key) in tKey"
	      v-if="item.child"
	      :key="key"
	      :label="item.label"
	      :prop="item.value"
	      :sortable="item.isSortable"
	      :width="item.width"
	      header-align="center">
	      	<template>
	      		<vue-table-column :tKey="item.child"></vue-table-column>
	      	</template>
	    </el-table-column> 
	    <el-table-column
	      v-for="(item, key) in tKey"
	      v-if="!item.child && !item.template"
	      :key="key"
	      :label="item.label"
	      :prop="item.value"
	      :sortable="item.isSortable"
	      :width="item.width"
	      header-align="center">
	    </el-table-column> -->

	    <!-- <el-table-column
	      v-for="(item, key) in tKey"
	      :key="key"
	      :label="item.label"
	      :prop="item.value"
	      :sortable="item.isSortable"
	      :width="item.width"
	      header-align="center">
	      	
		    <template v-if="item.template" slot-scope="scope">
			    <slot :name="item.value" :$index="scope.$index" :row="scope.row"></slot> -->
		        <!-- <span v-if="item.template">lllll</span> -->
		        <!-- <vue-table-column v-if="item.child" :tKey="item.child"></vue-table-column> -->
		    <!-- </template> -->
		    <!-- <vue-table-column v-if="item.child" :tKey="item.child"></vue-table-column> -->
		   <!--  <template v-if="item.child">
	      		<vue-table-column :tKey="item.child"></vue-table-column>
	      	</template> -->

	      	<!-- <template v-if="item.template" slot-scope="scope">
		        <slot :name="item.value" :$index="scope.$index" :row="scope.row"></slot>
		    </template> -->
		    <!-- <template v-if="item.child">
	      		<vue-table-column :tKey="item.child"></vue-table-column>
	      	</template> -->
	    <!-- </el-table-column> -->
	</div>
</template>
<script>
	export default {
		name: 'vue-table-column',
		data () {
			return {
				isShow: false,
			}
		},
		mounted () {
			this.$nextTick(function () {
				setTimeout(function () {
					this.isShow = true
					console.log(this.tData)
				}, 6000)
			})
		},
		props: ['tData', 'tKey', 'item'],
	}
</script>