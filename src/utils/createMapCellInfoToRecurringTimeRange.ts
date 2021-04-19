import addMinutes from 'date-fns/addMinutes';
import compareAsc from 'date-fns/compareAsc';
import endOfDay from 'date-fns/endOfDay';
import isBefore from 'date-fns/isBefore';
import min from 'date-fns/min';
import range from 'lodash/range';
import { DateRange, MapCellInfoToDateRange } from '../types';
import { cellToDate } from './cellToDate';

export type RecurringTimeRange = DateRange[];

export const createMapCellInfoToRecurringTimeRange: MapCellInfoToDateRange = ({
  fromY: toMin,
  fromX: toDay,
  originDate,
}) => ({ startX, startY, endX, spanY }) => {
  const result = range(startX, endX + 1)
    .map(i => {
      const startDate = cellToDate({
        startX: i,
        startY,
        toMin,
        toDay,
        originDate,
      });
      let endDate = min([addMinutes(startDate, toMin(spanY)),endOfDay(startDate)]);

      const range: DateRange = isBefore(startDate, endDate)
        ? [startDate, endDate]
        : [endDate, startDate];

      return range;
    })
    .sort((range1, range2) => compareAsc(range1[0], range2[0]));

  return result;
};
