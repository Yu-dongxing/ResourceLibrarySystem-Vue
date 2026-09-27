# 系统布局重构方案

本方案旨在根据提供的 `cs.html` 布局文件，将系统现有的“顶部导航栏 + 内容”布局重构为“侧边栏 + 顶部搜索栏 + 内容”的现代化布局。

## 1. 总体结构分析

### 现有结构 (`views/index.vue`)
- `HeaderIndex` (顶部导航)
- `el-scrollbar` (主内容区)
  - `Search_App` (移动端搜索)
  - `router-view` (页面内容)
- `FooterIndex` (底部版权)

### 目标结构 (`cs.html` 参考)
- `Sidebar` (左侧固定导航栏)
  - Logo / 标题
  - 导航菜单 (首页、学习任务、我的资源等)
  - 分类菜单 (代码库、技术文档等)
  - 底部主题切换按钮
- `Main` (右侧主体区域)
  - `Header` (顶部固定栏)
    - 搜索框 (居中)
    - 右侧操作区 (添加资源按钮、头像)
  - `Content` (内容滚动区)
    - `router-view` (页面内容，如资源列表、详情页等)
  - `Footer` (底部版权信息)

## 2. 详细修改步骤

### 2.1 创建新的布局组件

我们将修改 `src/views/index.vue` 或创建一个新的 `Layout.vue` 组件（建议直接修改 `index.vue` 以保持路由配置不变）。

**文件:** `src/views/index.vue`

**HTML 结构变更:**
```html
<template>
  <div class="app-layout">
    <!-- 1. 左侧侧边栏 -->
    <aside class="sidebar">
      <!-- Logo 区域 -->
      <div class="sidebar-header">...</div>
      
      <!-- 导航菜单 -->
      <nav class="sidebar-nav">
        <!-- 路由链接 router-link -->
      </nav>
      
      <!-- 底部操作 (主题切换) -->
      <div class="sidebar-footer">...</div>
    </aside>

    <!-- 2. 右侧主体内容 -->
    <main class="main-container">
      <!-- 顶部 Header -->
      <header class="main-header">
        <!-- 搜索框 -->
        <div class="search-bar">...</div>
        
        <!-- 右侧用户区 -->
        <div class="user-actions">...</div>
      </header>

      <!-- 内容滚动区域 -->
      <el-scrollbar class="content-scroll">
        <div class="content-wrapper">
           <router-view></router-view>
        </div>
        <!-- 底部 Footer -->
        <FooterIndex />
      </el-scrollbar>
    </main>
  </div>
</template>
```

### 2.2 样式迁移与适配 (Less/CSS)

由于项目使用 Element Plus 和 Less，我们需要将 `cs.html` 中的 Tailwind 类转换为标准的 CSS/Less 样式，并使用我们之前统一的 Theme 变量。

**关键样式映射:**
- 背景色: `bg-background-light` -> `var(--app-bg-color)`
- 侧边栏背景: `bg-white` -> `var(--sidebar-bg-color)`
- 边框颜色: `border-slate-200` -> `var(--app-border-color)`
- 文字颜色: `text-slate-900` -> `var(--app-text-color-primary)`

### 2.3 组件功能拆分与迁移

**A. 侧边栏 (Sidebar)**
- 将原 `HeaderIndex.vue` 中的导航链接移动到侧边栏。
- 菜单项：首页 (`/`)、学习任务 (`/study`)、我的资源 (`/user` 或 `/my-resources`)、更新日志 (`/about`)。
- 分类菜单：根据 `cs.html` 的设计，可以是静态的或者从后端获取的分类。
- 主题切换：保留原有的逻辑，样式改为侧边栏底部按钮。

**B. 顶部栏 (Header)**
- 搜索功能：集成 `Search_App` 组件的功能，将其样式调整为 Header 中间的搜索框。
- 添加资源按钮：从原 Header 移至此处。
- 用户头像：从原 Header 移至此处。

**C. 底部栏 (Footer)**
- 保留 `FooterIndex.vue`，放置在内容滚动区的底部。

### 2.4 具体实现细节

#### 侧边栏样式
```less
.sidebar {
  width: 256px; // w-64
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: var(--sidebar-bg-color);
  border-right: 1px solid var(--app-border-color);
  display: flex;
  flex-direction: column;
  z-index: 20;
}
```

#### 主体区域样式
```less
.main-container {
  margin-left: 256px; // lg:ml-64
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--app-bg-color);
}
```

#### 响应式处理
- 在移动端 (< 768px)，隐藏侧边栏，或者改为抽屉式 (Drawer) 菜单。
- `main-container` 的 `margin-left` 在移动端应为 0。

## 3. 下一步行动计划

1.  **备份代码**: 确保现有 `src/views/index.vue` 和 `src/components/header/HeaderIndex.vue` 安全备份。
2.  **重写 `src/views/index.vue`**: 按照上述结构重写模板和样式。
3.  **移除/改造旧组件**:
    - `HeaderIndex.vue`: 可能不再需要，或者被拆分为 Sidebar 和 TopHeader。
    - 确保 `Search_App` 逻辑正确集成到新的 Header 中。
4.  **验证**: 检查路由跳转、主题切换、搜索功能是否正常。

请确认是否开始执行此重构方案？
