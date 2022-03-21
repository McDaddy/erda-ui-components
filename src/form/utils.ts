import React from 'react';
import { IFormItemProps } from '@formily/antd';
import { FieldValidator } from '@formily/core';

type CT = React.ComponentClass | React.FunctionComponent;

export interface Field<T extends CT = any> {
  name: string;
  title?: string;
  defaultValue?: unknown;
  type?: string;
  required?: boolean;
  validator?: FieldValidator;
  component: T;
  customProps?: T extends CT ? React.ComponentProps<T> : never;
  wrapperProps?: IFormItemProps;
  items?: Field[];
}

export interface CheckType {
  <
    T1 extends CT,
    T2 extends CT,
    T3 extends CT,
    T4 extends CT,
    T5 extends CT,
    T6 extends CT,
    T7 extends CT,
    T8 extends CT,
    T9 extends CT,
    T10 extends CT,
    T11 extends CT,
    T12 extends CT,
    T13 extends CT,
    T14 extends CT,
    T15 extends CT,
    T16 extends CT,
    T17 extends CT,
    T18 extends CT,
    T19 extends CT,
    T20 extends CT,
    T21 extends CT,
    T22 extends CT,
    T23 extends CT,
    T24 extends CT,
    T25 extends CT,
    T26 extends CT,
    T27 extends CT,
    T28 extends CT,
    T29 extends CT,
    T30 extends CT,
  >(
    args:
      | [Field<T1>]
      | [Field<T1>, Field<T2>]
      | [Field<T1>, Field<T2>, Field<T3>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>, Field<T26>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>, Field<T26>, Field<T27>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>, Field<T26>, Field<T27>, Field<T28>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>, Field<T26>, Field<T27>, Field<T28>, Field<T29>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>, Field<T26>, Field<T27>, Field<T28>, Field<T29>, Field<T30>]
      ):
      | [Field<T1>]
      | [Field<T1>, Field<T2>]
      | [Field<T1>, Field<T2>, Field<T3>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>, Field<T26>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>, Field<T26>, Field<T27>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>, Field<T26>, Field<T27>, Field<T28>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>, Field<T26>, Field<T27>, Field<T28>, Field<T29>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>, Field<T26>, Field<T27>, Field<T28>, Field<T29>, Field<T30>]
    }

// eslint-disable-next-line import/prefer-default-export
export const createFields: CheckType = (fieldList: any) => fieldList;
