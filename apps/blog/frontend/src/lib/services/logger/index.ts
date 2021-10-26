import { AppConfig } from '$config';
import { EnvMode } from '@thunberg/common';

/* eslint-disable no-console */
export class LoggerService {
  private get suppressed() {
    return AppConfig.mode === EnvMode.PRODUCTION;
  }

  public error(...errors: Array<string | Error>): void {
    !this.suppressed && console.error('Error:', ...errors);
  }

  public info(...infos: Array<string>): void {
    !this.suppressed && console.info('Info:', ...infos);
  }

  public warning(...warnings: Array<string>): void {
    !this.suppressed && console.warn('Warning: ', ...warnings);
  }
}

export const Logger = new LoggerService();
