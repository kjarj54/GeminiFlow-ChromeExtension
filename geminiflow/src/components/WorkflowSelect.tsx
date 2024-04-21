interface WorkflowSelectProps {
    value: string;
    onChange: (value: string) => void;
  }
  
  const WorkflowSelect: React.FC<WorkflowSelectProps> = ({ value, onChange }) => {
    return (
      <select
        className="border border-gray-300 rounded-md p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select workflow</option>
        <option value="todo">todo</option>
        <option value="todo">todo</option>
        
      </select>
    );
  };
  
  export default WorkflowSelect;