<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>
<script >
    import BScroll from 'better-scroll'
    export default {
//以下都是一些基本的组件配置信息
        props: {
            probeType: { //1代表，手指滑动结束才派发scroll事件
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            listenScroll: {
                type: Boolean,
                default: false
            },
            data: { //用于观察，每次数据变化重新渲染滚动条
                type: Array,
                default: null
            },
            pullup: {
                type: Boolean,
                default: false
            },
            beforeScroll: {
                type: Boolean,
                default: false
            },
            refreshDelay: {
                type: Number,
                default: 20
            }
        },
        mounted() {
            setTimeout(() => { //隔一段时间启动渲染,等dom渲染完毕
                this._initScroll()
            }, 20)
        },
        methods: {
            _initScroll() { //初始化
                if (!this.$refs.wrapper) { //没有值就直接return
                    return
                }
                this.scroll = new BScroll(this.$refs.wrapper, { //新来一个实例
                    probeType: this.probeType,
                    click: this.click
                })
                if (this.listenScroll) {
                    let me = this
                    this.scroll.on('scroll', (pos) => {
                        me.$emit('scroll', pos)
                    })
                }
                if (this.pullup) {
                    this.scroll.on('scrollEnd', () => {
                        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                            this.$emit('scrollToEnd')
                        }
                    })
                }
                if (this.beforeScroll) {
                    this.scroll.on('beforeScrollStart', () => {
                        this.$emit('beforeScroll')
                    })
                }
            },
            disable() {
                this.scroll && this.scroll.disable()
            },
            enable() {
                this.scroll && this.scroll.enable()
            },
            refresh() { //重新计算高度
                this.scroll && this.scroll.refresh()
            },
            scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll,
                    arguments)
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll,
                    arguments)
            }
        },
        watch: {// 监听数据的变化
            data() { // 数据变化之后, 重新设置scroll高度, 延迟设置
                setTimeout(() => {
                    this.refresh()
                }, this.refreshDelay)
            }
        }
    }
</script>
<style scoped lang="stylus">
</style>
