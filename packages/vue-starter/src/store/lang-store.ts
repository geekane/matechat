import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";
import McI18n from "@matechat/core/Locale";
import { LangType } from "@/types";

export const useLangStore = defineStore("lang", () => {
  const { locale } = useI18n();
  const currentLang = ref(LangType.CN);

  const updateCurrentLang = (val: LangType) => {
    currentLang.value = val;
    McI18n.use(val);
    locale.value = val;
    localStorage.setItem("matechat-lang", val);
  };

  return { currentLang, updateCurrentLang };
});
