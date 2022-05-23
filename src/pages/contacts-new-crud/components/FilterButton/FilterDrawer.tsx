import React, { useState } from 'react';
import { Button, Select, DatePicker, Form } from 'antd';

import { FiltersWrapper } from '../../styles';
import { IFilters } from '../../types';

type FiltersProps = {
  // initialFilters: IFilters;
  updateFilters: (filters: IFilters) => void;
  clearFilters: () => void;
  showButton: boolean;
  // dependences: IDependences;
};

export function FilterDrawer ({ 
  // initialFilters, 
  updateFilters, 
  clearFilters, 
  showButton, 
  // dependences
}: FiltersProps) {
  const [filters, setFilters] = useState<IFilters>({} as IFilters);

  function handleChange(key: keyof IFilters, value: any) {
    setFilters(prev => ({ ...prev, [key]: value }));
  }

  return (
    <FiltersWrapper>
      <Form layout="vertical">
        <Form.Item label="Data criação">
          <DatePicker.RangePicker
            format="DD/MM/YYYY"
            value={filters.createdAt}
            onChange={dates => handleChange('createdAt', dates)}
          />
        </Form.Item>

        <Form.Item label="Cidade">
          <Select
            placeholder="Filtrar por categoria"
            value={filters.categoryId}
            onChange={value => handleChange('categoryId', value)}
          >
            {/* {dependences.cidades.map(c => (
              <Select.Option value={c.value}>{c.label}</Select.Option>
            ))} */}
          </Select>
        </Form.Item>
      </Form>

      <footer>
        <Button type="primary" size="large" onClick={() => updateFilters(filters)}>
          Aplicar filtros
        </Button>

        {showButton && (
          <Button type="primary" danger size="large" onClick={() => clearFilters()}>
            Limpar filtros
          </Button>
        )}
      </footer>
    </FiltersWrapper>
  );
}
