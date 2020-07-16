export interface ListProps<T> {
  data?: Array<T>;
  showButtons?: boolean;
  showGotoElement?: boolean;
  orientation?: "vertical" | "horizontal";
  component?: (value: T, index: number ) => JSX.Element;
  width?: number;
  height?: number;
  isDragable?: boolean
}
