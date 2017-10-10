<template>
  <transition name="fade">
    <router-view :data="seller"></router-view>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        seller: {
          num:2222
        }
      };
    }
  };
</script>
