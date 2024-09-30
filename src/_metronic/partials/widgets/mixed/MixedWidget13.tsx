import ApexCharts, { ApexOptions } from 'apexcharts';
import React, { useEffect, useRef } from 'react';

import { getCSSVariableValue } from '@/_metronic/assets/ts/_utils';
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider';

type Props = {
  backGroundColor: string;
  chartHeight: string;
  className: string;
};

const MixedWidget13: React.FC<Props> = ({ className, backGroundColor, chartHeight }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();

  useEffect(() => {
    const chart = refreshChart();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, mode]);

  const refreshChart = () => {
    if (!chartRef.current) {
      return;
    }

    const chart = new ApexCharts(chartRef.current, chartOptions(chartHeight));
    if (chart) {
      chart.render();
    }

    return chart;
  };

  return (
    <div
      className={`card ${className} theme-dark-bg-body`}
      style={{ backgroundColor: backGroundColor }}
    >
      {/* begin::Body */}
      <div className="card-body d-flex flex-column">
        {/* begin::Wrapper */}
        <div className="d-flex flex-column flex-grow-1">
          {/* begin::Title                    */}
          <a className="text-dark text-hover-primary fw-bolder fs-3" href="#">
            Earnings
          </a>
          {/* end::Title */}

          <div
            ref={chartRef}
            className="mixed-widget-13-chart"
            style={{ height: chartHeight, minHeight: chartHeight }}
          />
        </div>
        {/* end::Wrapper */}

        {/* begin::Stats */}
        <div className="pt-5">
          {/* begin::Symbol */}
          <span className="text-dark fw-bolder fs-2x lh-0">$</span>
          {/* end::Symbol */}

          {/* begin::Number */}
          <span className="text-dark fw-bolder fs-3x me-2 lh-0">560</span>
          {/* end::Number */}

          {/* begin::Text */}
          <span className="text-dark fw-bolder fs-6 lh-0">+ 28% this week</span>
          {/* end::Text */}
        </div>
        {/* end::Stats */}
      </div>
    </div>
  );
};

const chartOptions = (chartHeight: string): ApexOptions => {
  const labelColor = getCSSVariableValue('--kt-gray-800');
  const strokeColor = getCSSVariableValue('--kt-gray-300') as string;

  return {
    chart: {
      fontFamily: 'inherit',
      height: chartHeight,
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
    colors: ['#ffffff'],
    dataLabels: {
      enabled: false,
    },
    fill: {
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [20, 120, 120, 120],
      },
      type: 'gradient',
    },
    grid: {
      padding: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
      show: false,
    },
    legend: {
      show: false,
    },
    markers: {
      colors: [labelColor],

      // @ts-expect-error: TS2571 because the library definition is wrong
      strokeColor: [strokeColor],
      strokeWidth: 3,
    },
    plotOptions: {},
    series: [
      {
        data: [15, 25, 15, 40, 20, 50],
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
      colors: ['#FFFFFF'],
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
      max: 60,
      min: 0,
    },
  };
};

export { MixedWidget13 };
