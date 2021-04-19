import getDay from 'date-fns/getDay';
import isSameDay from 'date-fns/isSameDay';
import setDay from 'date-fns/setDay';
import { CellInfo, DateRange, MapCellInfoToDateRange } from '../types';
import { createMapCellInfoToContiguousDateRange } from './createMapCellInfoToContiguousDateRange';

const constrainToOneDay = ([start, end]: DateRange): DateRange => {
  if (!isSameDay(end, start)) {
    return [start, setDay(end, getDay(start))];
  }

  return [start, end];
};

export const createMapCellInfoToSingleDayRange: MapCellInfoToDateRange = options => {
  const mapToRange = createMapCellInfoToContiguousDateRange(options);
  return (info: CellInfo): DateRange[] => {
    return [constrainToOneDay(mapToRange(info)[0])];
  };
};
