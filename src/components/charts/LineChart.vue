<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data () {
    return {
      datacollection: {
        labels: ['2015', '2016', '2017'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [89, 90, 91],
            pointBackgroundColor: 'white',
            pointBorderColor: '#0D47A1',
            borderWidth: '2',
            fill: false,
            borderColor: '#0D47A1'
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              drawOnChartArea: true
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.datacollection, this.options, {responsive: true, maintainAspectRatio: false})
  }
}
</script>
