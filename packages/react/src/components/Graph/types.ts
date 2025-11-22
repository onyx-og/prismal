export enum GraphType {
  LINE = 'LINE',
  LINE_MARKERS = 'LINE_MARKERS',
  LINE_CURVED = 'LINE_CURVED',
  LINE_CURVED_MARKERS = 'LINE_CURVED_MARKERS',
  AREA_STACKED = 'AREA_STACKED',
  BAR_VERTICAL = 'BAR_VERTICAL',
  BAR_HORIZONTAL = 'BAR_HORIZONTAL',
  BAR_STACKED = 'BAR_STACKED',
  BAR_GROUPED = 'BAR_GROUPED',
  CANDLESTICK = 'CANDLESTICK',
}

// Data point interfaces for clarity
export interface SimpleDataPoint {
  x: string | number;
  y: number;
}

// FIX: Added CandlestickDataPoint interface to provide strong typing for candlestick chart data.
export interface CandlestickDataPoint {
  x: string | number;
  open: number;
  high: number;
  low: number;
  close: number;
}
