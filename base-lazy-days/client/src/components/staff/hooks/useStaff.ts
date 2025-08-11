import { useQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react";

import type { Staff } from "@shared/types";

import { filterByTreatment } from "../utils";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get("/staff");
  return data;
}

export function useStaff() {
  // for filtering staff by treatment
  const [filter, setFilter] = useState("all");

  const selectFn = useCallback(
    (unfilteredStaff: Staff[]) => {
      if (filter === "all") return unfilteredStaff;
      return filterByTreatment(unfilteredStaff, filter);
    },
    [filter]
  );

  const fallbackStaff: Staff[] = [];

  const { data: staff = fallbackStaff } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
    select: selectFn,
  });

  return { staff, filter, setFilter };
}
