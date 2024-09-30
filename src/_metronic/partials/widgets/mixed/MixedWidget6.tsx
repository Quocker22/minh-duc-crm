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

const MixedWidget6: React.FC<Props> = ({ className, chartHeight, chartColor }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();
  const refreshChart = () => {
    if (!chartRef.current) {
      return;
    }

    const chart = new ApexCharts(chartRef.current, chartOptions(chartHeight, chartColor));
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
          <span className="card-label fw-bold fs-3 mb-1">Sales Overview</span>

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
        <div className="card-p pt-5 bg-body flex-grow-1">
          {/* begin::Row */}
          <div className="row g-0">
            {/* begin::Col */}
            <div className="col me-8">
              {/* begin::Label */}
              <div className="fs-7 text-muted fw-semobold">Average Sale</div>
              {/* end::Label */}

              {/* begin::Stat */}
              <div className="d-flex align-items-center">
                <div className="fs-4 fw-bold">$650</div>
                <KTSVG
                  className="svg-icon-5 svg-icon-success ms-1"
                  path="/media/icons/duotune/arrows/arr066.svg"
                />
              </div>
              {/* end::Stat */}
            </div>
            {/* end::Col */}

            {/* begin::Col */}
            <div className="col">
              {/* begin::Label */}
              <div className="fs-7 text-muted fw-semobold">Commission</div>
              {/* end::Label */}

              {/* begin::Stat */}
              <div className="fs-4 fw-bold">$233,600</div>
              {/* end::Stat */}
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}

          {/* begin::Row */}
          <div className="row g-0 mt-8">
            {/* begin::Col */}
            <div className="col me-8">
              {/* begin::Label */}
              <div className="fs-7 text-muted fw-semobold">Annual Taxes 2019</div>
              {/* end::Label */}

              {/* begin::Stat */}
              <div className="fs-4 fw-bold">$29,004</div>
              {/* end::Stat */}
            </div>
            {/* end::Col */}

            {/* begin::Col */}
            <div className="col">
              {/* begin::Label */}
              <div className="fs-7 text-muted fw-semobold">Annual Income</div>
              {/* end::Label */}

              {/* begin::Stat */}
              <div className="d-flex align-items-center">
                <div className="fs-4 fw-bold">$1,480,00</div>
                <KTSVG
                  className="svg-icon-5 svg-icon-danger ms-1"
                  path="/media/icons/duotune/arrows/arr065.svg"
                />
              </div>
              {/* end::Stat */}
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}
        </div>
        {/* end::Stats */}

        {/* begin::Chart */}
        <div
          ref={chartRef}
          className="mixed-widget-3-chart card-rounded-bottom"
          data-kt-chart-color={chartColor}
          style={{ height: chartHeight }}
        />
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  );
};

const chartOptions = (chartHeight: string, chartColor: string): ApexOptions => {
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

export { MixedWidget6 };
