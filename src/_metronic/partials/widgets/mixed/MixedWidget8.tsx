import ApexCharts, { ApexOptions } from 'apexcharts';
import React, { useEffect, useRef } from 'react';

import { getCSSVariableValue } from '@/_metronic/assets/ts/_utils';
import { KTSVG, toAbsoluteUrl } from '@/_metronic/helpers';
import { Dropdown1 } from '@/_metronic/partials/content/dropdown/Dropdown1';
import { useThemeMode } from '@/_metronic/partials/layout/theme-mode/ThemeModeProvider';

type Props = {
  chartColor: string;
  chartHeight: string;
  className: string;
};

const MixedWidget8: React.FC<Props> = ({ className, chartColor, chartHeight }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();
  const refreshChart = () => {
    if (!chartRef.current) {
      return;
    }

    const chart1 = new ApexCharts(chartRef.current, chart1Options(chartColor, chartHeight));
    if (chart1) {
      chart1.render();
    }

    return chart1;
  };

  useEffect(() => {
    const chart1 = refreshChart();

    return () => {
      if (chart1) {
        chart1.destroy();
      }
    };
  }, [chartRef, mode]);

  return (
    <div className={`card ${className}`}>
      {/* begin::Beader */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Trends</span>

          <span className="text-muted fw-semobold fs-7">Latest trends</span>
        </h3>

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
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body d-flex flex-column">
        {/* begin::Chart */}
        <div ref={chartRef} className="mixed-widget-5-chart card-rounded-top" />
        {/* end::Chart */}

        {/* begin::Items */}
        <div className="mt-5">
          {/* begin::Item */}
          <div className="d-flex flex-stack mb-5">
            {/* begin::Section */}
            <div className="d-flex align-items-center me-2">
              {/* begin::Symbol */}
              <div className="symbol symbol-50px me-3">
                <div className="symbol-label bg-light">
                  <img
                    alt=""
                    className="h-50"
                    src={toAbsoluteUrl('/media/svg/brand-logos/plurk.svg')}
                  />
                </div>
              </div>
              {/* end::Symbol */}

              {/* begin::Title */}
              <div>
                <a className="fs-6 text-gray-800 text-hover-primary fw-bold" href="#">
                  Top Authors
                </a>
                <div className="fs-7 text-muted fw-semobold mt-1">Ricky Hunt, Sandra Trepp</div>
              </div>
              {/* end::Title */}
            </div>
            {/* end::Section */}

            {/* begin::Label */}
            <div className="badge badge-light fw-semobold py-4 px-3">+82$</div>
            {/* end::Label */}
          </div>
          {/* end::Item */}

          {/* begin::Item */}
          <div className="d-flex flex-stack mb-5">
            {/* begin::Section */}
            <div className="d-flex align-items-center me-2">
              {/* begin::Symbol */}
              <div className="symbol symbol-50px me-3">
                <div className="symbol-label bg-light">
                  <img
                    alt=""
                    className="h-50"
                    src={toAbsoluteUrl('/media/svg/brand-logos/figma-1.svg')}
                  />
                </div>
              </div>
              {/* end::Symbol */}

              {/* begin::Title */}
              <div>
                <a className="fs-6 text-gray-800 text-hover-primary fw-bold" href="#">
                  Top Sales
                </a>
                <div className="fs-7 text-muted fw-semobold mt-1">PitStop Emails</div>
              </div>
              {/* end::Title */}
            </div>
            {/* end::Section */}

            {/* begin::Label */}
            <div className="badge badge-light fw-semobold py-4 px-3">+82$</div>
            {/* end::Label */}
          </div>
          {/* end::Item */}

          {/* begin::Item */}
          <div className="d-flex flex-stack">
            {/* begin::Section */}
            <div className="d-flex align-items-center me-2">
              {/* begin::Symbol */}
              <div className="symbol symbol-50px me-3">
                <div className="symbol-label bg-light">
                  <img
                    alt=""
                    className="h-50"
                    src={toAbsoluteUrl('/media/svg/brand-logos/vimeo.svg')}
                  />
                </div>
              </div>
              {/* end::Symbol */}

              {/* begin::Title */}
              <div className="py-1">
                <a className="fs-6 text-gray-800 text-hover-primary fw-bold" href="#">
                  Top Engagement
                </a>

                <div className="fs-7 text-muted fw-semobold mt-1">KT.com</div>
              </div>
              {/* end::Title */}
            </div>
            {/* end::Section */}

            {/* begin::Label */}
            <div className="badge badge-light fw-semobold py-4 px-3">+82$</div>
            {/* end::Label */}
          </div>
          {/* end::Item */}
        </div>
        {/* end::Items */}
      </div>
      {/* end::Body */}
    </div>
  );
};

const chart1Options = (chartColor: string, chartHeight: string): ApexOptions => {
  const labelColor = getCSSVariableValue('--kt-gray-800');
  const strokeColor = getCSSVariableValue('--kt-gray-300');
  const baseColor = getCSSVariableValue('--kt-' + chartColor) as string;
  const lightColor = getCSSVariableValue('--kt-' + chartColor + '-light');

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
    colors: [lightColor],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: 'solid',
    },
    fill1: {
      gradient: {
        colorStops: [],
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 0.375,
        shadeIntensity: 0.5,
        stops: [25, 50, 100],
        type: 'vertical',
      },
      opacity: 1,
      type: 'gradient',
    },
    legend: {
      show: false,
    },
    markers: {
      colors: [lightColor],

      // @ts-expect-error: TS2571 because the library definition is wrong
      strokeColor: [baseColor],
      strokeWidth: 3,
    },
    plotOptions: {},
    series: [
      {
        data: [30, 30, 60, 25, 25, 40],
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
      max: 65,
      min: 0,
    },
  };
};

export { MixedWidget8 };
