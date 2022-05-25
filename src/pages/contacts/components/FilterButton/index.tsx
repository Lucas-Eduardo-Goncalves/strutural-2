import React, { useState } from "react";
import { FilterOutlined } from '@ant-design/icons';

import { Button } from '../../../../components/buttons/buttons';
import { FilterDrawer } from "./FilterDrawer";
import { Drawer } from "antd";

interface IFilterButtonComponent {
  filters: string;
  clearFilters: () => void;
  applyFilters: (event: string) => void;
}

export function FilterButton({ clearFilters, filters, applyFilters }: IFilterButtonComponent) {
  const [state, setState] = useState(false);

  function handleApplyFilters(event: string) {
    setState(false);
    applyFilters(event);
  }

  function handleClearFilters() {
    setState(false);
    clearFilters();
  }

  return (
    <>
      <Button 
        size="small" 
        type="primary" 
        onClick={() => setState(true)}
        >
        <FilterOutlined size={10} />
        Filtrar
      </Button>

      <Drawer title="Filtros" width={400} style={{ zIndex: 1000 }} onClose={() => setState(false)} visible={state}>
        <FilterDrawer 
          applyFilters={handleApplyFilters} 
          clearFilters={handleClearFilters} 
          filters={filters} 
        />
      </Drawer>
    </>
  );
}