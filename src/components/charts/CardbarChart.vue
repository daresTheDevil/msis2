<script>
import {HorizontalBar} from 'vue-chartjs'
import pattern from 'patternomaly'

export default {
  extends: HorizontalBar,
  data () {
    return {
      datacollection: {
        labels: ['State', 'District', 'School'],
        datasets: [
          {
            // label: 'State',
            backgroundColor: [
              pattern.draw('dot', 'navy'), pattern.draw('dot', 'rebeccapurple'), pattern.draw('dot', 'orange')
            ],
            data: [87, 89, 90]
          }
        ]
      },
      options: {
        categoryPercentage: 1.0,
        barPercentage: 1.0,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridlines: {
              display: false
            },
            ticks: {
              reverse: true,
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
