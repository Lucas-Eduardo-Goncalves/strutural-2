import React, { useState } from 'react';
import { Button, DatePicker, Form } from 'antd';

import { FiltersWrapper } from '../../styles';
import moment from 'moment';

type FiltersProps = {
  filters: string;
  clearFilters: () => void;
  applyFilters: (event: string) => void;
};

export function FilterDrawer ({ applyFilters, clearFilters, filters }: FiltersProps) {
  const [dataFilter, setDataFilter] = useState<any>();
  
  function handleChangeFilters([date1, date2]: any) {
    const format = (date?: moment.Moment) => (date ? date.format('YYYY-MM-DD') : '');
    setDataFilter(`&filter.createdAt=$btw:${format(date1)},${format(date2)}`)
  }

  function handleApplyFilters() {
    applyFilters(dataFilter);
  }

  return (
    <FiltersWrapper>
      <Form layout="vertical">
        <Form.Item label="Data criação">
          <DatePicker.RangePicker
            format="DD/MM/YYYY"
            onChange={dates => handleChangeFilters(dates)}
          />
        </Form.Item>

        {/* <Form.Item label="Cidade">
          <Select
            placeholder="Filtrar por categoria"
            value={filters.categoryId}
            onChange={value => handleChange('categoryId', value)}
          >
            {dependences.cidades.map(c => (
              <Select.Option value={c.value}>{c.label}</Select.Option>
            ))}
          </Select>
        </Form.Item> */}
      </Form>

      <footer>
        <Button type="primary" size="large" onClick={handleApplyFilters}>
          Aplicar filtros
        </Button>

        {filters && (
          <Button type="primary" danger size="large" onClick={clearFilters}>
            Limpar filtros
          </Button>
        )}
      </footer>
    </FiltersWrapper>
  );
}
