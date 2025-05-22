import { useCallback, useRef } from "react";

export const Tag = ({
  text,
  isTag,
  onRemove,
  tagSelector
}: {
  text: string;
  isTag: boolean;
  tagSelector: string;
  onRemove: (text: string) => void
}) => {
  const ref = useRef<HTMLLIElement>(null);

  const onRemoveClick = useCallback(() => {
    const element = ref.current;
    if (element) {
      element.classList.add("hidden");
    }
    setTimeout(() => {
      onRemove(text);
    }, 200);
  }, [ref.current]);

  return isTag ?(
    <li className={`tag ${tagSelector} hidden`} ref={ref}>
      <span>{text}</span>
      <button
        className="tag-remove"
        onClick={onRemoveClick}
        title="remove"
      >
        <i className="fa fa-circle-xmark" />
      </button>
    </li>
  ) : (
    <li className={tagSelector}>{text}</li>
  );
};