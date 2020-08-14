import { environmentBase, Environment } from "./environmentBase";

export const environment: Environment = {
  ...environmentBase,
  production: true,
  apiUrl: "api/",
  i18nPath: "assets/i18n/",
} as Environment;
