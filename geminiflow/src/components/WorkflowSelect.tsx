interface WorkflowSelectProps {
  value: string;
  onChange: (value: string) => void;
  includeLogs: boolean;
  onIncludeLogsChange: (checked: boolean) => void;
}

const WorkflowSelect: React.FC<WorkflowSelectProps> = ({
  value,
  onChange,
  includeLogs,
  onIncludeLogsChange,
}) => {
  return (
    <>
      <select
        className="border border-gray-300 rounded-md p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select workflow</option>
        <option value="reflection">Reflection</option>
        <option value="planning">Planning</option>
      </select>
      <label
        className="text-sm font-medium leading-none"
        htmlFor="include-logs"
      >
        <input
          id="include-logs"
          type="checkbox"
          checked={includeLogs}
          onChange={(e) => onIncludeLogsChange(e.target.checked)}
        />
        Include logs or error output
      </label>
    </>
  );
};

export default WorkflowSelect;
