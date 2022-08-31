export interface IPrepaymentJSON {
  [key: string]: number;
}

export type ILoanJSONArray = Array<{
  month: number;
  principal: number;
  interest: number;
  emi: number;
  prepayment: number;
  outstanding: number;
}>;
