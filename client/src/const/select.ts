export type TSelectOption = {
  value: string;
  label: string;
}

export type TSelectOptions = TSelectOption[]

export const countryOptions: TSelectOptions = [
  {
    value: 'US',
    label: 'United States',
  },
  {
    value: 'UK',
    label: 'United Kingdom',
  },
  {
    value: 'CA',
    label: 'Canada',
  },
];

export const cardTypeOptions: TSelectOptions = [
  {
    value: 'iTunes Card',
    label: 'iTunes Card',
  },
  {
    value: 'Amazon Card',
    label: 'Amazon Card',
  },
  {
    value: 'Google Play Card',
    label: 'Google Play Card',
  },
  {
    value: 'Steam Card',
    label: 'Steam Card',
  },
  {
    value: 'Other Cards',
    label: 'Other Cards',
  },
];

export const cardCurrencyOptions: TSelectOptions = [
  {
    value: 'USD',
    label: 'Dollars',
  },
  {
    value: 'CNY',
    label: 'Yuan',
  },
  {
    value: 'Euro',
    label: 'Euro',
  },
];
