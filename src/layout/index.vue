<script setup lang="ts">
import appMain from "./components/appMain.vue";
import Vertical from "./components/sidebar/vertical.vue";

</script>

<template>
	<div>
		<Vertical />
		<div>
			<div>
				<!-- 主体内容 -->
				<app-main />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>

</style>
