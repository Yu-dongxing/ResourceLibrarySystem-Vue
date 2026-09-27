# 资源库管理系统集成系统 (Resource Integration System) 帮助文档

## 1. 项目概况
*   **项目名称**: `resource_integration_system`
*   **当前版本**: `0.7.6`
*   **核心框架**: Vue 3.x
*   **构建工具**: Vue CLI 5
*   **UI 组件库**: Element Plus

## 2. 技术栈架构

该项目采用主要的前端技术栈如下：

*   **核心框架**: `vue` (^3.2.13)
*   **状态管理**: `vuex` (^4.0.0) - 用于管理用户登录状态 (`user` 模块) 和全局配置。
*   **路由管理**: `vue-router` (^4.0.3) - 实现单页应用路由跳转及权限控制。
*   **网络请求**: `axios` (^1.7.9) - 处理 HTTP 请求，封装在 `src/utils/request.js` 中。
*   **UI 框架**: `element-plus` (^2.9.1) - 提供主要的界面组件。
*   **富文本编辑器**:
    *   `@wangeditor/editor` & `editor-for-vue`: 用于一般的富文本编辑。
    *   `element-tiptap`: 另一个富文本编辑器组件。
*   **工具库**:
    *   `spark-md5`: 用于文件上传时的 MD5 哈希计算（支持大文件切片上传）。
    *   `uuid`: 生成唯一标识符。
*   **CSS 预处理**: `less`

## 3. 项目目录结构说明

```text
src/
├── api/                # API 接口统一管理 (按业务模块划分)
│   ├── book.js         # 书籍相关
│   ├── file.js         # 文件操作
│   ├── resource.js     # 资源管理
│   ├── user.js         # 用户及权限
│   └── ...
├── assets/             # 静态资源 (图片、SVG图标)
├── components/         # 业务组件与通用组件
│   ├── main/           # 首页主要内容
│   ├── Login/          # 登录页组件
│   ├── AddResouce/     # 资源添加组件
│   ├── FileUpload...   # 各类文件上传组件 (普通、分片上传)
│   ├── resouce_search/ # 资源搜索组件
│   ├── Study_Details/  # 学习详情页
│   └── 2505/           # 特殊业务模块或仪表盘
├── router/             # 路由配置
│   └── index.js        # 路由定义及导航守卫 (Permission Guard)
├── store/              # Vuex 状态管理
│   ├── index.js
│   └── modules/        # 模块化状态 (如 user.js)
├── utils/              # 工具函数
│   └── request.js      # Axios 封装 (拦截器、错误处理)
├── views/              # 页面级组件 (Layout)
│   ├── index.vue       # 主布局容器
│   ├── Login.vue       # 登录页
│   ├── study.vue       # 学习中心页
│   └── userControl.vue # 用户控制台
├── App.vue             # 根组件
└── main.js             # 入口文件 (挂载 Vue, ElementPlus, Router, Store)
```

## 4. 核心功能模块

通过分析路由 (`router/index.js`) 和组件目录，项目包含以下主要功能：

1.  **用户认证与权限**
    *   登录 (`/login`)
    *   全局路由守卫：检查 `store.state.user.token`，自动获取用户信息，未登录拦截跳转。
2.  **资源管理**
    *   资源列表与搜索 (`/search`)
    *   资源详情展示 (`/detail`)
    *   资源发布/添加 (`/add`, `/addresourcefile`) - *需要权限*
    *   文件上传：支持分片上传 (`FileUploadTrunkPost.vue`)。
3.  **学习中心**
    *   学习列表 (`/study`) - *需要权限*
    *   学习详情 (`/StudyDetails`)
4.  **后台/用户管理**
    *   用户控制台 (`/user`) - *需要权限*
    *   管理员功能 (从组件文件夹推测)：IP日志、系统配置、资源审计、用户数据管理等。
5.  **系统页面**
    *   关于/更新日志 (`/about`, `updataPage`)
    *   异常页面 (404, 500, 201)

## 5. 开发与运行

**安装依赖**
```bash
npm install
```

**启动开发服务器**
```bash
npm run serve
```

**构建生产环境版本**
```bash
npm run build
```

## 6. 代码架构亮点

*   **API 模块化**: 所有后端接口请求都在 `src/api` 下按业务实体（如 book, user, resource）拆分为独立文件，便于维护。
*   **组件化开发**: 页面被拆分为细粒度的组件（如 `header`, `footer`, `loading`），复用性较好。
*   **全量图标引入**: 在 `main.js` 中自动注册了所有 Element Plus 图标，开发时可直接使用。
*   **路由守卫**: 实现了基于 Token 的前端鉴权逻辑，确保受保护页面的安全。
