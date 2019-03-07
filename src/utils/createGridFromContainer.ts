import { Grid, CellInfo, Rect } from '../types';
import { clamp, floor, round } from 'lodash';
import { getSpan } from './getSpan';

export const createGridForContainer = ({
  container,
  numVerticalCells,
  numHorizontalCells
}: {
  container: HTMLElement;
  numVerticalCells: number;
  numHorizontalCells: number;
}): Grid => {
  return new class Grid {
    get totalHeight() {
      return container.scrollHeight;
    }

    get totalWidth() {
      return container.scrollWidth;
    }

    get cellHeight() {
      return this.totalHeight / numVerticalCells;
    }

    get cellWidth() {
      return this.totalWidth / numHorizontalCells;
    }

    getRectFromCell(data: CellInfo) {
      const { endX, startX, endY, startY, spanX, spanY } = data;
      const bottom = endY * this.cellHeight;
      const top = startY * this.cellHeight;
      const left = startX * this.cellWidth;
      const right = endX * this.cellWidth;
      const height = spanY * this.cellHeight;
      const width = spanX * this.cellWidth;

      return {
        bottom,
        top,
        left,
        right,
        height,
        width,

        // @TODO: check the math
        startX: startX * this.cellWidth,
        endX: endX * this.cellWidth,
        startY: startY * this.cellHeight,
        endY: endY * this.cellHeight
      };
    }

    getCellFromRect(data: Rect) {
      const startX = clamp(
        floor(data.left / this.cellWidth),
        0,
        numHorizontalCells - 1
      );
      const startY = clamp(
        round(data.top / this.cellHeight),
        0,
        numVerticalCells - 1
      );
      const endX = clamp(
        floor(data.right / this.cellWidth),
        0,
        numHorizontalCells - 1
      );
      const endY = clamp(
        round(data.bottom / this.cellHeight) - 1,
        0,
        numVerticalCells - 1
      );
      const spanX = clamp(getSpan(startX, endX), 1, numHorizontalCells);
      const spanY = clamp(getSpan(startY, endY), 1, numVerticalCells);

      return {
        spanX,
        spanY,
        startX,
        startY,
        endX,
        endY
      };
    }

    constrainBoxToOneColumn(box: Rect) {
      return this.getRectFromCell(
        this.getCellFromRect({
          ...box,
          endX: box.startX,
          left: box.startX,
          right: box.startX,
          width: 0
        })
      );
    }
  }();
};
