import "./styles.css";

interface InputData {
  type?: string;
  defaultValue?:string
  value?: string;
  lable?: string;
  placeHolder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
}

function Input({
  lable,
  type = "text",
  defaultValue,
  value,
  placeHolder,
  onChange,
}: InputData) {
  return (
    <div className="Input flex flex-col">
      <label className="text-black font-medium" htmlFor={lable}>
        {lable}
      </label>
      <input
        className="mt-5"
        id={lable}
        type={type}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeHolder}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
