import { Fragment } from 'react'

import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';


export const MyChart = (chartdata) => (
    <Fragment>
        <ChartContainer
            series={chartdata}
            width={500}
            height={400}
            xAxis={[
                {
                id: 'month',
                data: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet"],
                scaleType: 'band',
                valueFormatter: (value) => value.toString(),
                },
            ]}
            yAxis={[
                {
                id: 'eco',
                scaleType: 'linear',
                }
            ]}
            >
            <BarPlot />
            <LinePlot />
            <ChartsXAxis label="Mois" position="bottom" axisId="month" />
            <ChartsYAxis label="Nombre" position="left" axisId="eco" />
        </ChartContainer>
    </Fragment>
)