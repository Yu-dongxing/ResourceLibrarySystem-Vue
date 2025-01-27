<template>
    <!-- v-loading.fullscreen.lock="fullscreenLoading"   v-for="item in reversedItems" :key="item.id" @click="getData()"-->
    <div class="main-index" v-loading.fullscreen.lock="isLoading"  element-loading-text="Loading...">
        <div class="item" v-for="item in reversedItems" :key="item.id">
            <div class="item-img">
                <img src="https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*PXAJTYXseTsAAAAAAAAAAAAADvuFAQ/original" alt="depng">
            </div>
            <div class="item-right" >
                <div class="item-right-title">
                    <p>{{ item.name }}</p>
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
        <el-card shadow="always"  class="card"  v-if="isDev">
            <div class="card-lift">
                <el-image src="https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*PXAJTYXseTsAAAAAAAAAAAAADvuFAQ/original" alt="" class="lift-img"></el-image>
            </div>
            <div class="card-right">
                <div class="right-contion">
                    <div class="contion-title">
                        <span class="text">{{ item.name }}</span>
                    </div>
                    <div class="contion-tags">
                        <el-tag>
                            <img ref="img" src="@/assets/time/time.svg"  />
                            {{ item.createTime }} | 
                            <img ref="img" src="@/assets/user/user.svg"/>
                            {{ item.author }} | 
                            <img ref="img" src="@/assets/tab/tab.svg"/>
                            {{ item.tab }}</el-tag> 
                    </div>
                </div>
            </div>
            <template #footer>
                <div class="card-button">
                    
                        <!-- <a class="button" :href="item.url" target="_blank">
                            <img src="@/assets/info/info.svg" alt="info">
                            查看
                        </a> -->
                        <el-link class="bu" :underline="false" :href="item.url" target="_blank">
                            <span><img src="@/assets/info/info.svg" alt="info"></span>
                            <span>查看</span>
                        </el-link>
                    
                </div>
            </template>
        </el-card>
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
        isDev:false,
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
        { id: 10, name: 'Java基础常见面试题总结', url: 'https://topjavaer.cn/java/java-basic.html', createTime: '2025-01-01 20:18:10', author: 'Admin', tab: '网站',img:"https://topjavaer.cn/favicon.ico" },
        ],
    }
  },
  methods: {
    // 获取数据
    getData () {
        this.tme=setTimeout(() => { // 设置一个定时器，模拟数据加载过程
            this.isLoading = false; // 数据加载完成后，将isLoading状态设置为false
            console.log('数据加载完成'); // 控制台输出数据加载完成的信息
            this.tme=null; // 清除定时器
            this.zyk.forEach(item => { // 遍历zyk数组，并输出每个元素
                console.log(item);
            })
        }, 20); // 定时器延迟2秒执行
    },
    setisloading(){ // 设置isLoading状态
        this.isLoading = !this.isLoading; // 切换isLoading状态
        this.zyk.p // 访问zyk数组的p属性（注意：这里可能存在错误，因为zyk是一个数组，没有p属性）
    }
  },
  computed: {
    //通过计算属性实现倒序
    reversedItems() {
      return this.zyk.slice().reverse(); // 返回zyk数组的倒序副本
    }
  },
  mounted () {
      this.getData(); // 组件挂载完成后，调用getData方法获取数据
  },
}
</script>

<style lang="less" scopd>
a {
    // 不需要下划线
    text-decoration: none; // 移除链接的下划线装饰

}
.main-index {
    transition: all 3s ease; /* 设置所有属性的过渡效果，持续时间为3秒，使用ease缓动函数 */
    margin-top: 4px; /* 设置顶部外边距为4px */
    box-sizing: border-box; /* 设置盒模型为border-box，即宽度和高度包含边框和内边距 */
    padding: 5px; /* 设置内边距为5px */
    width: 100%; /* 设置宽度为100% */
    background-color: var(--bg-100); /* 设置背景颜色，使用CSS变量--bg-100 */
    display: grid; /* 设置为网格布局 */
    gap: 10px; /* 使用 gap 替代 grid-gap */
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr)); /* 定义网格布局的列，使用 repeat 函数自动填充，每列的最小宽度为 500px，最大宽度为 1fr（剩余空间的一份） */
    grid-template-rows: repeat(auto-fill, minmax(100px, 1fr)); /* 定义网格布局的行，使用 repeat 函数自动填充，每行的最小高度为 100px，最大高度为 1fr
    （剩余空间的一份） */
    // aspect-ratio: 4 / 3;
    .el-card__body{
        padding: 10px;
        display: flex;
    }
    .card{
        height: auto;
        min-height: 100px;
        .card-lift{
            // border: 0.1px solid #000000;
            .lift-img{
                aspect-ratio: 16/9;
            }
        }
        .card-right{
            // border: 0.1px solid #000000;
            width: 100%;
            .right-contion{
                .contion-title{
                    margin-bottom: 10px;
                    .text{
                        font-size: 18px;
                        font-weight: bold;
                    }
                }
                .contion-tags{
                    .el-tag__content{
                        display: flex;
                        align-items: center; /* 垂直居中 */
                        img{
                            width: 15px;
                            height: 15px;
                        }
                    }
                }
            }
        }
        .card-button{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .el-link__inner {
                display: inline-flex;
                justify-content: center;
                align-items: stretch;

            }
            .bu{
                float:right;
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
        }
    }
    .item{
        margin: 15px 0 5px 2.5%; /* 合并 margin */
        width: 95%; /* 设置元素的宽度为95% */
        height: auto; /* 设置元素的高度为自动，根据内容调整高度 */
        border-radius: 10px; /* 设置元素的边框圆角为10像素 */
        box-sizing: border-box;
        padding: 5px; /* 设置元素的内边距为5像素 */
        display: flex; /* 设置元素的显示方式为flex，启用Flexbox布局 */
        box-shadow: var(--box-shadow-de); /* 设置元素的阴影效果，使用CSS变量--box-shadow-de定义的阴影样式 */
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
  .item-img,.card-lift{
    display: none;
  }
  .main-index{
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
