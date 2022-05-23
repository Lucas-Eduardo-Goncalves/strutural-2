import React, { useState } from "react";
import { FilterOutlined } from '@ant-design/icons';

import { Button } from '../../../../components/buttons/buttons';
import { FilterDrawer } from "./FilterDrawer";
import { Drawer } from "antd";

interface IFilterButtonComponent {
  openFilter: () => void;
}

export function FilterButton({ openFilter }: IFilterButtonComponent) {
  const [state, setState] = useState(false);

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

      <Drawer title="Filtros" width={400} onClose={() => setState(false)} visible={state}>
        <FilterDrawer 
          showButton 
          clearFilters={() => {}} 
          updateFilters={() => {}}
          // dependences={} 
          // initialFilters={{ search: "", categoryId: "", createdAt: [new Date(), ""] }}
        />
      </Drawer>
    </>
  );
}