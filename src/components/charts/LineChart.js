import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  mounted () {
    this.renderChart({
      labels: ['2015', '2016', '2017'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 39, 10]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}
