// TODO: remove in future, for now was needed to live test
"use client";

import { GET } from "@/utils/fetch";

export const Test = () => {
  GET({ term: "zed" }).then((res) => console.log(res));

  return <h2>TEST</h2>;
};
