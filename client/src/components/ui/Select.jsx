import { forwardRef } from "react";

export const Select = forwardRef((props, ref, rows = 2) => (
  <select
    {...props}
    ref={ref}
    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
    rows={rows}
  />
));
