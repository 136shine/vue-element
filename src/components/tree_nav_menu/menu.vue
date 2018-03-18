<template>
    <ul>
        <li v-for="(item, key) in model" :key="key">
            <div @click='toggle'>
                <i v-if='item.childTreeNode.length' class="fa " :class="[open?'el-icon-remove-outline':'el-icon-circle-plus-outline']"></i>
                <i v-if='!item.childTreeNode.length' class="el-icon-document"></i> {{item.menuName}}
            </div>
            <ul v-show="open" v-if='item.childTreeNode.length'>
                <items :model='item.childTreeNode'></items>
            </ul>
        </li>
    </ul>
</template>

<script type="text/javascript">
    export default {
        name: 'items', // 递归组件 必须name项
        props: ['model'],
        data() {
            return {
                open: false
            }
        },
        methods: {
            toggle: function() {
                this.open = !this.open
            }
        }
    }
</script>