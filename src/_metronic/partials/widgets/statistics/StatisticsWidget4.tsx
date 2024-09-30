import ApexCharts, { ApexOptions } from 'apexcharts';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';

import { getCSS, getCSSVariableValue } from '@/_metronic/assets/ts/_utils';
import { KTSVG } from '@/_metronic/helpers';
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider';

type Props = {
  change: string;
  className: string;
  color: string;
  description: string;
  svgIcon: string;
};

const StatisticsWidget4: React.FC<Props> = ({ className, svgIcon, color, change, description }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();
  const refreshChart = () => {
    if (!chartRef.current) {
      return;
    }

    const height = parseInt(getCSS(chartRef.current, 'height'));
    const labelColor = getCSSVariableValue('--kt-gray-800');
    const baseColor = getCSSVariableValue('--kt-' + color);
    const lightColor = getCSSVariableValue('--kt-' + color + '-light');

    const chart = new ApexCharts(
      chartRef.current,
      getChartOptions(height, labelColor, baseColor, lightColor)
    );
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
  }, [chartRef, color, mode]);

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className="card-body p-0">
        <div className="d-flex flex-stack card-p flex-grow-1">
          <span className={clsx('symbol symbol-50px', `symbol-light-${color}`, 'me-2')}>
            <span className="symbol-label">
              <KTSVG className={`svg-icon-2x svg-icon-${color}`} path={svgIcon} />
            </span>
          </span>

          <div className="d-flex flex-column text-end">
            <span className="text-dark fw-bold fs-2">{change}</span>

            <span className="text-muted fw-semobold mt-1">{description}</span>
          </div>
        </div>

        <div
          ref={chartRef}
          className="statistics-widget-4-chart card-rounded-bottom"
          style={{ height: '150px' }}
        />
      </div>
      {/* end::Body */}
    </div>
  );
};

export { StatisticsWidget4 };

function getChartOptions(
  height: number,
  labelColor: string,
  baseColor: string,
  lightColor: string
): ApexOptions {
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
    colors: [lightColor],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: 'solid',
    },
    legend: {
      show: false,
    },
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
    plotOptions: {},
    series: [
      {
        data: [40, 40, 30, 30, 35, 35, 50],
        name: 'Net Profit',
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
      colors: [baseColor],
      curve: 'smooth',
      show: true,
      width: 3,
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
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      crosshairs: {
        position: 'front',
        show: false,
        stroke: {
          color: '#E4E6EF',
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
      tooltip: {
        enabled: false,
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
      max: 60,
      min: 0,
    },
  };
}
