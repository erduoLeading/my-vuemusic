<template>
    <music-list :title="title" :bg-image="bgImage" :songList="songList"></music-list>
</template>

<script>
	/* eslint-disable no-console */

	import MusicList from '../music-list/music-list'
	import {mapGetters} from 'vuex'

	export default {
		components: {
			MusicList
		},
		computed: {
			title() {
				return this.singer.singer_name
			},
			bgImage() {
				return this.singer.singer_pic
			},
			mid() {
				return this.singer.singer_mid
			},
			...mapGetters(['singer'])
		},
		data() {
			return {
				songList: []
			}

		},
		created() {
			// eslint-disable-next-line no-console
			console.log(this.singer);
			this._getDetail(this.mid)
		},
		methods: {
			_getDetail(mid) {
				console.log("mid:", mid)
				let data = {
					mid: mid
				}
				this.$http.post('/singerDetail', JSON.stringify(data))
					.then(res => {
						// eslint-disable-next-line no-console
						console.log(res.data.songList)
						this.songList = res.data.songList || res.data[0].songList;
					})
			}
		}
	}
</script>

<style lang="stylus" scoped>
    .slide-enter-active, .slide-leave-active
        transition: all .3s

    .slide-enter, slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>
