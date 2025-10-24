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

export function getCascadingOptionLabel(value: string, cascadingOptions: any[] | undefined | null, fallbackLabel: string = ''): string {
  if (!cascadingOptions || value == null) return fallbackLabel;

  for (const group of cascadingOptions) {
    if (group.option?.value === value) {
      return group.option.label;
    }
    if (group.children) {
      for (const child of group.children) {
        if (child.option?.value === value) {
          return child.option.label;
        }
      }
    }
  }

  return fallbackLabel;
}

export type { SelectOption };
