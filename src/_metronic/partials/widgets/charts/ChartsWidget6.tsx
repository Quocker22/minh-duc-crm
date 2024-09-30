import ApexCharts, { ApexOptions } from 'apexcharts';
import React, { useEffect, useRef } from 'react';

import { getCSS, getCSSVariableValue } from '@/_metronic/assets/ts/_utils';
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider';

type Props = {
  className: string;
};

const ChartsWidget6: React.FC<Props> = ({ className }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();
  const refreshChart = () => {
    if (!chartRef.current) {
      return;
    }

    const height = parseInt(getCSS(chartRef.current, 'height'));

    const chart = new ApexCharts(chartRef.current, getChartOptions(height));
    if (chart) {
      chart.render();
    }

    return chart;
  };

  useEffect(() => {
    const chart = refreshChart();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartRef, mode]);

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Recent Orders</span>

          <span className="text-muted fw-semobold fs-7">More than 500+ new orders</span>
        </h3>

        {/* begin::Toolbar */}
        <div className="card-toolbar" data-kt-buttons="true">
          <a
            className="btn btn-sm btn-color-muted btn-active btn-active-primary active px-4 me-1"
            id="kt_charts_widget_6_sales_btn"
          >
            Sales
          </a>

          <a
            className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1"
            id="kt_charts_widget_6_expenses_btn"
          >
            Expenses
          </a>
        </div>
        {/* end::Toolbar */}
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body">
        {/* begin::Chart */}
        <div ref={chartRef} id="kt_charts_widget_6_chart" style={{ height: '350px' }} />
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export { ChartsWidget6 };

function getChartOptions(_height: number): ApexOptions {
  const labelColor = getCSSVariableValue('--kt-gray-500');
  const borderColor = getCSSVariableValue('--kt-gray-200');

  const baseColor = getCSSVariableValue('--kt-primary');
  const baseLightColor = getCSSVariableValue('--kt-primary-light');
  const secondaryColor = getCSSVariableValue('--kt-info');

  return {
    chart: {
      fontFamily: 'inherit',
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: [baseColor, secondaryColor, baseLightColor],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    grid: {
      borderColor,
      padding: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: '12%',
        horizontal: false,
      },
    },
    series: [
      {
        data: [40, 50, 65, 70, 50, 30],
        name: 'Net Profit',
        type: 'bar',
      },
      {
        data: [20, 20, 25, 30, 30, 20],
        name: 'Revenue',
        type: 'bar',
      },
      {
        data: [50, 80, 60, 90, 50, 70],
        name: 'Expenses',
        type: 'area',
      },
    ],
    states: {
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    stroke: {
      colors: ['transparent'],
      curve: 'smooth',
      show: true,
      width: 2,
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter(val) {
          return '$' + val + ' thousands';
        },
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      max: 120,
    },
  };
}
