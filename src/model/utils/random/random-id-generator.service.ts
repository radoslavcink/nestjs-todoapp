/**
 * Generates random string composed from hexadecimal digits of given length.
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomIdGeneratorService {
  private staticValues?: string[];
  private staticValuesIx = 0;

  /**
   * Sets one or more static values over which to cycle instead of creating random.
   */
  public setStaticValues(...value: string[]) {
    this.staticValues = value;
  }

  /**
   * Resets the behaviour to generate random ids.
   */
  public clearStaticValues() {
    this.staticValues = undefined;
  }

  public generateId(length = 15): string {
    if (length <= 0) {
      throw new Error('Length must be positive integer.');
    }

    if (this.staticValues !== undefined) {
      return this.staticValues[
        this.staticValuesIx++ % this.staticValues.length
      ];
    }

    let id = '';
    while (true) {
      id += Math.random().toString(16).replace('.', '');
      if (id.length >= length) {
        return id.substring(0, length);
      }
    }
  }
}
