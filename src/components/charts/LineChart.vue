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
            data: [40, 39, 10]
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false,
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
