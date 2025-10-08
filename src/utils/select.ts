import { SelectOption } from '../types';

export function getOptionLabel<T extends SelectOption>(value: string, options: T[] | undefined | null, fallbackLabel: string = ''): string {
  if (!options || value == null) return fallbackLabel;

  const option = options.find((opt) => opt.value === value);
  return option?.label ?? fallbackLabel;
}

export function getOptionByValue<T extends SelectOption>(value: string, options: T[] | undefined | null): T | undefined {
  if (!options || value == null) return undefined;
  return options.find((opt) => opt.value === value);
}

export type { SelectOption };
