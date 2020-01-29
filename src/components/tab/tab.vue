<template>
        <div class="tab">
            <router-link tag="div" to="/recommend" class="tab-item">
                <span class="tab-link">推荐</span>
            </router-link>
            <router-link tag="div" to="/singer" class="tab-item">
                <span class="tab-link">歌手</span>
            </router-link>
            <router-link tag="div" to="/rank" class="tab-item">
                <span class="tab-link">排行</span>
            </router-link>
            <router-link tag="div" to="/search" class="tab-item">
                <span class="tab-link">搜索</span>
            </router-link>
        </div>
</template>

<script>
  export default {
      name: 'tab'
  }
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/variable.styl'
        .tab
            display: flex
            align-items: center
            text-align: center
            height: 44px
            font-size: $font-size-medium
            color: $color-text-l
        .tab-item
            flex: 1
            .tab-link
                padding-bottom: 5px
            &.router-link-active
                .tab-link
                    color: $color-theme
                    border-bottom: 2px solid $color-theme
</style>
