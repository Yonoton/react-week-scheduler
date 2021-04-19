import setDay from 'date-fns/setDay';
import compareAsc from 'date-fns/compareAsc';
import { DateRange } from '../types';

export function getEarliestTimeRange(
  ranges: DateRange[],
): DateRange | undefined {
  return [...ranges].sort(([startA], [startB]) =>
    compareAsc(setDay(startA, 0), setDay(startB, 0)),
  )[0];
}
