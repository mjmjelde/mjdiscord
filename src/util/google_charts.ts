import { init as initremote, renderGoogleChart } from './google-charts/render';

export async function init() {
    await initremote();
}

export async function getCandlestickChart(data: any): Promise<Buffer> {
    const t = `function drawChart() {
        var data = google.visualization.arrayToDataTable(${JSON.stringify(data)}, true);
        var options = {
            legend: 'none',
            bar: { groupWidth: '100%' }, // Remove space between bars.
            candlestick: {
                fallingColor: { strokeWidth: 0, fill: '#a52714', stroke: 'black' }, // red
                risingColor: { strokeWidth: 0, fill: '#0f9d58', stroke: 'black' }   // green
            },
            colors: ['black']
  
        };
        var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'))
        chart.draw(data, options);
    }`

    return await renderGoogleChart(t, {
        width: 1920,
        height: 1080
    });
}