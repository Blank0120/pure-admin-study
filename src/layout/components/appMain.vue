<!-- TODO -->
<script setup lang="ts">
import { h, defineComponent, Transition, computed } from 'vue';

const transitions = computed(() => {
  return route => {
    return route.meta.transition;
  };
});

const transitionMain = defineComponent({
  render() {
    return h(
      Transition,
      {
        name:
          transitions.value(this.route) &&
          this.route.meta.transition.enterTransition
            ? "pure-classes-transition"
            : (transitions.value(this.route) &&
                this.route.meta.transition.name) ||
              "fade-transform",
        enterActiveClass:
          transitions.value(this.route) &&
          `animate__animated ${this.route.meta.transition.enterTransition}`,
        leaveActiveClass:
          transitions.value(this.route) &&
          `animate__animated ${this.route.meta.transition.leaveTransition}`,
        mode: "out-in",
        appear: true
      },
      {
        // TODO => not understand this one
        default: () => [this.$slots.default()]
      }
    );
  },
  props: {
    route: {
      type: undefined,
      required: true
    }
  }
});
</script>

<template>
  <section>
    <router-view>
      <template #default="{ Component, route }">
        <div>
          <transitionMain :route="route">
            <component
              :is="Component"
              :key="route.fullPath"
            />
          </transitionMain>
        </div>
      </template>
    </router-view>
  </section>
</template>

<style scoped>

</style>
