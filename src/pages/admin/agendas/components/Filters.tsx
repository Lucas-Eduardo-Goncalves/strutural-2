import React, { useState } from 'react';
import { Button, Select, DatePicker, Form, Checkbox } from 'antd';




import { IDependences, IFilters } from '../types';
import { FiltersWrapper } from '../style';

type FiltersProps = {
  initialFilters: IFilters;
  updateFilters: (filters: IFilters) => void;
  clearFilters: () => void;
  showButton: boolean;
  dependences: IDependences;
};

const Filters: React.FC<FiltersProps> = ({ initialFilters, updateFilters, clearFilters, showButton, dependences }) => {
  const [filters, setFilters] = useState(initialFilters);

  function handleChange(key: keyof IFilters, value: any) {
    setFilters(prev => ({ ...prev, [key]: value }));
  }

  return (
    <FiltersWrapper>
      <Form layout="vertical">
        <Form.Item label="Data">
          <DatePicker
            format="DD/MM/YYYY"
            value={filters.data_consulta}
            onChange={dates => handleChange('data_consulta', dates)}
          />
        </Form.Item>

        <Form.Item label="Unidade">
          <Select
            placeholder="Filtrar por unidade"
            value={filters.unidadeId}
            onChange={value => handleChange('unidadeId', value)}
          >
            {dependences.unidades.map(c => (
              <Select.Option value={c.value}>{c.label}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Profissional">
          <Select
            placeholder="Filtrar por profissional"
            value={filters.profissional_id}
            onChange={value => handleChange('profissional_id', value)}
          >
            {dependences.dentistas.map(c => (
              <Select.Option value={c.value}>{c.label}</Select.Option>
            ))}
          </Select>
        </Form.Item>

      {/*   <Form.Item label="Ativo">
          <Checkbox checked={filters.status} onChange={e => handleChange('status', e.target.checked)}>
            Produto está ativo
          </Checkbox>
        </Form.Item> */}
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
};

export default Filters;
