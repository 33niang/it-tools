import { createI18n } from 'vue-i18n';

// @ts-ignore
import messages from '@intlify/unplugin-vue-i18n/messages';

// --- 新增的逻辑：检测浏览器语言并设置默认语言 ---

// 1. 定义我们项目支持的语言列表（这应该与 locales 文件夹下的文件名对应）
const supportedLocales = ['en', 'zh', 'fr', 'de', 'es', 'pt', 'no', 'uk', 'vi'];

// 2. 设置一个默认的回退语言，当浏览器语言不被支持时使用
const fallbackLocale = 'en';

// 3. 获取浏览器的语言设置（例如 'zh-CN', 'en-US', 'zh'）并只取前半部分（'zh', 'en'）
const browserLocale = navigator.language.split('-')[0];

// 4. 判断浏览器语言是否在我们支持的列表中，如果在，就用它；如果不在，就使用回退语言
const defaultLocale = supportedLocales.includes(browserLocale) ? browserLocale : fallbackLocale;

// --- 修改结束 ---

export const i18n = createI18n({
  legacy: false,
  // 将原先硬编码的 'en' 修改为我们上面计算出的 `defaultLocale`
  locale: defaultLocale,
  fallbackLocale,
  messages,
});

export const install = (app: any) => {
  app.use(i18n);
};
