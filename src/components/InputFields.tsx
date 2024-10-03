import { useMemo } from "react";
import { closeDropdown } from "@/helper/helperFunctions";

interface InputFieldProps {
  type: string;
  value: string;
  validValue: boolean;
  valuePlaceholder: string;
  valueMaxLength: number;
  noInput: boolean;
  valueChange: (e: any) => void;
}

interface InputAreaFieldProps extends InputFieldProps {
  height?: number;
}

interface InputDropdownFieldProps {
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>> | ((newValue: string) => void);
  validValue: boolean;
  valuePlaceholder: string;
  valueMaxLength: number;
  noInput: boolean;
  valueChange: (e: any) => void;
  list?: string[];
}

/**
 * InputField component
 *
 * A reusable input field component with customizable properties.
 *
 * @param {InputFieldProps} props - The component props
 * @returns {JSX.Element} The rendered InputField component
 */
export const InputField = ({
  type,
  value,
  validValue,
  valuePlaceholder,
  valueMaxLength,
  noInput,
  valueChange,
}: InputFieldProps): JSX.Element => {
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

/**
 * InputAreaField component
 *
 * A reusable textarea component with customizable properties.
 *
 * @param {InputAreaFieldProps} props - The component props
 * @returns {JSX.Element} The rendered InputAreaField component
 */
export const InputAreaField = ({
  type,
  value,
  validValue,
  valuePlaceholder,
  valueMaxLength,
  noInput,
  valueChange,
  height,
}: InputAreaFieldProps): JSX.Element => {
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

/**
 * InputDropdownField component
 *
 * A reusable dropdown input field component with customizable properties and filtered list.
 *
 * @param {InputDropdownFieldProps} props - The component props
 * @returns {JSX.Element} The rendered InputDropdownField component
 */
export const InputDropdownField = ({
  type,
  value,
  setValue,
  validValue,
  valuePlaceholder,
  valueMaxLength,
  noInput,
  valueChange,
  list = [],
}: InputDropdownFieldProps): JSX.Element => {
  // Filter the list based on the input value
  const filteredList = useMemo(
    () => list.filter((list) => list.toLowerCase().startsWith(value.toLowerCase())),
    [value, list],
  );

  // Handle selection from the dropdown list
  const valueListChange = (valueList: string) => {
    if (noInput) return;
    setValue(valueList);
    closeDropdown();
  };

  return (
    <div className="dropdown dropdown-end h-full w-full">
      <div tabIndex={0} role="button" className="flex h-full w-full grow flex-col">
        <InputField
          type={type}
          value={value}
          validValue={validValue}
          valuePlaceholder={valuePlaceholder}
          valueMaxLength={valueMaxLength}
          noInput={noInput}
          valueChange={valueChange}
        />
      </div>
      {filteredList.length !== 0 && (
        <ul
          tabIndex={0}
          className={`${noInput && "hidden"} menu dropdown-content menu-sm z-[3] mt-2 max-h-64 w-full overflow-scroll rounded-xl border border-white bg-base-100 p-[0.3rem] shadow`}
        >
          {filteredList.map((valueList, index) => (
            <li key={index} onClick={() => valueListChange(valueList)}>
              <a className="w-full font-bold">{valueList}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
