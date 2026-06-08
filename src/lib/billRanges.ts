// Monthly electric-bill ranges shown in the quiz. `value` is the representative
// dollar amount (range midpoint) sent to the delivery as the numeric
// `monthly_electric_bill` — the buyer's field requires a number, not the label.
export type BillRange = { id: string; label: string; sub: string; value: number };

export const BILL_RANGES: BillRange[] = [
  { id: 'low', label: 'Under $100', sub: 'Low usage', value: 75 },
  { id: 'mid', label: '$100 – $200', sub: 'Average home', value: 150 },
  { id: 'high', label: '$200 – $350', sub: 'Larger home', value: 275 },
  { id: 'xhigh', label: 'Over $350', sub: 'High usage', value: 400 },
];

// Maps a selected bill label back to its numeric amount for delivery.
export function billLabelToAmount(label: string): number | undefined {
  return BILL_RANGES.find((b) => b.label === label)?.value;
}
