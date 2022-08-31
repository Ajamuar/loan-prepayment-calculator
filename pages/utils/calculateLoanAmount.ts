import { ILoanJSONArray, IPrepaymentJSON } from "../types";

function PMT(ir: number, np: number, pv: number) {
  /*
   * ir   - interest rate per month
   * np   - number of periods (months)
   * pv   - present value
   * fv   - future value
   * type - when the payments are due:
   *        0: end of the period, e.g. end of month (default)
   *        1: beginning of period
   */
  var pmt, pvif;

  let fv = 0;
  let type = 0;

  if (ir === 0) return -(pv + fv) / np;

  pvif = Math.pow(1 + ir, np);
  pmt = (-ir * (pv * pvif + fv)) / (pvif - 1);

  if (type === 1) pmt /= 1 + ir;

  return pmt;
}

const calculateLoanAmount = (
  principal: number,
  rate: number,
  tenure: number,
  prepaymentJSON: IPrepaymentJSON
) => {
  let loanJSONArray: ILoanJSONArray = [];
  let effectiveRate = rate / 100 / 12;

  for (let month = 1; month <= tenure; month++) {
    let interest = principal * effectiveRate;

    let emi = Math.abs(PMT(effectiveRate, tenure - month + 1, principal));
    let outstanding = principal + interest - emi;

    let key: string = month + "";

    if (prepaymentJSON[key]) {
      outstanding = outstanding - prepaymentJSON[key];
    }

    loanJSONArray.push({
      month,
      principal,
      interest,
      emi,
      outstanding: outstanding > 0 ? outstanding : 0,
      prepayment: prepaymentJSON[key],
    });

    principal = outstanding > 0 ? outstanding : 0;
  }

  return loanJSONArray;
};

export default calculateLoanAmount;
