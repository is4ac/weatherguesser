import { NumberInput } from '@mantine/core'

interface IntegerTextFieldProps {
  disabled: boolean
  value: string
  label: string
  onChange: (value: string) => void
  onError: (error: boolean) => void
  onBlur: () => void
}

export default function IntegerTextField({
  disabled,
  value,
  label,
  onChange,
  onError,
  onBlur
}: IntegerTextFieldProps) {
  const handleChange = (val: string | number) => {
    const stringValue = val.toString()
    if (stringValue === '' || stringValue === '-' || !isNaN(Number(stringValue))) {
      onError(false)
      onChange(stringValue)
    }
  }

  return (
    <NumberInput
      disabled={disabled}
      label={label}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      size="sm"
      w={120}
      styles={{ input: { textAlign: 'right' } }}
    />
  )
}