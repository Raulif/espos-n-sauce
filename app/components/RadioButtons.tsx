import React, { useCallback } from "react";

export const RadioButtons = ({
  options,
  label,
  id,
  callback,
}: {
  options: Array<{value: string; label: string}>;
  label: string;
  id: string;
  callback: (difficulty: string) => void;
}) => {
  const onChange = useCallback((e: React.SyntheticEvent<HTMLFieldSetElement>) => {
    const option = e.target as HTMLInputElement
    const value = option.id;
    callback && callback(value)
  }, [callback])

  return (
    <fieldset id={id} className="radio-buttons" onChange={onChange}>
      <legend>{label}<i className="fa fa-rocket"/></legend>

      {options.map(({value, label}, idx) => (
        <div key={`${value}-${idx}`} className="radio-option">
          <input
            name={id}
            type="radio"
            id={value}
            value={label}
          />
          <label htmlFor={value}>{label}</label>
        </div>
      ))}
    </fieldset>
  );
};
