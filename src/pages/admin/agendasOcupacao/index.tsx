import React, { useEffect, useState } from "react";
import { Drawer, Button as FilterButton, Spin } from "antd";
import { FilterOutlined, CloseOutlined } from "@ant-design/icons";

import { Button } from "../../../components/buttons/buttons";
import { Cards } from "../../../components/cards/frame/cards-frame";
// import { ChartjsBarChart } from "../../../components/charts/chartjs";
import Chart from "react-apexcharts";
import { PageHeader } from "../../../components/page-headers/page-headers";
import { ExportButtonPageHeader } from "../../../components/buttons/export-button/export-button";

import Filters from "./components/Filters";
import { Main } from "../../../container/styled";

import { useFetch } from "./services/useFetch";
import { ThemeLayout } from "../../../layout/themeLayout";

type IDatasetDTO = {
  backgroundColor: string;
  barPercentage: number;
  data: number[];
}

type IFetchProps = {
  labels: string[];
  datasets: IDatasetDTO[];
}

const AgendasOcupacao = () => {
  const {
    data,
    showFilterButton,
    params,
    dependences,
    listLoading,
    handleClearFilters,
    handleUpdateFilters,
    filtersModal,
  } = useFetch<IFetchProps>();

  const [stateDataset, setStateDataset] = useState<{name: string; data: number[]}[] | undefined>(undefined);

  useEffect(() => {
    if(data?.datasets) {
      const series = data?.datasets.map(dataset => {
        return {
          name: "agendas",
          data: dataset.data
        }
      })

      setStateDataset(series)
    }
  }, [data?.datasets])

  console.log(stateDataset)

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: data?.labels,
    },
    yaxis: {
      title: {
        text: 'num. horários'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return  val + " horários"
        }
      }
    }
  };

  return (
    <ThemeLayout>
      <PageHeader 
        ghost 
        title="Ocupação de Agendas" 
        buttons={[
          <div key="1" className="page-header-actions">
            <ExportButtonPageHeader key="1" />

            {showFilterButton && (
              <FilterButton danger size="small" key="2" type="default" onClick={handleClearFilters}>
                <CloseOutlined size={10} />
                Limpar Filtro
              </FilterButton>
            )}

            <Button size="small" key="3" type="primary" onClick={filtersModal.open}>
              <FilterOutlined size={10} /> Filtrar
            </Button>
          </div>
        ]}
      />

      <Main>
        <Cards title="Relatório Agendas x Ocupação" size="large">
          {listLoading && !stateDataset ? (
            <div className="spin d-flex align-center-v">
              <Spin />
            </div>
          ) : (
            <>
              <Chart 
                options={options} 
                series={stateDataset} 
                type="bar" 
                height={350} 
              />
            </>
            // <ChartjsBarChart 
            //   height={100} 
            //   labels={data?.labels} 
            //   datasets={data?.datasets} 
            //   options={options} 
            // />
          )}
        </Cards>
        
        {filtersModal.isOpen && (
          <Drawer title="Filtros" width={400} style={{ zIndex: 1050 }} onClose={filtersModal.close} visible>
            <Filters
              initialFilters={params.filters}
              updateFilters={handleUpdateFilters}
              clearFilters={handleClearFilters}
              showButton={showFilterButton}
              dependences={dependences}
            />
          </Drawer>
        )}
      </Main>
    </ThemeLayout>
  );
};

export default AgendasOcupacao;

/* ***** VARIAVEIS DE TESTES ***** */
// const labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
// const datasets = [
//   {
//     data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
//     backgroundColor: "#000ff0",
//     barPercentage: 0.6,
//   },
//   {
//     data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
//     backgroundColor: "#1ce1ac",
//     barPercentage: 0.6,
//   },
// ];