<template>
    <!-- v-loading.fullscreen.lock="fullscreenLoading"-->
    <div class="main-index" v-loading.fullscreen.lock="isLoading"  element-loading-text="Loading...">
        <div class="item" v-for="item in reversedItems" :key="item.id" @click="getData()">
            <div class="item-img">
                <img src="https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*PXAJTYXseTsAAAAAAAAAAAAADvuFAQ/original" alt="depng">
            </div>
            <div class="item-right" >
                <div class="item-right-title">
                    <p>{{ item.name }}</p>
                    <!-- <p style="font-size: 13px;">weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee                    ewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww</p> -->
                </div>
                <div class="item-right-content">
                    <div class="content-time" title="创建时间">
                        <!-- <img ref="img" src="@/assets/time/time.svg"/> -->
                        <el-tag type="primary">{{ item.createTime }}</el-tag>
                    </div>
                    <div class="content-user" title="作者">
                        <!-- <img ref="img" src="@/assets/user/user.svg"/> -->
                        <el-tag type="primary">{{ item.author }}</el-tag>
                    </div>
                    <div class="content-tab" title="分类">
                        <!-- <img ref="img" src="@/assets/tab/tab.svg"/> -->
                        <el-tag type="primary">{{ item.tab }}</el-tag>
                    </div>
                </div>
                <div class="item-right-button">
                    <a class="button" :href="item.url" target="_blank">
                        <img src="@/assets/info/info.svg" alt="info">
                        查看
                    </a>
                </div>
            </div>
        </div>
        <!-- 加载中 -->
    </div>
</template>
<script>
export default {
  name: 'MainIndex',
  components: {
  },
  data () {
    return {
        isLoading: true,
        tme:null,
        zyk: [
        { id: 1, name: '《移动应用设计开发（UI设计）》', url: 'https://www.yuque.com/tianfangyetan-3iytl/vs9n8l/wkr05l7ya6popqsl?singleDoc# 《移动应用设计开发（UI设计）》', createTime: '2024-12-21', author: 'Admin', tab: '文章' ,img:"https://www.yuque.com/favicon.ico"},
        { id: 2, name: '《移动应用开发（开发设计）》', url: 'https://www.yuque.com/tianfangyetan-3iytl/vs9n8l/min9mvv0lnh99xz1?singleDoc# 《移动应用开发（开发设计）》', createTime: '2025-01-01 20:18:10', author: 'Admin', tab: '文章',img:"https://www.yuque.com/favicon.ico" },
        { id: 3, name: 'Java 全栈知识体系', url: 'https://www.pdai.tech/md/java/basic/java-basic-oop.html', createTime: '2024-12-21', author: 'Admin', tab: '网站' ,img:"https://www.yuque.com/favicon.ico"},
        { id: 4, name: '《学习路线图》', url: 'https://www.yuque.com/tianfangyetan-3iytl/tyqp3d/wvqb03npyns8gpsn?singleDoc# 《学习路线图》', createTime: '2024-12-21', author: 'Admin', tab: '文章',img:"https://www.yuque.com/favicon.ico" },
        { id: 5, name: '《Git常用命令参考手册》', url: 'https://www.yuque.com/tianfangyetan-3iytl/gowu5g/readme?singleDoc# 《Git常用命令参考手册》', createTime: '2024-12-21', author: 'Admin', tab: '文章' ,img:"https://www.yuque.com/favicon.ico"},
        { id: 6, name: '《CSS 属性的速查列表》', url: 'https://www.yuque.com/tianfangyetan-3iytl/vs9n8l/alqinr2im2okntna?singleDoc# 《CSS 属性的速查列表》', createTime: '2024-12-21', author: 'Admin', tab: '文章',img:"https://www.yuque.com/favicon.ico" },
        { id: 7, name: '《HTML 属性的速查列表》', url: 'https://www.yuque.com/tianfangyetan-3iytl/vs9n8l/ewg6gq?singleDoc# 《HTML 属性的速查列表》', createTime: '2024-12-21', author: 'Admin', tab: '文章',img:"https://www.yuque.com/favicon.ico" },
        { id: 8, name: '微服务架构设计与实战(vtwy)', url: 'https://www.yuque.com/jiagouyizhan/yvgusq/lb7rl5hy6vcyf299#', createTime: '2025-1-5', author: 'Admin', tab: '文章',img:"https://www.yuque.com/favicon.ico" },
        { id: 9, name: '数据结构与算法教程', url: 'https://www.hello-algo.com/chapter_hello_algo/', createTime: '2025-1-6', author: 'Admin', tab: '文章',img:"https://www.yuque.com/favicon.ico" },
        { id: 10, name: 'Java基础常见面试题总结', url: 'https://topjavaer.cn/java/java-basic.html', createTime: '2025-01-01 20:18:10', author: 'Admin', tab: '文章',img:"https://topjavaer.cn/favicon.ico" },
        ],
    }
  },
  methods: {
    // 获取数据
    getData () {
        this.tme=setTimeout(() => {
            this.isLoading = false;
            console.log('数据加载完成');
            this.tme=null;
            this.zyk.forEach(item => {
                console.log(item);
            })
        }, 2000);
    },
    setisloading(){
        this.isLoading = !this.isLoading;
        this.zyk.p
    }
  },
  computed: {
    //通过计算属性实现倒序
    reversedItems() {
      return this.zyk.slice().reverse();
    }
  },
  mounted () {
      this.getData();
  },
}
</script>

