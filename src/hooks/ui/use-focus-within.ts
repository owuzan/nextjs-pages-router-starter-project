import { useCallback, useEffect, useRef, useState } from "react";

export type UseFocusWithinOptions = {
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
};

const containsRelatedTarget = (event: FocusEvent) => {
  if (
    event.currentTarget instanceof HTMLElement &&
    event.relatedTarget instanceof HTMLElement
  ) {
    return event.currentTarget.contains(event.relatedTarget);
  }

  return false;
};

export const useFocusWithin = <T extends HTMLElement = any>({
  onBlur,
  onFocus,
}: UseFocusWithinOptions = {}): {
  ref: React.MutableRefObject<T>;
  focused: boolean;
} => {
  const ref = useRef<T | null>(null);
  const [focused, _setFocused] = useState(false);
  const focusedRef = useRef(false);
  const setFocused = (value: boolean) => {
    _setFocused(value);
    focusedRef.current = value;
  };

  const handleFocusIn = useCallback(
    (event: FocusEvent) => {
      if (!focusedRef.current) {
        setFocused(true);
        onFocus?.(event);
      }
    },
    [onFocus]
  );

  const handleFocusOut = useCallback(
    (event: FocusEvent) => {
      if (focusedRef.current && !containsRelatedTarget(event)) {
        setFocused(false);
        onBlur?.(event);
      }
    },
    [onBlur]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("focusin", handleFocusIn);
      ref.current.addEventListener("focusout", handleFocusOut);

      return () => {
        ref.current?.removeEventListener("focusin", handleFocusIn);
        ref.current?.removeEventListener("focusout", handleFocusOut);
      };
    }
  }, [handleFocusIn, handleFocusOut]);

  return { ref: ref as React.MutableRefObject<T>, focused };
};
