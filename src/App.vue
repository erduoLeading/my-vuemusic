<template>
    <div id="app">
        <m-header></m-header>
        <tab></tab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <player></player>
    </div>
</template>
<script>
	import MHeader from "./components/m-header/m-header.vue"
	import Tab from "./components/tab/tab.vue"
    import Player from './components/player/player'
	// 当然为了节约性能, 我们完全可以吧router-view放在一个keep-alive里面
	export default {
		components: {
			MHeader,
			Tab,
			Player
		}
	}
</script>

<style scoped lang="stylus">

</style>
