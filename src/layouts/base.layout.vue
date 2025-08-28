<script lang="ts" setup>
import { NIcon, useThemeVars } from 'naive-ui'
import { computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Heart, Home2, Menu2 } from '@vicons/tabler'

import { storeToRefs } from 'pinia'
import HeroGradient from '../assets/hero-gradient.svg?component'
import MenuLayout from '../components/MenuLayout.vue'
import NavbarButtons from '../components/NavbarButtons.vue'
import { useStyleStore } from '@/stores/style.store'
import { config } from '@/config'
import type { ToolCategory } from '@/tools/tools.types'
import { useToolStore } from '@/tools/tools.store'
import { useTracker } from '@/modules/tracker/tracker.services'
import CollapsibleToolMenu from '@/components/CollapsibleToolMenu.vue'
import LocaleSelector from '@/modules/i18n/components/locale-selector.vue'

const themeVars = useThemeVars()
const styleStore = useStyleStore()

const { tracker } = useTracker()
const { t } = useI18n()

const toolStore = useToolStore()
const { favoriteTools, toolsByCategory } = storeToRefs(toolStore)

const tools = computed<ToolCategory[]>(() => [
  ...(favoriteTools.value.length > 0 ? [{ name: t('tools.categories.favorite-tools'), components: favoriteTools.value }] : []),
  ...toolsByCategory.value,
])

// --- 为网站运行时间添加的代码 ---
let timer: number | undefined

function updateSiteRuntime() {
  const siteRuntimeElement = document.getElementById('site-runtime')
  if (siteRuntimeElement) {
    // !!!重要!!! 请在这里设置你的网站上线日期和时间
    const startDate = new Date('2025-08-28T00:00:00')
    const currentDate = new Date()
    const diff = currentDate.getTime() - startDate.getTime()

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) /
