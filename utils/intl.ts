const Languages = ["en"] as const;
type Language = (typeof Languages)[number];

const translate = (s: string) => s;

// @todo add intl library
export const $t = (
  string: string,
  variables?: Record<string, string | number>,
): string => {
  if (!variables) return translate(string);

  let parsedString = string;
  for (const [key, value] of Object.entries(variables)) {
    parsedString = parsedString.replaceAll(`{${key}}`, `${value}`);
  }

  return parsedString;
};
