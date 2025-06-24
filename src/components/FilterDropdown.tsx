
import CustomDropdown from '@/components/CustomDropdown';

interface FilterDropdownProps {
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const FilterDropdown = ({ 
  value, 
  options, 
  onChange, 
  placeholder = "Select option",
  className 
}: FilterDropdownProps) => {
  return (
    <CustomDropdown
      value={value}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default FilterDropdown;
