interface InputFieldProps {
  type: string;
  value: string;
  validValue: boolean;
  valuePlaceholder: string;
  valueMaxLength: number;
  noInput: boolean;
  valueChange: (e: any) => void;
}

export const InputField = ({
  type,
  value,
  validValue,
  valuePlaceholder,
  valueMaxLength,
  noInput,
  valueChange,
}: InputFieldProps) => {
  return (
    <input
      type="text"
      placeholder={valuePlaceholder}
      maxLength={valueMaxLength}
      className={`grow truncate rounded-lg border border-gray-400 p-1 pl-2.5 text-sm ${
        noInput && "input-disabled"
      } ${value && "font-medium"} ${validValue || !value ? "bg-base-200" : "bg-red-200"}`}
      disabled={noInput}
      id={type}
      autoComplete="off"
      onChange={valueChange}
      value={value}
    />
  );
};

export const InputAreaField = ({
  type,
  value,
  validValue,
  valuePlaceholder,
  valueMaxLength,
  noInput,
  valueChange,
  height,
}: InputFieldProps & { height?: number }) => {
  return (
    <textarea
      style={{ height: `${height}px` }}
      placeholder={valuePlaceholder}
      maxLength={valueMaxLength}
      className={`grow rounded-lg border border-gray-400 p-1 pl-2.5 text-sm ${noInput && "input-disabled"} ${value && "font-medium"} ${validValue || !value ? "bg-base-200" : "bg-red-200"}`}
      disabled={noInput}
      id={type}
      autoComplete="off"
      onChange={valueChange}
      value={value}
    />
  );
};
