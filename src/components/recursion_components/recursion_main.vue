<template>
	<div id="main" class="main">
		<list :my_lists="lists"></list>
	</div>
</template>
<script>
	import list from './recursion_child'
	export default {
		data () {
			return {
				lists: [{
					name: 'grandfather',
					children: [{
						name: 'father',
						children: [{
							name: 'son'
						}]
					}]
				}]
			}
		},
		components: { list }
	}
</script>