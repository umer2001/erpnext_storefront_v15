import { useGetLocale, useSetLocale, useTranslate } from "@refinedev/core";
import { useTranslation } from "react-i18next";

const LangSelect = () => {
  const { i18n } = useTranslation();
  const t = useTranslate();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();

  const currentLocale = locale();

  const menuItems = Object.keys(i18n.options.resources ?? {}).map((key) => ({
    key,
    /*
    t(`language.en`)
    t(`language.th`)
    */
    label: t(`language.${key}`),
  }));

  return (
    <select
      onChange={(e) => changeLanguage(e.target.value)}
      value={currentLocale}
    >
      {menuItems.map((item) => (
        <option key={item.key} value={item.key}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default LangSelect;
