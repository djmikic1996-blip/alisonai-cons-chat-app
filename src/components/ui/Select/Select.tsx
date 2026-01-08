import React from 'react';
import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  type SelectChangeEvent,
} from '@mui/material';
import type { TimeUnit } from '@/shared';

interface SelectProps {
  options: Array<{ value: number | string; label: string }>;
  value: TimeUnit;
  handleChange: (value: TimeUnit) => void;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  handleChange,
  disabled,
}) => {
  const onInternalChange = (event: SelectChangeEvent<TimeUnit>) =>
    handleChange(event.target.value as TimeUnit);

  return (
    <FormControl fullWidth>
      <MuiSelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={onInternalChange}
        disabled={disabled}
        defaultValue={value}
      >
        {options.map(item => (
          <MenuItem value={item.value}>{item.label}</MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};
