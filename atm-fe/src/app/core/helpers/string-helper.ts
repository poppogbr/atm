import {fmt} from 'simple-fmt';

export class StringHelper {

  private constructor() { }

  static minLength(value: string, length: number): boolean {
    return value && value.length >= length;
  }

  static isEmptyString(value: string): boolean {
    return '' === value;
  }

  static isNotBlank(value: string): boolean {
    return !StringHelper.isBlank(value);
  }

  static isBlank(value: string): boolean {
    return !value || value.trim() === '';
  }

  static isOfTypeString(value: any): boolean {
    return typeof value === 'string';
  }

  static formatStringByObj(source: string, formattingObj: any): string {
    return fmt.obj(source, formattingObj);
  }
}
