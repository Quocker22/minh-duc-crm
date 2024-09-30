import ApexCharts, { ApexOptions } from 'apexcharts';
import React, { useEffect, useRef } from 'react';

import { getCSS, getCSSVariableValue } from '@/_metronic/assets/ts/_utils';
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider';

type Props = {
  change: string;
  className: string;
  color: string;
  description: string;
  title: string;
};

const StatisticsWidget3: React.FC<Props> = ({ className, title, description, change, color }) => {
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
  }, [chartRef, mode]);

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className="card-body d-flex flex-column p-0">
        <div className="d-flex flex-stack flex-grow-1 card-p">
          <div className="d-flex flex-column me-2">
            <a className="text-dark text-hover-primary fw-bold fs-3" href="#">
              {title}
            </a>

            <span
              dangerouslySetInnerHTML={{ __html: description }}
              className="text-muted fw-semobold mt-1"
            />
          </div>

          <span className="symbol symbol-50px">
            <span className={`symbol-label fs-5 fw-bold bg-light-${color} text-${color}`}>
              {change}
            </span>
          </span>
        </div>
        <div
          ref={chartRef}
          className="statistics-widget-3-chart card-rounded-bottom"
          style={{ height: '150px' }}
        />
      </div>
      {/* end::Body */}
    </div>
  );
};

export { StatisticsWidget3 };

function getChartOptions(
  height: number,
  labelColor: string,
  baseColor: string,
  lightColor: string
): ApexOptions {
  const options: ApexOptions = {
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
        data: [30, 45, 32, 70, 40],
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
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
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
      max: 80,
      min: 0,
    },
  };

  return options;
}
