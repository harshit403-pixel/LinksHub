import { useMutation }
from "@tanstack/react-query";

import { generateBio }
from "./ai.api";

export const useGenerateBio =
  () => {
    return useMutation({
      mutationFn: generateBio,
    });
  };