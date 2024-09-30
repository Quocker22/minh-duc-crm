import ApexCharts, { ApexOptions } from 'apexcharts';
import React, { useEffect, useRef } from 'react';

import { getCSSVariableValue } from '@/_metronic/assets/ts/_utils';
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider';

type Props = {
  backGroundColor: string;
  chartHeight: string;
  className: string;
  title?: string;
};

const MixedWidget14: React.FC<Props> = ({
  className,
  backGroundColor,
  chartHeight = '150px',
  title,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();

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

  useEffect(() => {
    const chart = refreshChart();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartRef, mode]);

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
          <a className="text-dark text-hover-primary fw-bolder fs-1" href="#">
            {title ? title : 'Contributors'}
          </a>

          {/* end::Title */}

          <div
            ref={chartRef}
            className="mixed-widget-14-chart"
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
          <span className="text-dark fw-bolder fs-5x me-2 lh-0">47</span>
          {/* end::Number */}

          {/* begin::Text */}
          <span className="text-dark fw-bolder fs-6 lh-0">- 12% this week</span>
          {/* end::Text */}
        </div>
        {/* end::Stats */}
      </div>
    </div>
  );
};

const chartOptions = (chartHeight: string): ApexOptions => {
  const labelColor = getCSSVariableValue('--kt-gray-800');

  return {
    chart: {
      fontFamily: 'inherit',
      height: chartHeight,
      toolbar: {
        show: false,
      },
      type: 'bar',
    },
    colors: ['#ffffff'],
    dataLabels: {
      enabled: false,
      formatter(val) {
        return val + '%';
      },
      offsetY: -20,
      style: {
        colors: ['#304758'],
        fontSize: '12px',
      },
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
    plotOptions: {
      bar: {
        borderRadius: 2.5,
        columnWidth: '20%',
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    },
    series: [
      {
        data: [1, 2.1, 1, 2.1, 4.1, 6.1, 4.1, 4.1, 2.1, 4.1, 2.1, 3.1, 1, 1, 2.1],
        name: 'Inflation',
      },
    ],
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
        'Jan',
        'Feb',
        'Mar',
      ],
      crosshairs: {
        show: false,
      },
      labels: {
        show: false,
      },
      position: 'top',
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        // @ts-expect-error: TS2571 because the library definition is wrong
        background: labelColor,

        show: false,
      },
      labels: {
        formatter(val) {
          return val + '%';
        },
        show: false,
      },
      show: false,
    },
  };
};

export { MixedWidget14 };
