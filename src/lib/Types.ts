export type ToolItem = {
  name: string;
  title: string;
  syntax?: string;
  syntaxDescription?: string;
  description: string;
};

export type PathLine =
  | { name: string; lineType: 'M'; x: number; y: number }
  | { name: string; lineType: 'L'; x: number; y: number }
  | { name: string; lineType: 'H'; x: number }
  | { name: string; lineType: 'V'; y: number }
  | {
      name: string;
      lineType: 'A';
      rx: number;
      ry: number;
      xRotation: number;
      arc: 0 | 1;
      sweep: 0 | 1;
      x: number;
      y: number;
    }
  | { name: string; lineType: 'Q'; x1: number; y1: number; x: number; y: number }
  | { name: string; lineType: 'T'; x: number; y: number }
  | {
      name: string;
      lineType: 'C';
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      x: number;
      y: number;
    }
  | { name: string; lineType: 'S'; x2: number; y2: number; x: number; y: number }
  | { lineType: 'Z' };
