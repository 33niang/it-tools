<script lang="ts" setup>
import { NIcon, useThemeVars } from 'naive-ui';
import { computed, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import { Heart, Home2, Menu2 } from '@vicons/tabler';

import { storeToRefs } from 'pinia';
import HeroGradient from '../assets/hero-gradient.svg?component';
import MenuLayout from '../components/MenuLayout.vue';
import NavbarButtons from '../components/NavbarButtons.vue';
import { useStyleStore } from '@/stores/style.store';
import type { ToolCategory } from '@/tools/tools.types';
import { useToolStore } from '@/tools/tools.store';
import { useTracker } from '@/modules/tracker/tracker.services';
import CollapsibleToolMenu from '@/components/CollapsibleToolMenu.vue';
import LocaleSelector from '@/modules/i18n/components/locale-selector.vue';

const themeVars = useThemeVars();
const styleStore = useStyleStore();

const { tracker } = useTracker();
const { t } = useI18n();

const toolStore = useToolStore();
const { favoriteTools, toolsByCategory } = storeToRefs(toolStore);

const tools = computed<ToolCategory[]>(() => [
  ...(favoriteTools.value.length > 0 ? [{ name: t('tools.categories.favorite-tools'), components: favoriteTools.value }] : []),
  ...toolsByCategory.value,
]);

// --- 网站运行时间代码 ---
let timer: number | undefined;

function updateSiteRuntime() {
  const siteRuntimeElement = document.getElementById('site-runtime');
  if (siteRuntimeElement) {
    const startDate = new Date('2025-08-28T00:00:00'); // 你的网站上线日期
    const currentDate = new Date();
    const diff = currentDate.getTime() - startDate.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    siteRuntimeElement.innerHTML = `本站已稳定运行: ${days} 天 ${hours} 小时 ${minutes} 分 ${seconds} 秒`;
  }
}

onMounted(() => {
  timer = window.setInterval(updateSiteRuntime, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <MenuLayout class="menu-layout" :class="{ isSmallScreen: styleStore.isSmallScreen }">
    <template #sider>
      <RouterLink to="/" class="hero-wrapper">
        <HeroGradient class="gradient" />
        <div class="text-wrapper">
          <div class="title">
            IT - TOOLS
          </div>
          <div class="divider" />
          <div class="subtitle">
            {{ $t('home.subtitle') }}
          </div>
        </div>
      </RouterLink>

      <div class="sider-content">
        <div v-if="styleStore.isSmallScreen" flex flex-col items-center>
          <LocaleSelector w="90%" />

          <div flex justify-center>
            <NavbarButtons />
          </div>
        </div>

        <CollapsibleToolMenu :tools-by-category="tools" />

        <footer class="footer">
          <div>
            &copy; {{ new Date().getFullYear() }} sansan | This site is based on
            <a href="https://github.com/CorentinTh/it-tools" target="_blank" class="text-indigo-400 hover:underline">it-tools</a> by Corentin Thiercelin,
            licensed under MIT.
          </div>
          <div id="site-runtime" />
        </footer>
      </div>
    </template>

    <template #content>
      <div flex items-center justify-center gap-2>
        <c-button
          circle
          variant="text"
          :aria-label="$t('home.toggleMenu')"
          @click="styleStore.isMenuCollapsed = !styleStore.isMenuCollapsed"
        >
          <NIcon size="25" :component="Menu2" />
        </c-button>
        <c-tooltip :tooltip="$t('home.home')" position="bottom">
          <c-button to="/" circle variant="text" :aria-label="$t('home.home')">
            <NIcon size="25" :component="Home2" />
          </c-button>
        </c-tooltip>
        <command-palette />
        <LocaleSelector v-if="!styleStore.isSmallScreen" />
        <div>
          <NavbarButtons v-if="!styleStore.isSmallScreen" />
        </div>
        <c-tooltip position="bottom" :tooltip="$t('home.support')">
          <c-button
            round
            href="https://www.buymeacoffee.com/cthmsst"
            rel="noopener"
            target="_blank"
            class="support-button"
            :bordered="false"
            @click="() => tracker.trackEvent({ eventName: 'Support button clicked' })"
          >
            {{ $t('home.buyMeACoffee') }}
            <NIcon v-if="!styleStore.isSmallScreen" :component="Heart" ml-2 />
          </c-button>
        </c-tooltip>
      </div>
      <slot />
    </template>
  </MenuLayout>
</template>

<style lang="less" scoped>
.support-button {
  background: rgb(37, 99, 108);
  background: linear-gradient(48deg, rgba(37, 99, 108, 1) 0%, rgba(59, 149, 111, 1) 60%, rgba(20, 160, 88, 1) 100%);
  color: #fff !important;
  transition: padding ease 0.2s !important;
  &:hover {
    color: #fff;
    padding-left: 30px;
    padding-right: 30px;
  }
}
.footer {
  text-align: center;
  color: #838587;
  margin-top: 20px;
  padding: 20px 0;
  font-size: 12px;
}
.sider-content {
  padding-top: 160px;
  padding-bottom: 200px;
}
.hero-wrapper {
  position: absolute;
  display: block;
  left: 0;
  width: 100%;
  z-index: 10;
  overflow: hidden;
  .gradient {
    margin-top: -65px;
  }
  .text-wrapper {
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
    top: 16px;
    color: #fff;
    .title {
      font-size: 25px;
      font-weight: 600;
    }
    .divider {
      width: 50px;
      height: 2px;
      border-radius: 4px;
      background-color: v-bind('themeVars.primaryColor');
      margin: 0 auto 5px;
    }
    .subtitle {
      font-size: 16px;
    }
  }
}
</style>
