import ApexCharts, { ApexOptions } from 'apexcharts';
import React, { useEffect, useRef } from 'react';

import { getCSS, getCSSVariableValue } from '@/_metronic/assets/ts/_utils';
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider';

type Props = {
  className: string;
};

const ChartsWidget4: React.FC<Props> = ({ className }) => {
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
          <span className="card-label fw-bold fs-3 mb-1">Recent Customers</span>

          <span className="text-muted fw-semobold fs-7">More than 500 new customers</span>
        </h3>

        {/* begin::Toolbar */}
        <div className="card-toolbar" data-kt-buttons="true">
          <a
            className="btn btn-sm btn-color-muted btn-active btn-active-primary active px-4 me-1"
            id="kt_charts_widget_4_year_btn"
          >
            Year
          </a>

          <a
            className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1"
            id="kt_charts_widget_4_month_btn"
          >
            Month
          </a>

          <a
            className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4"
            id="kt_charts_widget_4_week_btn"
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
        <div ref={chartRef} id="kt_charts_widget_4_chart" style={{ height: '350px' }} />
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export { ChartsWidget4 };

function getChartOptions(_height: number): ApexOptions {
  const labelColor = getCSSVariableValue('--kt-gray-500');
  const borderColor = getCSSVariableValue('--kt-gray-200');

  const baseColor = getCSSVariableValue('--kt-success');
  const baseLightColor = getCSSVariableValue('--kt-success-light');
  const secondaryColor = getCSSVariableValue('--kt-warning');
  const secondaryLightColor = getCSSVariableValue('--kt-warning-light');

  return {
    chart: {
      fontFamily: 'inherit',
      height: 350,
      toolbar: {
        show: false,
      },
      type: 'area',
    },
    colors: [baseColor, secondaryColor],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: 'solid',
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
    markers: {
      colors: [baseLightColor, secondaryLightColor],
      strokeColors: [baseLightColor, secondaryLightColor],
      strokeWidth: 3,
    },
    plotOptions: {},
    series: [
      {
        data: [60, 50, 80, 40, 100, 60],
        name: 'Net Profit',
      },
      {
        data: [70, 60, 110, 40, 50, 70],
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
      curve: 'smooth',
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
        stroke: {
          color: labelColor,
          dashArray: 3,
          width: 1,
        },
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
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
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
  };
}
