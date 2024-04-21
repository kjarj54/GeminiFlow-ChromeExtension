interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ value, onChange }) => {
  return (
    <select
      className="border border-gray-300 rounded-md p-2 none cursor-not-allowed opacity-50"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled
    >
      <option value="gemini">Gemini</option>
      <option value="chatgpt">ChatGPT</option>
    </select>
  );
};

export default SelectInput;
