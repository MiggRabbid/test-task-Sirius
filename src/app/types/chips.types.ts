export enum ChipsStatus {
  // eslint-disable-next-line no-unused-vars
  default = 'default',
  // eslint-disable-next-line no-unused-vars
  info = 'info',
  // eslint-disable-next-line no-unused-vars
  success = 'success',
  // eslint-disable-next-line no-unused-vars
  error = 'error',
  // eslint-disable-next-line no-unused-vars
  warning = 'warning',
}

export interface IChipsData {
  id: number;
  text: string;
  status: ChipsStatus;
}
