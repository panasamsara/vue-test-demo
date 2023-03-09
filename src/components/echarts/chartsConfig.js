export default {
    line:{
        option :{
            xAxis: {
              type: 'category',
              data: []
            },
            yAxis: {
              type: 'value'
            },
            legend: {
              data: []
            },
            series: [
              {
                data: [],
                type: 'line'
              }
            ],
            color:['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
            tooltip:{
              trigger: 'axis'
            }
          }
    },
    histogram:{
      option:{
        xAxis: {
          type: 'category',
          data: []
        },
        legend: {
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'bar'
          }
        ],
        color:['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        tooltip:{
          trigger: 'axis'
        }
      }
    }
}