// Path manipulation helpers

import { languages } from "../i18n/languages";

/** Extract the effective current resource route, removing baseUrl and lang from the current navigation URL */
export function getResourceRoute(urlPathname: string) {
  // base path of the site from Vite config
  const baseUrl = import.meta.env.BASE_URL;

  // language codes for regex (es. en|it|fr|de)
  const langs: string = Object.keys(languages).join("|");

  // remove baseUrl + language from the pathname to extract the resource path
  // (normalizes multiple slashes when there is no baseUrl)
  return urlPathname.replace(new RegExp(`^${baseUrl}/*(${langs})`), '');
}