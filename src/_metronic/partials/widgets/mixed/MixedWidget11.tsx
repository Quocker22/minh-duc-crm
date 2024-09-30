import ApexCharts, { ApexOptions } from 'apexcharts';
import React, { useEffect, useRef } from 'react';

import { getCSSVariableValue } from '@/_metronic/assets/ts/_utils';
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider';

type Props = {
  chartColor: string;
  chartHeight: string;
  className: string;
};

const MixedWidget11: React.FC<Props> = ({ className, chartColor, chartHeight }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();
  const refreshChart = () => {
    if (!chartRef.current) {
      return;
    }

    const chart = new ApexCharts(chartRef.current, chartOptions(chartColor, chartHeight));
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
      {/* begin::Body */}
      <div className="card-body p-0 d-flex justify-content-between flex-column overflow-hidden">
        {/* begin::Hidden */}
        <div className="d-flex flex-stack flex-wrap flex-grow-1 px-9 pt-9 pb-3">
          <div className="me-2">
            <span className="fw-bold text-gray-800 d-block fs-3">Sales</span>

            <span className="text-gray-400 fw-semobold">Oct 8 - Oct 26 2021</span>
          </div>

          <div className={`fw-bold fs-3 text-${chartColor}`}>$15,300</div>
        </div>
        {/* end::Hidden */}

        {/* begin::Chart */}
        <div ref={chartRef} className="mixed-widget-10-chart" />
        {/* end::Chart */}
      </div>
    </div>
  );
};

const chartOptions = (chartColor: string, chartHeight: string): ApexOptions => {
  const labelColor = getCSSVariableValue('--kt-gray-500');
  const borderColor = getCSSVariableValue('--kt-gray-200');
  const secondaryColor = getCSSVariableValue('--kt-gray-300');
  const baseColor = getCSSVariableValue('--kt-' + chartColor);

  return {
    chart: {
      fontFamily: 'inherit',
      height: chartHeight,
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
      type: 'solid',
    },
    grid: {
      borderColor,
      padding: {
        top: 10,
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
        columnWidth: '50%',
        horizontal: false,
      },
    },
    series: [
      {
        data: [50, 60, 70, 80, 60, 50, 70, 60],
        name: 'Net Profit',
      },
      {
        data: [50, 60, 70, 80, 60, 50, 70, 60],
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
          return '$' + val + ' revenue';
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
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
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
};

export { MixedWidget11 };
