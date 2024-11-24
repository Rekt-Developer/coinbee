import { FC } from 'react'
import Select, { SingleValue } from 'react-select'
import { TSelectOption, TSelectOptions } from '../../const/select'
import styles from './CustomSelect.module.scss';



type TCustomSelectProps = {
  options: TSelectOptions;
  label: string;
  currentValue: string;
  placeholder?: string;
  setCurrentValue: (value: string) => void;
}

export const CustomSelect: FC<TCustomSelectProps> = ({ options, label, currentValue, setCurrentValue, placeholder }) => {

  const getValue = () => {
    return options.find(c => c.value === currentValue) || null;
  }

  const handleChange = (newValue: SingleValue<TSelectOption>) => {
    setCurrentValue(newValue ? newValue.value : '');
  }

  return (
    <div className={styles.wrapp}>
      <h4>{label}</h4>
      <Select 
        classNamePrefix="custom-select"
        options={options} 
        placeholder={placeholder} 
        onChange={handleChange} 
        value={getValue()} 
      />
    </div>
  );
}