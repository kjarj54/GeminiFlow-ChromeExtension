
interface ComponentInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const ComponentInput: React.FC<ComponentInputProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      className="border border-gray-300 rounded-md p-2"
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={handleChange}
    />
  );
};

export default ComponentInput;