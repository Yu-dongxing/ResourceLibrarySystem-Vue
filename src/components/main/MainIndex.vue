<template>
    <div v-loading.fullscreen.lock="isLoading" element-loading-text="Loading...">
        <div class="main-index" v-if="zyk.length > 0">
            <div 
                class="resource-item main-index-hover" 
                v-for="item in zyk" 
                :key="item.id"
                @click="goDetail(item.id)"
            >
                <div class="item-icon">
                    <el-image :src="item.img" fit="cover">
                        <template #error>
                            <div class="image-slot">
                                <el-icon><Picture /></el-icon>
                            </div>
                        </template>
                    </el-image>
                </div>
                
                <div class="item-info">
                    <h3 class="item-title">{{ item.name }}</h3>
                    
                    <div class="item-meta">
                        <div class="meta-tag">
                            <el-icon><Timer /></el-icon>
                            <span>{{ item.updateTime }}</span>
                        </div>
                        <el-divider direction="vertical" />
                        <div class="meta-tag">
                            <el-icon><User /></el-icon>
                            <span>{{ item.author }}</span>
                        </div>
                        <el-divider direction="vertical" />
                        <div class="meta-tag">
                            <el-icon><CollectionTag /></el-icon>
                            <span>{{ item.tab }}</span>
                        </div>
                    </div>
                </div>

                <div class="item-action">
                    <el-button type="primary" link>
                        <el-icon><ArrowRight /></el-icon>
                    </el-button>
                </div>
            </div>
        </div>
        <el-empty v-else-if="!isLoading" description="暂无资源" />
    </div>
</template>

<script>
import { resourceApi } from '@/api/resource'

export default {
    name: 'MainIndex',
    data() {
        return {
            isLoading: true,
            zyk: [],
        }
    },
    methods: {
        async getData() {
            try {
                this.isLoading = true
                const res = await resourceApi.getResources()
                this.zyk = res.data
            } catch (error) {
                console.error('获取资源列表失败:', error)
            } finally {
                this.isLoading = false
            }
        },
        goDetail(id) {
            this.$router.push({ path: '/detail', query: { id: id } })
        },
    },
    mounted() {
        this.getData();
    },
}
</script>

<style lang="less" scoped>
.main-index {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 16px;
    padding: 16px;
    transition: all 0.3s ease;
}

.resource-item {
    display: flex;
    align-items: center;
    padding: 16px;
    background-color: var(--app-content-bg-color);
    border: 1px solid var(--app-border-color-light);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);

    &:hover {
        transform: translateY(-2px);
        border-color: var(--primary-200);
        box-shadow: var(--box-shadow-de);
        
        .item-action {
            transform: translateX(4px);
            opacity: 1;
        }
    }
}

.item-icon {
    width: 54px;
    height: 54px;
    flex-shrink: 0;
    border-radius: 10px;
    overflow: hidden;
    background-color: var(--app-bg-color);
    border: 1px solid var(--app-border-color-light);

    .el-image {
        width: 100%;
        height: 100%;
    }

    .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: var(--app-text-color-secondary);
        font-size: 24px;
    }
}

.item-info {
    flex: 1;
    margin-left: 16px;
    overflow: hidden;

    .item-title {
        margin: 0 0 8px 0;
        font-size: 16px;
        font-weight: 600;
        color: var(--app-text-color-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .item-meta {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: var(--app-text-color-secondary);

        .meta-tag {
            display: flex;
            align-items: center;
            gap: 4px;
            
            .el-icon {
                font-size: 14px;
            }
        }

        .el-divider--vertical {
            margin: 0 10px;
            border-color: var(--app-divider-color);
        }
    }
}

.item-action {
    margin-left: 8px;
    opacity: 0.5;
    transition: all 0.3s ease;
    
    .el-button {
        font-size: 18px;
        padding: 4px;
    }
}

@media screen and (max-width: 600px) {
    .main-index {
        grid-template-columns: 1fr;
        padding: 12px;
    }
    
    .resource-item {
        padding: 12px;
    }
    
    .item-icon {
        width: 48px;
        height: 48px;
    }
    
    .item-info .item-title {
        font-size: 15px;
    }
}
</style>