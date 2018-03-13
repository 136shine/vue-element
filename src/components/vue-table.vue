<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    border
    @expand-change="handleExpand"
    @selection-change="handleSelectionChange"
    :default-sort="sortObj"
    :max-height="maxHeight"
    ref="x_table">
    <el-table-column
      v-if="isCheckbox" 
      type="selection">
    </el-table-column>
    <el-table-column
      v-for="(item, key) in tableKey"
      v-if="!item.template" 
      :key="key"
      :label="item.label"
      :prop="item.value"
      :sortable="item.isSortable"
      :width="item.width"
      header-align="center">
        <el-table-column
          v-for="(item1, key1) in item.child"
          v-if="item.child && !item1.template" 
          :key="key1"
          :label="item1.label"
          :prop="item1.value"
          :sortable="item1.isSortable"
          :width="item1.width"
          header-align="center">
        </el-table-column>
    </el-table-column>
    <el-table-column
      v-else
      :key="key"
      :label="item.label"
      :prop="item.value"
      :sortable="item.isSortable"
      :width="item.width"
      header-align="center">
      <el-table-column
          v-for="(item1, key1) in item.child"
          v-if="item.child && item1.template" 
          :key="key1"
          :label="item1.label"
          :prop="item1.value"
          :sortable="item1.isSortable"
          :width="item1.width"
          header-align="center">
          <template slot-scope="scopeChild">
            <slot :name="item1.value" :$index="scopeChild.$index" :row="scopeChild.row"></slot>
          </template>
      </el-table-column>
      <template slot-scope="scope">
        <slot :name="item.value" :$index="scope.$index" :row="scope.row"></slot>
      </template>
    </el-table-column>
    <el-table-column
      v-if="isExpand&&isExpandOnly" 
      type="expand">
      <template slot-scope="scope">
        <slot name="expand" :$index="scope.$index" :row="scope.row"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        multipleSelection: []
      }
    },
    mounted () {},
    props: ['tableData', 'tableKey', 'isExpand', 'isExpandOnly', 'isSortable', 'sortObj', 'isCheckbox', 'maxHeight'],
    methods: {
      handleExpand(row, expandRows){
        if(this.isExpand && this.isExpandOnly){
          this.$refs.x_table.store.states.expandRows = expandRows.length ? [row] : []
        }
      },
      handleSelectionChange(val){
        // console.log(val)
        this.multipleSelection = val
      } 
    }
  }
</script>