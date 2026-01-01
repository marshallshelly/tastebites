import type { KeyboardEvent } from "react";

export const isNumberOnly = (
  event: KeyboardEvent<HTMLInputElement> | KeyboardEvent
) => ["e", "E", "+"].includes(event.key) && event.preventDefault();
