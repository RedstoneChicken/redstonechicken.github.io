
import CustomMultiSelect from '@/components/CustomMultiSelect';

interface MultiSelectDropdownProps {
  values: string[];
  options: Array<{ value: string; label: string }>;
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

const MultiSelectDropdown = ({ 
  values, 
  options, 
  onChange, 
  placeholder = "Select options",
  className 
}: MultiSelectDropdownProps) => {
  return (
    <CustomMultiSelect
      values={values}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default MultiSelectDropdown;
