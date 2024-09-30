import ApexCharts, { ApexOptions } from 'apexcharts';
import { FC, useEffect, useRef } from 'react';

type IProps = {
  readonly data?: {
    quantity: number;
    team_name: string;
  }[];
  readonly dataMember?: {
    name: string;
    quantity: number;
  }[];
  readonly organization?: boolean;
  readonly time?: number;
  readonly totalData?: number;
};

const ChartOverViewRecruitmentOrganization: FC<IProps> = ({
  data,
  totalData,
  dataMember,
  organization,
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const options: ApexOptions = {
      chart: {
        height: 350,
        toolbar: {
          show: false,
        },
        type: 'line',
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
        formatter(val: any) {
          return val;
        },
      },
      labels: organization
        ? dataMember?.map((value) => value.name)
        : data?.map((value) => value.team_name),
      series: [
        {
          data: organization
            ? dataMember?.map((value) => value.quantity) || []
            : data?.map((value) => value.quantity) || [],
          name: 'Dữ liệu',
          type: 'column',
        },
      ],
      stroke: {
        width: [0, 4],
      },
      title: {
        text: `Tổng số data đang có (${totalData})`,
      },
    };
    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [data, dataMember]);

  return <div ref={chartRef} className="pt-10" id="chart" />;
};

export { ChartOverViewRecruitmentOrganization };
