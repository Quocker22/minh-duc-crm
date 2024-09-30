import ApexCharts, { ApexOptions } from 'apexcharts';
import React, { useEffect, useRef } from 'react';

import { getCSS, getCSSVariableValue } from '@/_metronic/assets/ts/_utils';
import { KTSVG } from '@/_metronic/helpers';
import { Dropdown1 } from '@/_metronic/partials/content/dropdown/Dropdown1';
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider';

type Props = {
  className: string;
};

const ChartsWidget1: React.FC<Props> = ({ className }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();

  useEffect(() => {
    const chart = refreshChart();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartRef, mode]);

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

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        {/* begin::Title */}
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Recent Statistics</span>

          <span className="text-muted fw-semobold fs-7">More than 400 new members</span>
        </h3>
        {/* end::Title */}

        {/* begin::Toolbar */}
        <div className="card-toolbar">
          {/* begin::Menu */}
          <button
            className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
            data-kt-menu-flip="top-end"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-trigger="click"
            type="button"
          >
            <KTSVG className="svg-icon-2" path="/media/icons/duotune/general/gen024.svg" />
          </button>
          <Dropdown1 />
          {/* end::Menu */}
        </div>
        {/* end::Toolbar */}
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body">
        {/* begin::Chart */}
        <div ref={chartRef} id="kt_charts_widget_1_chart" style={{ height: '350px' }} />
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export { ChartsWidget1 };

function getChartOptions(height: number): ApexOptions {
  const labelColor = getCSSVariableValue('--kt-gray-500');
  const borderColor = getCSSVariableValue('--kt-gray-200');
  const baseColor = getCSSVariableValue('--kt-primary');
  const secondaryColor = getCSSVariableValue('--kt-gray-300');

  return {
    chart: {
      fontFamily: 'inherit',
      height,
      toolbar: {
        show: false,
      },
      type: 'bar',
    },
    colors: [baseColor, secondaryColor],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    grid: {
      borderColor,
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
        columnWidth: '30%',
        horizontal: false,
      },
    },
    series: [
      {
        data: [44, 55, 57, 56, 61, 58],
        name: 'Net Profit',
      },
      {
        data: [76, 85, 101, 98, 87, 105],
        name: 'Revenue',
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
    },
  };
}
