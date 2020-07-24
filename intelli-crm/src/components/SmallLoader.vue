<template lang='pug'>
  img.small-loader(src='../assets/small_loader.svg' width=30 height=20)
</template>

<script>
  export default {
    name: 'SmallLoader'
  }
</script>

<style lang="scss">
.small-loader {
  transform: translateY(4px);
  margin: 0 5px 0 7px;
}
</style>