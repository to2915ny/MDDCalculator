var temp =chartdata.replace(/&quot;/g,"\"");
var obj= JSON.parse(temp);
//console.log(average);
const config = {
  type: 'line',
  data: {
  datasets:[{
		label :stock,
		data: obj,
		borderColor: 'rgba(255, 0, 0, 1)'
		}]
		},
  options: {
	parsing: {xAxisKey : 'date',yAxisKey : 'dd'},
    responsive: true,
    plugins: {
    
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '2010-01-01 ~ 현재일까지 DrawDown Chart'
      },
		  annotation: {
      annotations: {
        line1: {
          type: 'line',
          yMin: average,
          yMax: average,
          borderColor: 'rgb(0, 0, 255)',
          borderWidth: 3,
		  label : {content : 'DrawDown 평균값 '+average+'%',enabled : true}
        }
      }
    }
    }
  },
};

var myChart = new Chart(
	document.getElementById('myChart'),
	config
	);

