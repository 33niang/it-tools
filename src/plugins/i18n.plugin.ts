import { createI18n } from 'vue-i18n'
// @ts-expect-error: messages are generated dynamically by a plugin
import messages from '@intlify/unplugin-vue-i18n/messages'

// 自动检测浏览器语言的逻辑 (保留)
const supportedLocales = ['en', 'zh', 'fr', 'de', 'es', 'pt', 'no', 'uk', 'vi']
const fallbackLocale = 'en'
const browserLocale = navigator.language.split('-')[0]
const defaultLocale = supportedLocales.includes(browserLocale) ? browserLocale : fallbackLocale

// 创建 i18n 实例 (保留)
export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale,
  messages,
})

// 这是符合 main.ts 期望的正确导出结构
export const i18nPlugin = {
  install(app: any) {
    app.use(i18n)
  },
}

// 这是其他工具文件需要的 translate 辅助函数 (保留)
export function translate(key: string) {
  if (!key)
    return ''

  return i18n.global.t(key)
}
