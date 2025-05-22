import React, { useCallback, useEffect, useRef } from "react";
import { useRecipeStore } from "../stores/useRecipeStore";
import { Tag } from "./Tag";

export const InputWithTagList = ({
  listItems,
  label,
  listHeader,
  onChange,
  tagSelector,
  onRemove,
  id,
  iconClassName,
}: {
  listItems: string[];
  label: string;
  listHeader: string;
  onChange: (item: string) => void;
  tagSelector: string;
  onRemove: (item: string) => void;
  id: string;
  iconClassName: string;
}) => {
  const { clearRecipe, recipe, fetching } = useRecipeStore();
  const input = useRef<HTMLInputElement>(null);

  const callback = useCallback(() => {
    if (!input.current?.value) return;
    onChange(input.current.value);
    input.current.value = "";
    clearRecipe();
  }, [input.current]);

  const onChangeCallback = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        callback();
      }
    },
    []
  );

  return (
    <>
      <div className="input-container">
        <label htmlFor={id}>
          <h4>
            {label} <i className={`fa ${iconClassName}`} />
          </h4>
        </label>
        <span className="inner-input-container">
          <input id={id} onKeyDown={onChangeCallback} ref={input} />
          <button disabled={!input.current?.value} onClick={callback} title="Add element" className="button">
            <i className="fa fa-plus"></i>
          </button>
        </span>
      </div>
      <div className="tags-container">
        <ul className="horizontal-list">
          <span className="full-width-mobile">{listHeader}:</span>
          {listItems.map((item, index) => (
            <Tag
              key={`${item}-${index}`}
              text={item}
              isTag={!recipe.title && !fetching}
              onRemove={onRemove}
              tagSelector={tagSelector}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
