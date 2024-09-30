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
};

const MixedWidget9: React.FC<Props> = ({ className, chartColor, chartHeight }) => {
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
      {/* begin::Beader */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Sales Statistics</span>

          <span className="text-muted fw-semobold fs-7">Recent sales statistics</span>
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
      <div className="card-body p-0 d-flex flex-column">
        {/* begin::Stats */}
        <div className="card-px pt-5 pb-10 flex-grow-1">
          {/* begin::Row */}
          <div className="row g-0 mt-5 mb-10">
            {/* begin::Col */}
            <div className="col">
              <div className="d-flex align-items-center me-2">
                {/* begin::Symbol */}
                <div className="symbol symbol-50px me-3">
                  <div className="symbol-label bg-light-info">
                    <KTSVG
                      className="svg-icon-1 svg-icon-info"
                      path="/media/icons/duotune/art/art007.svg"
                    />
                  </div>
                </div>
                {/* end::Symbol */}

                {/* begin::Title */}
                <div>
                  <div className="fs-4 text-dark fw-bold">$2,034</div>
                  <div className="fs-7 text-muted fw-semobold">Author Sales</div>
                </div>
                {/* end::Title */}
              </div>
            </div>
            {/* end::Col */}

            {/* begin::Col */}
            <div className="col">
              <div className="d-flex align-items-center me-2">
                {/* begin::Symbol */}
                <div className="symbol symbol-50px me-3">
                  <div className="symbol-label bg-light-danger">
                    <KTSVG
                      className="svg-icon-1 svg-icon-danger"
                      path="/media/icons/duotune/abstract/abs027.svg"
                    />
                  </div>
                </div>
                {/* end::Symbol */}

                {/* begin::Title */}
                <div>
                  <div className="fs-4 text-dark fw-bold">$706</div>
                  <div className="fs-7 text-muted fw-semobold">Commision</div>
                </div>
                {/* end::Title */}
              </div>
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}

          {/* begin::Row */}
          <div className="row g-0">
            {/* begin::Col */}
            <div className="col">
              <div className="d-flex align-items-center me-2">
                {/* begin::Symbol */}
                <div className="symbol symbol-50px me-3">
                  <div className="symbol-label bg-light-success">
                    <KTSVG
                      className="svg-icon-1 svg-icon-success"
                      path="/media/icons/duotune/ecommerce/ecm002.svg"
                    />
                  </div>
                </div>
                {/* end::Symbol */}

                {/* begin::Title */}
                <div>
                  <div className="fs-4 text-dark fw-bold">$49</div>
                  <div className="fs-7 text-muted fw-semobold">Average Bid</div>
                </div>
                {/* end::Title */}
              </div>
            </div>
            {/* end::Col */}

            {/* begin::Col */}
            <div className="col">
              <div className="d-flex align-items-center me-2">
                {/* begin::Symbol */}
                <div className="symbol symbol-50px me-3">
                  <div className="symbol-label bg-light-primary">
                    <KTSVG
                      className="svg-icon-1 svg-icon-primary"
                      path="/media/icons/duotune/ecommerce/ecm010.svg"
                    />
                  </div>
                </div>
                {/* end::Symbol */}

                {/* begin::Title */}
                <div>
                  <div className="fs-4 text-dark fw-bold">$5.8M</div>
                  <div className="fs-7 text-muted fw-semobold">All Time Sales</div>
                </div>
                {/* end::Title */}
              </div>
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}
        </div>
        {/* end::Stats */}

        {/* begin::Chart */}
        <div ref={chartRef} className="mixed-widget-6-chart card-rounded-bottom" />
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  );
};

const chartOptions = (chartColor: string, chartHeight: string): ApexOptions => {
  const labelColor = getCSSVariableValue('--kt-gray-800');
  const strokeColor = getCSSVariableValue('--kt-gray-300');
  const baseColor = getCSSVariableValue('--kt-' + chartColor);
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
        data: [30, 25, 45, 30, 55, 55],
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
};

export { MixedWidget9 };
