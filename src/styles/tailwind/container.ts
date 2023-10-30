import plugin from "tailwindcss/plugin";

import { CONTAINER_PADDING, CONTAINER_WIDTH } from "../constants";

export default plugin(function ({ addUtilities }) {
  addUtilities({
    ".container": {
      "max-width": CONTAINER_WIDTH,
      "margin-inline": "auto",
    },
    ".px-container": {
      "padding-inline": CONTAINER_PADDING,
    },
  });
});
