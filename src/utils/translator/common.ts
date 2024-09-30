import {
  FormatXMLElementFn,
  Options as IntlMessageFormatOptions,
  PrimitiveType,
} from 'intl-messageformat';
import { useIntl } from 'react-intl';

/**
 * It's a wrapper around the `formatMessage` function from `react-intl` that allows you to use it in a
 * functional component
 * Use in the body of function or class components
 * Don't use in nested functions of function or class components
 * @param {string} key - The key of the translation to use.
 * @param {Record<string, PrimitiveType | FormatXMLElementFn<string, string>> | undefined} [values] -
 * This is an object that contains the values that will be used to replace the placeholders in the
 * translation string.
 * @param {IntlMessageFormatOptions | undefined} [opts] - IntlMessageFormatOptions
 * @returns A function that takes a key, values, and opts and returns a string.
 */
export function trans(
  key: string,
  values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>> | undefined,
  opts?: IntlMessageFormatOptions | undefined
): string {
  const intl = useIntl();

  return intl.formatMessage({ id: key }, values, opts);
}

/**
 * It takes a translation key, and returns the translation with the first letter capitalized
 * Use in the body of function or class components
 * Don't use in nested functions of function or class components
 * @param {string} key - The key of the translation to use.
 * @param {Record<string, PrimitiveType | FormatXMLElementFn<string, string>> | undefined} [values] -
 * This is an object that contains the values that will be used to replace the placeholders in the
 * translation string.
 * @param {IntlMessageFormatOptions | undefined} [opts] - IntlMessageFormatOptions
 * @returns A function that takes a key, values, and opts and returns a string.
 */
export function transCFL(
  key: string,
  values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>> | undefined,
  opts?: IntlMessageFormatOptions | undefined
): string {
  return trans(key, values, opts);
}
