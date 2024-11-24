import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import styles from './BarDiagram.module.scss'
import { FC, useContext, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { ThemeContext } from '../../Providers/ThemeProvider';
import { DiagramTooltip } from '../DiagramTooltip';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export type TChartData = {
  labels: string[];
  datasets: {
    borderRadius: number;
    barPercentage: number;
    label: string;
    data: number[];
    backgroundColor: (ctx: {
      chart: { ctx: CanvasRenderingContext2D };
    }) => CanvasGradient;
  }[];
};

type TBarDiagramProps = {
  labels: string[];
  label: string;
  data: number[];
};

export const BarDiagram: FC<TBarDiagramProps> = ({ labels, label, data }) => {
  const [theme] = useContext(ThemeContext);
  const [isShowTooltip, setIsShowTooltip] = useState(false);
  const [onMouseTooltip, setOnMouseTooltip] = useState(false)
  const [tooltipData, setTooltipData] = useState({
    label: '',
    value: 0,
    x: 0,
    y: 0,
  });

  const options: ChartOptions<'bar'> = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: true,
          color: `${theme === 'dark' ? '#ffffff' : '#858585'}`,
        },
        border: {
          color: 'transparent',
        },
      },
      y: {
        max: 60,
        grid: {
          display: true,
          color: context => {
            if (context.tick.value === 0) {
              return 'transparent';
            }
            return 'rgba(140, 160, 179, 0.7)';
          },
          lineWidth: 0.5,
          drawTicks: false,
        },
        border: {
          dash: context => {
            return context.tick.value === context.scale.max ? [] : [2, 1];
          },
          width: 3,
          color: 'rgba(176, 190, 197, 0.5)',
        },
        ticks: {
          display: true,
          stepSize: 10,
          padding: 20,
          color: `${theme === 'dark' ? '#ffffff' : '#858585'}`,
          callback: function (value) {
            if (value === 0) {
              return '';
            }
            return value;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Отображаем легенду
      },
      tooltip: {
        enabled: false,
        yAlign: 'top',
        displayColors: false,
        callbacks: {
          title: function () {
            return '';
          },
          label: function (tooltipItem) {
            return `Value: ${tooltipItem.raw}`; // Форматируем текст тултипа
          },
        },
        external: function (context) {
          const { opacity } = context.tooltip;
          setTimeout(() => {
          if (opacity === 1 && !isShowTooltip) {
            setIsShowTooltip(true);
            setTooltipData({
              // label: context.tooltip.dataPoints[0].label,
              label: 'Avarage score',
              value: context.tooltip.dataPoints[0].raw as number,
              x: context.tooltip.x,
              y: context.tooltip.y,
            });
            return;
          } else if (opacity === 0 && isShowTooltip && !onMouseTooltip) {
                setIsShowTooltip(false);
          }
        }, 200)
        },
      },
    },
  };
  const chartData: TChartData = {
    labels: labels,
    datasets: [
      {
        borderRadius: 50,
        barPercentage: 0.3,
        label: label,
        data: data,
        backgroundColor: ctx => {
          const chart = ctx.chart;
          const { ctx: canvasCtx } = chart;
          const gradient = canvasCtx.createLinearGradient(0, 0, 0, 700);
          gradient.addColorStop(0, 'rgba(253, 116, 155, 1)');
          gradient.addColorStop(1, 'rgba(40, 26, 200, 1)');
          return gradient;
        },
      },
    ],
  };
  return (
    <div style={{ position: 'relative' }}>
      <h3 className={styles.title}>My Own Report</h3>
      <Bar data={chartData} options={options} />
      <DiagramTooltip
        tooltip={tooltipData}
        isShowTooltip={isShowTooltip}
        onMouseEnter={() => {setOnMouseTooltip(true)}}
        onMouseLeave={() => {
          setIsShowTooltip(false)
          setOnMouseTooltip(false)
        }}
      />
    </div>
  );
};
