import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

import { api } from "../services/api";

interface IUseFetchProps {
  baseUrl: string;
  isLinkProps?: boolean;
  isArray?: boolean;
}

export function useFetch<T = unknown>({
  baseUrl,
  isLinkProps = true,
  isArray = true,
}: IUseFetchProps) {
  const [dataFetch, setDataFetch] = useState<T | undefined>();
  const [isFetching, setIsFetching] = useState(false);

  const [itensPerPage, setItensPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItens, setTotalItens] = useState(0);

  const [filters, setFilters] = useState("");
  const [search, setSearch] = useState("");

  const [columnOrdenation, setColumnOrdenation] = useState("");

  const linkFetch = `${baseUrl}?limit=${itensPerPage}&page=${currentPage}&search=${search}&sortBy=${columnOrdenation}${filters}`;

  const fetchAPI = useCallback(async () => {
    let variableFetchLink = linkFetch;

    if (!isLinkProps) {
      variableFetchLink = `${baseUrl}`;
    }

    setIsFetching(true);
    try {
      const { data } = await api.get(variableFetchLink);

      if (isArray) {
        setDataFetch(data.data);
        setTotalItens(data.meta.totalItems);
      } else {
        setDataFetch(data);
        setTotalItens(0);
      }

      setIsFetching(false);
    } catch(err) {
      toast.error("Algo deu errado 😰");
      setIsFetching(false);
      console.log(err);
    }
  }, [baseUrl, isArray, isLinkProps, linkFetch])

  async function refetch() {
    await fetchAPI();
  }

  const [cookies] = useCookies(["whats-front-token"]);
  const token = cookies["whats-front-token"];

  useEffect(() => {
    if(token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      fetchAPI();
    }
  }, [fetchAPI, token]);

  useEffect(() => {
    if(token) fetchAPI();
  }, [itensPerPage, currentPage, filters, search, columnOrdenation, fetchAPI, token]);

  return {
    dataFetch,
    isFetching,
    currentPage,
    setCurrentPage,
    itensPerPage,
    setItensPerPage,
    totalItens,
    filters,
    setFilters,
    search,
    setSearch,
    columnOrdenation,
    setColumnOrdenation,
    refetch,
  };
}