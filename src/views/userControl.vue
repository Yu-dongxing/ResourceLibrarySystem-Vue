<template>
     <div class="container">
        <header class="header">
            <!-- 头部：用户头像、用户名 -->
            <div class="profile-header">
                 <img class="avatar" src="avatar.png" alt="头像">
                <h2 class="username">用户名</h2>
            </div>
        </header>

        <main class="main-content">
            <!-- 主要内容区域 -->
           <nav class="menu">
                <ul class="menu-list">
                    <li class="menu-item"><a href="#">个人信息</a></li>
                    <li class="menu-item"><a href="#">账户设置</a></li>
                    <li class="menu-item"><a href="#">订单管理</a></li>
                    <li class="menu-item"><a href="#">收藏夹</a></li>
                     <li class="menu-item"><a href="#">消息中心</a></li>
                </ul>
            </nav>
            <section class="content-area">
                <!-- 具体内容放在这里 -->
                <div class="content">
                    <h3>欢迎来到个人中心！</h3>
                    <p>这里可以管理你的个人信息、账户设置、订单和收藏夹。</p>
                    <p>点击左侧菜单选择要查看的内容</p>
                 </div>
            </section>
        </main>
     </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    /* min-height: 100vh; 最小高度占满整个视口 */
}

/* 头部 */
.header {
    background-color: #fff;
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid #eee;
}
.profile-header{
    display: flex;
    align-items: center;
    justify-content: center;
}
.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 10px;
}

.username {
    margin: 0;
}

/* 主要内容区域 */
.main-content {
    display: flex;
    flex: 1; /* 占据剩余空间 */
    padding: 20px;
    max-width: 1200px; /* 最大宽度，避免在超大屏幕下内容过宽 */
    margin: 0 auto; /* 内容水平居中 */

}

/* 菜单 */
.menu {
    width: 200px;
    background-color: #f9f9f9;
    border-right: 1px solid #eee;
    padding-right: 20px;
    flex-shrink: 0; /* 避免菜单缩小 */
}

.menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu-item a {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: #333;
    transition: background-color 0.3s ease;
}

.menu-item a:hover {
    background-color: #eee;
}

/* 内容区域 */
.content-area {
    flex: 1;
    padding-left: 20px;
}
.content{
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.content h3{
  margin-top:0;
}


/* 底部
.footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 10px;
    font-size: 14px;
} */


/* 手机端适配 */
@media (max-width: 768px) {
  .profile-header{
        flex-direction: column;
    }
    .avatar {
        margin-bottom: 10px;
         margin-right: 0;
    }
    .main-content {
        flex-direction: column; /* 在手机端改为垂直布局 */
        padding: 10px;
    }

    .menu {
        width: 100%; /* 菜单宽度充满屏幕 */
        border-right: none;
        border-bottom: 1px solid #eee;
          padding-right:0;
        
    }
      .menu-list {
         display: flex;
         overflow-x: auto; /* 水平滑动展示菜单 */
        padding: 10px 0;
        
    }

    .menu-item {
        flex: 0 0 auto; /* 不会拉伸，根据内容自适应 */
         margin-right: 10px;
          white-space: nowrap; /* 防止文字换行 */
          
    }
    .menu-item a{
       padding: 8px 12px;
       border-radius: 5px;
       background-color: #f9f9f9;
    }
    .menu-item a:hover {
        background-color: #eee;
    }
      .content-area {
        padding-left: 0;
    }

    .content {
          padding: 10px;
    }
}
</style>