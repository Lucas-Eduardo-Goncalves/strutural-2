import React from 'react';
import { Button, DatePicker, Form } from 'antd';

import { FiltersWrapper } from '../../styles';
import moment from 'moment';

type ITypeFilter = {
  content: string, 
  key: string;
}

type FiltersProps = {
  filters: ITypeFilter[];
  clearFilters: () => void;
  handleAddFilters: (event: {key: string; content: string;}) => void;
};

export function FilterDrawer ({ handleAddFilters, clearFilters, filters }: FiltersProps) {
  function handleChangeFilters([date1, date2]: any) {
    const format = (date?: moment.Moment) => (date ? date.format('YYYY-MM-DD') : '');
    handleAddFilters({ key: "filter.createdAt", content: `${format(date1)},${format(date2)}` })
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
        {filters.length !== 0 && (
          <Button type="primary" danger size="large" onClick={clearFilters}>
            Limpar filtros
          </Button>
        )}
      </footer>
    </FiltersWrapper>
  );
}
