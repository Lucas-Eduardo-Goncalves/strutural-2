import React from "react";
import { Row } from "antd";

import { ClearFilterButton } from "./components/ClearFilterButton";
import { FilterButton } from "./components/FilterButton";
import { SearchInput } from "./components/SearchInput";
import { TableComponent } from "./components/table";

import { ThemeLayout } from "../../layout/themeLayout";
import { Main, TableWrapper } from '../../container/styled';
import { TopToolBox } from "../../container/ecommerce/Style";

import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from "../../components/cards/frame/cards-frame";
import { StatusRadioGroup } from "./components/StatusRadioGroup";
import { ModalAddContact } from "./components/ModalAddContact";
import { ExportButtonPageHeader } from "../../components/buttons/export-button/export-button";

import { useFetch } from "../../hooks/useFetch";
import { IFetchPropsContacts } from "./types";

export function ContactsNewCrud() {
  const {
    isFetching, 
    dataFetch, 
    setSearch, 
    filters,
    setFilters,
    refetch
  } = useFetch<IFetchPropsContacts>({ baseUrl: "contacts" });

  return (
    <ThemeLayout>
      <PageHeader ghost title="Contatos" 
        buttons={[
          <div key="1" className="page-header-actions">
            <ExportButtonPageHeader key="1" />
            
            {filters && <ClearFilterButton clearFilter={() => setFilters("")} />}
            <FilterButton openFilter={() => {}}/>
          </div>
        ]}
      />

      <Main>
        <Cards headless>
          <TopToolBox>
            <Row gutter={15} className="justify-content-center">
              <SearchInput handleSearch={setSearch} />
              <StatusRadioGroup />
              <ModalAddContact refetch={refetch} />
            </Row>
          </TopToolBox>

          <TableWrapper className="table-order table-responsive">
            <TableComponent refetch={refetch} isLoading={isFetching} dataFetch={dataFetch} />
          </TableWrapper>
        </Cards>
      </Main>
    </ThemeLayout>
  );
}
