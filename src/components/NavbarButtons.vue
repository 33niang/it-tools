<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { BrandGithub, Moon, Sun, Compass, ActivityHeartbeat } from '@vicons/tabler'
import { useStyleStore } from '@/stores/style.store'
import { config } from '@/config'

const styleStore = useStyleStore()
const { t } = useI18n()
</script>

<template>
  <div flex items-center justify-center gap-2>
    <c-tooltip :tooltip="t('navbar.status_page')" position="bottom">
      <c-button
        circle
        variant="text"
        tag="a"
        href="https://status.zhou.su"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="t('navbar.status_page')"
      >
        <NIcon size="25" :component="ActivityHeartbeat" />
      </c-button>
    </c-tooltip>

    <c-tooltip :tooltip="t('navbar.navigation_home')" position="bottom">
      <c-button
        circle
        variant="text"
        tag="a"
        href="https://zhou.su"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="t('navbar.navigation_home')"
      >
        <NIcon size="25" :component="Compass" />
      </c-button>
    </c-tooltip>

    <c-tooltip :tooltip="t('home.toggleTheme')" position="bottom">
      <c-button
        circle
        variant="text"
        :aria-label="t('home.toggleTheme')"
        @click="styleStore.toggleTheme()"
      >
        <NIcon size="25" :component="styleStore.isDark ? Sun : Moon" />
      </c-button>
    </c-tooltip>

    <c-tooltip :tooltip="t('home.github')" position="bottom">
      <c-button
        circle
        variant="text"
        tag="a"
        :href="config.links.github"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="t('home.github')"
      >
        <NIcon size="25" :component="BrandGithub" />
      </c-button>
    </c-tooltip>
  </div>
</template>
