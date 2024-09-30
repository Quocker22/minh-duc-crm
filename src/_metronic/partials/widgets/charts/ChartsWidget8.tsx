import ApexCharts, { ApexOptions } from 'apexcharts';
import React, { useEffect, useRef } from 'react';

import { getCSS, getCSSVariableValue } from '@/_metronic/assets/ts/_utils';
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider';

type Props = {
  className: string;
};

const ChartsWidget8: React.FC<Props> = ({ className }) => {
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

          <span className="text-muted fw-semobold fs-7">More than 500 new orders</span>
        </h3>

        {/* begin::Toolbar */}
        <div className="card-toolbar" data-kt-buttons="true">
          <a
            className="btn btn-sm btn-color-muted btn-active btn-active-primary active px-4 me-1"
            id="kt_charts_widget_8_year_btn"
          >
            Year
          </a>

          <a
            className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1"
            id="kt_charts_widget_8_month_btn"
          >
            Month
          </a>

          <a
            className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4"
            id="kt_charts_widget_8_week_btn"
          >
            Week
          </a>
        </div>
        {/* end::Toolbar */}
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body">
        {/* begin::Chart */}
        <div
          ref={chartRef}
          className="card-rounded-bottom"
          id="kt_charts_widget_8_chart"
          style={{ height: '350px' }}
        />
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export { ChartsWidget8 };

function getChartOptions(height: number): ApexOptions {
  const labelColor = getCSSVariableValue('--kt-gray-500');
  const borderColor = getCSSVariableValue('--kt-gray-200');
  const strokeColor = getCSSVariableValue('--kt-gray-300');

  const color1 = getCSSVariableValue('--kt-warning');
  const color1Light = getCSSVariableValue('--kt-warning-light');

  const color2 = getCSSVariableValue('--kt-success');
  const color2Light = getCSSVariableValue('--kt-success-light');

  const color3 = getCSSVariableValue('--kt-primary');
  const color3Light = getCSSVariableValue('--kt-primary-light');

  return {
    chart: {
      fontFamily: 'inherit',
      height,
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
      type: 'area',
      zoom: {
        enabled: false,
      },
    },
    colors: [color1Light, color2Light, color3Light],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: 'solid',
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
    },
    legend: {
      show: false,
    },
    markers: {
      colors: [color1, color2, color3],
      strokeColors: [color1, color2, color3],
      strokeWidth: 3,
    },
    plotOptions: {},
    series: [
      {
        data: [30, 30, 50, 50, 35, 35],
        name: 'Net Profit',
      },
      {
        data: [55, 20, 20, 20, 70, 70],
        name: 'Revenue',
      },
      {
        data: [60, 60, 40, 40, 30, 30],
        name: 'Expenses',
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
      colors: [color1, color2, color3],
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
      crosshairs: {
        position: 'front',
        show: false,
        stroke: {
          color: strokeColor,
          dashArray: 3,
          width: 1,
        },
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      offsetX: 0,
      offsetY: 0,
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
  };
}
