/**
 * Example:
 *
 * ```
 * type MyType =
 *   | { type: 'str'; str: string; }
 *   | { type: 'num'; num: number; };
 * type MyTypeBy<T extends 'str' | 'num'> = FindBy<MyType, T, 'type'>;
 * const myType: MyTypeBy<'str'> = {
 *  type: 'str',
 *  str: 'myType should be automatically inferred here',
 * };
 *
 * ```
 */
export type FindBy<
  Union,
  IdentifierValue,
  IdentifierKey extends string,
> = Union extends { [key in IdentifierKey]: IdentifierValue } ? Union : never;
