<script setup lang="ts">
import { childrenType } from "../../types";
import { ref, PropType } from "vue";

const props = defineProps({
  item: {
    type: Object as PropType<childrenType>
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ""
  }
});

const onlyOneChild: childrenType = ref(null);

function hasOneShowingChild(
  children: childrenType[] = [],
  parent: childrenType
) {
  const showingChildren = children.filter((item: any) => {
    onlyOneChild.value = item;
    return true;
  });

  if (showingChildren[0]?.meta?.showParent) {
    return false;
  }

  if (showingChildren.length === 1) {
    return true;
  }

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }
  return false;
}

</script>

<template>
  <template v-if="
    hasOneShowingChild(props.item.children, props.item) &&
    (!onlyOneChild.children || onlyOneChild.noShowingChildren)
  ">
    <el-menu-item :index="props.basePath">
      <template #title>
        <div>
          <el-tooltip placement="top" :offset="-10" :disabled="!onlyOneChild.showTooltip">
            <template #content>
              {{ onlyOneChild.meta.title }}
            </template>
            <span>
              {{ onlyOneChild.meta.title }}
            </span>
          </el-tooltip>
        </div>
      </template>
    </el-menu-item>
  </template>

  <el-sub-menu v-else :index="props.item.path">
    <template #title>
      <el-tooltip placement="top" :offset="-10" :disabled="!props.item.showTooltip">
        <template #content>
          {{ props.item.meta.title }}
        </template>
        <div>
          <span>
            {{ props.item.meta.title }}
          </span>
        </div>
      </el-tooltip>
    </template>
    <sidebar-item v-for="child in props.item.children" :key="child.path" :is-nest="true" :item="child"
      :base-path="child.path"/>
  </el-sub-menu>
</template>
