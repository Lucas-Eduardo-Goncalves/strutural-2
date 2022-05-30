import React from "react";
import { Row } from "antd";

import { ClearFilterButton } from "./components/ClearFilterButton";
import { FilterButton } from "./components/FilterButton";
import { SearchInput } from "./components/SearchInput";
import { TableComponent } from "./components/table";
import { ButtonAdd } from "./components/table/TableButtonAdd";
import { StatusRadioGroup } from "./components/StatusRadioGroup";

import { ThemeLayout } from "../../layout/themeLayout";
import { Main, TableWrapper } from '../../container/styled';
import { TopToolBox } from "../../container/ecommerce/Style";
import { ExportButtonPageHeader } from "../../components/buttons/export-button/export-button";

import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from "../../components/cards/frame/cards-frame";

import { useFetch } from "../../hooks/useFetch";

interface UserProps {
  Bairro: string | null;
  CPF: string | null;
  Cep: string | null;
  Cidade: string | null;
  Complemento: string | null;
  DataFim: string | null;
  DataInicio: string | null;
  Endereco: string | null;
  IP: string | null;
  Numero: string | null;
  UF: string | null;
  affiliate_amount: string | null;
  affiliate_code: string | null;
  affiliate_comission: string | null;
  affiliate_id: string | null;
  affiliate_indications: string | null;
  auth_token: string;
  created_at:  string;
  deleted_at:  string;
  description: string | null;
  documento2: string | null;
  documentos: string | null;
  email:  string;
  email_verified_at: string | null;
  id: 424
  is_acessed: string | null;
  is_active: 1
  is_aproved: string | null;
  is_deleted: 0
  is_whatsapp: string | null;
  last_viewed:  string;
  name:  string;
  phone:  string;
  referral_code: string | null;
  rg: string | null;
  role: string | null;
  sankhya_login:  string;
  sankhya_pass:  string;
  updated_at:  string;
  user_category_id: string | null;
  user_type: string;
}

interface IUsersFetch {
  data: UserProps[];
}

export function Users() {
  const {
    isFetching, 
    dataFetch, 
    setSearch, 
    filters,
    handleAddFilters,
    clearFilters,
    refetch,
    currentPage,
  } = useFetch<IUsersFetch>({ baseUrl: "users", isArray: true, isLinkProps: false });

  return (
    <ThemeLayout>
      <PageHeader ghost title="Usuários" 
        buttons={[
          <div key="1" className="page-header-actions">
            <ExportButtonPageHeader key="1" />
            
            {filters.length !== 0 && <ClearFilterButton clearFilter={clearFilters} />}
            <FilterButton filters={filters} handleAddFilters={handleAddFilters} clearFilters={clearFilters}/>
          </div>
        ]}
      />

      <Main>
        <Cards headless>
          <TopToolBox>
            <Row gutter={15} className="justify-content-center">
              <SearchInput handleSearch={setSearch} />
              <StatusRadioGroup handleAddFilters={handleAddFilters}/>
              <ButtonAdd refetch={refetch} />
            </Row>
          </TopToolBox>

          <TableWrapper className="table-order table-responsive">
            <TableComponent 
              currentPage={currentPage} 
              refetch={refetch} 
              isLoading={isFetching} 
              dataFetch={dataFetch?.data} 
            />
          </TableWrapper>
        </Cards>
      </Main>
    </ThemeLayout>
  );
}
