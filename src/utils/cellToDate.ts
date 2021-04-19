import addMinutes from 'date-fns/addMinutes';
import addDays from 'date-fns/addDays';

export const cellToDate = ({
  startX,
  startY,
  toMin,
  originDate,
}: {
  startX: number;
  startY: number;
  toMin: (y: number) => number;
  toDay: (x: number) => number;
  originDate: Date;
}) => addMinutes(addDays(originDate, startX), toMin(startY));
