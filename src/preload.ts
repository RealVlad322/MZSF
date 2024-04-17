/* eslint-disable no-extend-native,lodash/prefer-is-nil,lodash/prefer-lodash-typecheck */
const ID_REGEX = /^[a-f0-9]{24}$/;

window.isArray = Array.isArray;
window.isBoolean = (x: unknown): x is boolean => typeof x === 'boolean';
window.isFunction = <T extends Function>(x: unknown): x is T => typeof x === 'function';
window.isId = (x: unknown): x is string => ID_REGEX.test(x as string);
window.isNil = (x: unknown): x is null | undefined => typeof x === 'undefined' || x === null;
window.isNumber = Number.isFinite as (x: unknown) => x is number;
window.isObject = (x: unknown): x is object => typeof x === 'object' && x !== null;
window.isString = (x: unknown): x is string => typeof x === 'string';
window.notEmpty = Boolean as unknown as typeof notEmpty;

export {};
