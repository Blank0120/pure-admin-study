<script setup lang="ts">
import SidebarItem from "./sidebarItem.vue";
import { computed } from "vue";
import { usePermissionStoreHook } from "@/store/modules/permission";
import { useRoute } from "vue-router";

const route = useRoute();

const menuData = computed(() => {
  return usePermissionStoreHook().wholeMenus;
});
</script>

<template>
      <el-menu
        router
        :default-active="route.path"
      >
        <sidebar-item
          v-for="routes in menuData"
          :key="routes.path"
          :item="routes"
          :base-path="routes.path"
        />
      </el-menu>
</template>
