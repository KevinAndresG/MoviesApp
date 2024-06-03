export enum AlertType {
  Success = 'Success',
  Info = 'Info',
  Center = 'Warning',
  Error = 'Error',
}
export enum AlertPositionX {
  Left = 'Left',
  Right = 'Right',
  Center = 'Center',
}
export enum AlertPositionY {
  Top = 'Top',
  Middle = 'Middle',
  Bottom = 'Bottom',
}
export interface AlertProps {
  showAlert: boolean;
  title: string;
  description: string;
  type: AlertType;
  controled: boolean;
  cancelBtn: boolean;
  confirmBtn: boolean;
  delay: number;
  x: AlertPositionX;
  y: AlertPositionY;
}
