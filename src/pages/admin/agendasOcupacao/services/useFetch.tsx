import { useState, useEffect } from "react";

import { useModal } from "../../../../hooks/useModal";
import { getData } from "./api";
import "moment/locale/pt-br";

import { IParams, IFilters } from "../types";
import { defaultFilters, defaultPaginationParams } from "../empty-data";

export function useFetch<T = unknown>() {
  const [data, setData] = useState<T | undefined>();
  const filtersModal = useModal();

  const [listLoading, setListLoading] = useState(true);
  const [showFilterButton, setShowFilterButton] = useState(false);
  
  const [params, setParams] = useState<IParams>({
    pagination: { ...defaultPaginationParams },
    sort: { field: "", order: "descend" },
    filters: { ...defaultFilters },
  });

  async function fetchData() {
    const { data } = await getData(params, "");

    setTimeout(() => {
      setData(data);
    }, 500)
  }

  useEffect(() => {
    fetchData()
  }, [params]);

  function handleUpdateFilters(filters: IFilters) {
    setParams(prev => ({ ...prev, filters }));
    setShowFilterButton(true);
    filtersModal.close();
  }

  function handleClearFilters() {
    setParams(prev => ({ ...prev, filters: { ...defaultFilters } }));
    setShowFilterButton(false);
    filtersModal.close();
  }

  return {
    data,
    dependences: { cidades: [] },
    showFilterButton,
    params,
    listLoading,
    handleClearFilters,
    handleUpdateFilters,
    filtersModal,
  };
};
