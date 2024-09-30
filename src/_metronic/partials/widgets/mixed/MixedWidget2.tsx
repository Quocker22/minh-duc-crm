import ApexCharts, { ApexOptions } from 'apexcharts';
import React, { useEffect, useRef } from 'react';

import { getCSSVariableValue } from '@/_metronic/assets/ts/_utils';
import { KTSVG } from '@/_metronic/helpers';
import { Dropdown1 } from '@/_metronic/partials/content/dropdown/Dropdown1';
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider';

type Props = {
  chartColor: string;
  chartHeight: string;
  className: string;
  strokeColor: string;
};

const MixedWidget2: React.FC<Props> = ({ className, chartColor, chartHeight, strokeColor }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();
  const refreshChart = () => {
    if (!chartRef.current) {
      return;
    }

    const chart = new ApexCharts(
      chartRef.current,
      chartOptions(chartHeight, chartColor, strokeColor)
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
      {/* begin::Header */}
      <div className={`card-header border-0 py-5 bg-${chartColor}`}>
        <h3 className="card-title fw-bold text-white">Sales Statistics</h3>
        <div className="card-toolbar">
          {/* begin::Menu */}
          <button
            className="btn btn-sm btn-icon btn-color-white btn-active-white btn-active-color- border-0 me-n3"
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
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body p-0">
        {/* begin::Chart */}
        <div
          ref={chartRef}
          className={`mixed-widget-2-chart card-rounded-bottom bg-${chartColor}`}
        />
        {/* end::Chart */}
        {/* begin::Stats */}
        <div className="card-p mt-n20 position-relative">
          {/* begin::Row */}
          <div className="row g-0">
            {/* begin::Col */}
            <div className="col bg-light-warning px-6 py-8 rounded-2 me-7 mb-7">
              <KTSVG
                className="svg-icon-3x svg-icon-warning d-block my-2"
                path="/media/icons/duotune/general/gen032.svg"
              />
              <a className="text-warning fw-semobold fs-6" href="#">
                Weekly Sales
              </a>
            </div>
            {/* end::Col */}
            {/* begin::Col */}
            <div className="col bg-light-primary px-6 py-8 rounded-2 mb-7">
              <KTSVG
                className="svg-icon-3x svg-icon-primary d-block my-2"
                path="/media/icons/duotune/arrows/arr075.svg"
              />
              <a className="text-primary fw-semobold fs-6" href="#">
                New Users
              </a>
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}
          {/* begin::Row */}
          <div className="row g-0">
            {/* begin::Col */}
            <div className="col bg-light-danger px-6 py-8 rounded-2 me-7">
              <KTSVG
                className="svg-icon-3x svg-icon-danger d-block my-2"
                path="/media/icons/duotune/abstract/abs027.svg"
              />
              <a className="text-danger fw-semobold fs-6 mt-2" href="#">
                Item Orders
              </a>
            </div>
            {/* end::Col */}
            {/* begin::Col */}
            <div className="col bg-light-success px-6 py-8 rounded-2">
              <KTSVG
                className="svg-icon-3x svg-icon-success d-block my-2"
                path="/media/icons/duotune/communication/com010.svg"
              />
              <a className="text-success fw-semobold fs-6 mt-2" href="#">
                Bug Reports
              </a>
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}
        </div>
        {/* end::Stats */}
      </div>
      {/* end::Body */}
    </div>
  );
};

const chartOptions = (
  chartHeight: string,
  chartColor: string,
  strokeColor: string
): ApexOptions => {
  const labelColor = getCSSVariableValue('--kt-gray-500');
  const borderColor = getCSSVariableValue('--kt-gray-200');
  const color = getCSSVariableValue('--kt-' + chartColor);

  return {
    chart: {
      dropShadow: {
        blur: 3,
        color: strokeColor,
        enabled: true,
        enabledOnSeries: undefined,
        left: 0,
        opacity: 0.5,
        top: 5,
      },
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
    colors: ['transparent'],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 0,
      type: 'solid',
    },
    legend: {
      show: false,
    },
    markers: {
      colors: [color],
      strokeColors: [strokeColor],
      strokeWidth: 3,
    },
    plotOptions: {},
    series: [
      {
        data: [30, 45, 32, 70, 40, 40, 40],
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
      colors: [strokeColor],
      curve: 'smooth',
      show: true,
      width: 3,
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
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      crosshairs: {
        position: 'front',
        show: false,
        stroke: {
          color: borderColor,
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
};

export { MixedWidget2 };
