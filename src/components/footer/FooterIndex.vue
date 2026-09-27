<template>
  <footer class="main-footer">
    <!-- Copyright Badge -->
    <div class="footer-badge">
      <span class="copyright-symbol">©</span>
      <span>{{ bq.infoView || '2024-2025 YuDongXing By Vue_SpringBoot' }}</span>
    </div>
    
    <!--备案信息 -->
    <div class="footer-links">
      <a 
        :href="gwa.infoP || 'https://beian.mps.gov.cn/#/query/webSearch?code=34170202000557'" 
        target="_blank" 
        class="footer-link"
      >
        <img src="@/assets/baanImg/baanIMG.png" class="gwa-icon" alt="GWA Icon">
        {{ gwa.infoView || '皖公网安备34170202000557号' }}
      </a>
      
      <span class="divider">·</span>

      <a href="https://beian.miit.gov.cn/" target="_blank" class="footer-link">
        {{ icp.infoView || '皖ICP备2024037036号-2' }}
      </a>
    </div>
  </footer>
</template>

<script>
import { sysinfoApi } from '@/api/sys_info'

export default {
  name: 'FooterIndex',
  data() {
    return {
      icp: {},
      gwa: {},
      bq: {}
    }
  },
  methods: {
    async getGWABaAiInfo() {
      try {
        const res = await sysinfoApi.getICPBaAiInfo()
        if (res.data) this.icp = res.data
      } catch (e) {}
    },
    async getICPBaAiInfo() {
      try {
        const res = await sysinfoApi.getGWABaAiInfo()
        if (res.data) this.gwa = res.data
      } catch (e) {}
    },
    async getSysCopyrightInfo() {
      try {
        const res = await sysinfoApi.getSysCopyrightInfo()
        if (res.data) this.bq = res.data
      } catch (e) {}
    },
    getAll() {
      this.getICPBaAiInfo()
      this.getGWABaAiInfo()
      this.getSysCopyrightInfo()
    }
  },
  mounted() {
    this.getAll()
  },
  watch: {
    '$route'() {
      this.getAll()
    }
  }
}
</script>

<style lang="less" scoped>
.main-footer {
  margin-top: auto;
  padding: 48px 24px;
  text-align: center;
  border-top: 1px solid var(--app-border-color);
  background-color: var(--app-bg-color); /* Use app bg instead of footer bg for seamless look */
}

.footer-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 20px;
  border: 1px solid var(--app-border-color-light);
  border-radius: 9999px;
  font-size: 13px;
  color: var(--app-text-color-regular);
  margin-bottom: 20px;
  font-weight: 500;
  transition: all 0.3s ease;

  .copyright-symbol {
    font-size: 16px;
    line-height: 1;
  }
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: var(--app-text-color-secondary);
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--app-text-color-secondary);
  transition: color 0.2s;
  text-decoration: none;
  
  &:hover {
    color: var(--primary-200);
  }

  .gwa-icon {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }
}

.divider {
    color: var(--app-border-color-light);
    font-weight: bold;
}
</style>