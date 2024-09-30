import ApexCharts, { ApexOptions } from 'apexcharts';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';

import { getCSSVariableValue } from '@/_metronic/assets/ts/_utils';
import { KTSVG } from '@/_metronic/helpers';
import { Dropdown1 } from '@/_metronic/partials/content/dropdown/Dropdown1';
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider';

type Props = {
  chartColor: string;
  chartHeight: string;
  className: string;
};

const MixedWidget3: React.FC<Props> = ({ className, chartColor, chartHeight }) => {
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
    <div className={`card ${className}`}>
      {/* begin::Header  */}
      <div className={`card-header border-0 bg-${chartColor} py-5`}>
        <h3 className="card-title fw-bold text-white">Sales Progress</h3>

        <div className="card-toolbar">
          {/* begin::Menu  */}
          <button
            className={clsx(
              'btn btn-sm btn-icon btn-color-white btn-active-white',
              `btn-active-color-${chartColor}`,
              'border-0 me-n3'
            )}
            data-kt-menu-flip="top-end"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-trigger="click"
            type="button"
          >
            <KTSVG className="svg-icon-2" path="/media/icons/duotune/general/gen024.svg" />
          </button>
          <Dropdown1 />
          {/* end::Menu  */}
        </div>
      </div>
      {/* end::Header  */}

      {/* begin::Body  */}
      <div className="card-body p-0">
        {/* begin::Chart  */}
        <div
          ref={chartRef}
          className={`mixed-widget-12-chart card-rounded-bottom bg-${chartColor}`}
        />
        {/* end::Chart  */}

        {/* begin::Stats  */}
        <div className="card-rounded bg-body mt-n10 position-relative card-px py-15">
          {/* begin::Row  */}
          <div className="row g-0 mb-7">
            {/* begin::Col  */}
            <div className="col mx-5">
              <div className="fs-6 text-gray-400">Avarage Sale</div>
              <div className="fs-2 fw-bold text-gray-800">$650</div>
            </div>
            {/* end::Col  */}

            {/* begin::Col  */}
            <div className="col mx-5">
              <div className="fs-6 text-gray-400">Comissions</div>
              <div className="fs-2 fw-bold text-gray-800">$29,500</div>
            </div>
            {/* end::Col  */}
          </div>
          {/* end::Row  */}

          {/* begin::Row  */}
          <div className="row g-0">
            {/* begin::Col  */}
            <div className="col mx-5">
              <div className="fs-6 text-gray-400">Revenue</div>
              <div className="fs-2 fw-bold text-gray-800">$55,000</div>
            </div>
            {/* end::Col  */}

            {/* begin::Col  */}
            <div className="col mx-5">
              <div className="fs-6 text-gray-400">Expenses</div>
              <div className="fs-2 fw-bold text-gray-800">$1,130,600</div>
            </div>
            {/* end::Col  */}
          </div>
          {/* end::Row  */}
        </div>
        {/* end::Stats  */}
      </div>
      {/* end::Body  */}
    </div>
  );
};

const chartOptions = (chartHeight: string): ApexOptions => {
  const labelColor = getCSSVariableValue('--kt-gray-500');
  const borderColor = getCSSVariableValue('--kt-gray-200');

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
      type: 'bar',
    },
    colors: ['#ffffff', '#ffffff'],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: [0.25, 1],
      type: ['solid', 'solid'],
    },
    grid: {
      borderColor,
      padding: {
        left: 20,
        right: 20,
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
        columnWidth: '30%',
        horizontal: false,
      },
    },
    series: [
      {
        data: [35, 65, 75, 55, 45, 60, 55],
        name: 'Net Profit',
      },
      {
        data: [40, 70, 80, 60, 50, 65, 60],
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
      width: 1,
    },
    tooltip: {
      marker: {
        show: false,
      },
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
      max: 100,
      min: 0,
    },
  };
};

export { MixedWidget3 };
