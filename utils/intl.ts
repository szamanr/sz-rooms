const Languages = ["en"] as const;
type Language = (typeof Languages)[number];

// @todo add intl library
export const $t = (string: string, lang: Language = "en"): string => {
  return string;
};
