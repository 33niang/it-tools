import { createI18n } from 'vue-i18n';

// @ts-ignore
import messages from '@intlify/unplugin-vue-i18n/messages';

// --- 自动检测浏览器语言的逻辑 (保留) ---
const supportedLocales = ['en', 'zh', 'fr', 'de', 'es', 'pt', 'no', 'uk', 'vi'];
const fallbackLocale = 'en';
const browserLocale = navigator.language.split('-')[0];
const defaultLocale = supportedLocales.includes(browserLocale) ? browserLocale : fallbackLocale;


// 创建 i18n 实例 (保留)
export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale,
  messages,
});

// --- 这是我们之前遗漏的、现在加回去的 translate 函数 ---
export const translate = (key: string) => {
  if (!key) {
    return '';
  }
  return i18n.global.t(key);
};
// --- 添加结束 ---


export const install = (app: any) => {
  app.use(i18n);
};
