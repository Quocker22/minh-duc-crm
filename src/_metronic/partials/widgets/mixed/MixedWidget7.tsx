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

const MixedWidget7: React.FC<Props> = ({ className, chartColor, chartHeight }) => {
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
          <span className="card-label fw-bold fs-3 mb-1">Action Needed</span>
          <span className="text-muted fw-semobold fs-7">Complete your profile setup</span>
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
        <div className="flex-grow-1">
          <div ref={chartRef} className="mixed-widget-4-chart" />
        </div>

        <div className="pt-5">
          <p className="text-center fs-6 pb-5 ">
            <span className="badge badge-light-danger fs-8">Notes:</span>&nbsp; Current sprint
            requires stakeholders
            <br />
            to approve newly amended policies
          </p>

          <a className={`btn btn-${chartColor} w-100 py-3`} href="#">
            Take Action
          </a>
        </div>
      </div>
      {/* end::Body */}
    </div>
  );
};

const chartOptions = (chartColor: string, chartHeight: string): ApexOptions => {
  const baseColor = getCSSVariableValue('--kt-' + chartColor);
  const lightColor = getCSSVariableValue('--kt-' + chartColor + '-light');
  const labelColor = getCSSVariableValue('--kt-gray-700');

  return {
    chart: {
      fontFamily: 'inherit',
      height: chartHeight,
      type: 'radialBar',
    },
    colors: [baseColor],
    labels: ['Progress'],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontWeight: '700',
            show: false,
          },
          value: {
            color: labelColor,
            fontSize: '30px',
            fontWeight: '700',
            formatter(val) {
              return val + '%';
            },
            offsetY: 12,
            show: true,
          },
        },
        hollow: {
          margin: 0,
          size: '65%',
        },
        track: {
          background: lightColor,
          strokeWidth: '100%',
        },
      },
    },
    series: [74],
    stroke: {
      lineCap: 'round',
    },
  };
};

export { MixedWidget7 };
