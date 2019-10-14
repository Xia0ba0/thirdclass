<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive include="activity">
        <router-view class="Router"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
    watch: {
      $route (to, from) {
        if (to.meta.level > from.meta.level) {
          this.transitionName = 'slide-left'
        } else {
          this.transitionName = 'slide-right'
        }
      }
    }
  }
</script>

<style>
  .Router {
    transition: all .35s ease;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    /* opacity: 0; */
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    /* opacity: 0; */
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
  }
</style>
