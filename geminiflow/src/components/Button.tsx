// @flow 
interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;