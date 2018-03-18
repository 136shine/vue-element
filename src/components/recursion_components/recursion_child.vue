<template>
	<ul id="list">
      <li v-for="(item, key) in my_lists" :key="key">
         {{item.name}}
        <template v-if="item.children">
           <list :my_lists="item.children"></list>
        </template>
      </li>
    </ul>
</template>

<script>
	export default {
		name: 'list',
		data () {
			return {}
		},
		props: ["my_lists"]
	}
</script>
