<script>
import { Doughnut } from 'vue-chartjs'
import pattern from 'patternomaly'

export default {
  extends: Doughnut,
  data () {
    return {

      datacollection: {
        htmlLegend: null,
        labels: ['Log Level', ''],
        datasets: [
          {
            label: 'GitHub Commits',
            backgroundColor: [
              pattern.draw('dot', '#3F51B5'),
              '#E0E0E0'
            ],
            borderWidth: 0,
            hoverBorderWidth: 0,
            height: '75%',
            data: [75, 25]
          }
        ]
      },
      options: {
        rotation: -1.0 * Math.PI,
        circumference: 1 * Math.PI,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }

    }
  },
  mounted () {
    this.renderChart(this.datacollection, this.options, {responsive: true, maintainAspectRatio: false})
  }
}
</script>