<style lang="less" scopd>
a {
    // 不需要下划线
    text-decoration: none;

}
.main-index {
    transition: all 3s ease;
    margin-top: 4px;
    box-sizing: border-box;
    padding: 5px;
    width: 100%;
    background-color: var(--bg-100);
    display: grid;
    gap: 10px; /* 使用 gap 替代 grid-gap */
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
    .item{
        margin: 15px 0 5px 2.5%; /* 合并 margin */
        width: 95%;
        height: auto;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 5px;
        display: flex;
        box-shadow: var(--box-shadow-de);
        background-image: linear-gradient(to right, var(--bg-100), var(--bg-200));
        .item-img {
            width: 100px;
            height: 100px;
            border-radius: var(--border-radius-de);
            img {
                width: 100%;
                height: 100%;
                object-fit: cover; /* 确保图片填充 */
            }
        }
        .item-right{
            flex: 1;
            margin-left: 10px;
            // padding: 10px;
            box-sizing: border-box;
            .item-right-title{
                padding: 10px;
                padding-left: 0;
                // border-bottom: 1px solid var(--primary-200);
                p{
                    min-width: 200px;
                    font-size: 20px;
                    font-weight: bold;
                    color: var(--text-100);
                    margin: 0;
                }
            }
            .item-right-content{
                display: flex;
                align-items: center;
                .content-time,.content-user,.content-tab{
                    display: flex;
                    align-items: center;
                    margin-left: 10px; /* 统一 margin */
                    img{
                        width: 20px;
                        height: 20px;
                    }
                    p{
                        margin-left: 0px; /* 统一 margin */
                        font-size: 14px;
                        font-weight: 100;
                        color: rgb(92, 125, 171);
                    }
                }
                .content-user,.content-tab{
                    margin-left: 10px;
                }
                .content-time{
                    margin-left: 0px;
                }

            }
            .item-right-button{
                float: right;
                .button{
                    transition: all 0.3s ease;
                    width: 100px;
                    height: 30px;
                    border-radius: var(--border-radius-de);
                    border: 1.5px solid var(--primary-200); /* 简化 border */
                    background-color: transparent;
                    color: var(--text-100);
                    font-size: 14px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img{
                        width: 20px;
                        height: 20px;
                        margin-right: 5px;
                    }
                }
                .button:hover{
                    background-color: var(--primary-100);
                    color: var(--text-200);
                }
            }
        }
    }
}
/* 当屏幕宽度小于500px */
@media screen and (max-width: 500px) {
  .item-img{
    display: none;
  }
  .main-index{
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
