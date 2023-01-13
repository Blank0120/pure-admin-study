<script lang="ts" setup>
import { useUserStoreHook } from "@/store/modules/user";
</script>

<script lang="ts">
export default {
  name: "Welcome"
}
</script>

<template>
  <h1>Pure-Admin-Thin 非国际化版本</h1>
  <br>
  <h1 @click="useUserStoreHook().logOut">退出系统</h1>
</template>
