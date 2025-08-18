// ================= CHARTJS SETUP =================

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
    }
  }
}

// Take in a map of languages and bytes used
// Turn it into a ChartJS format
export function generateLangDataPie(obj) {
  var toSort = [];
  var langs = [];
  var bytes = [];

  for (var [key, value] of Object.entries(obj)) {
    toSort.push([key, value]);
  }

  // Negative if second number goes first, etc...
  toSort.sort((x,y) => y[1] - x[1]);
  if (toSort.length > 10) {
    toSort = toSort.slice(0, 10);
  }

  for (var [key, value] of toSort) {
    langs.push(key);
    bytes.push(value);
  }

  const data = {
    labels: langs,
    datasets: [{
      label: 'Size of Files (Bytes)',
      data: bytes,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(255, 159, 64)'

      ],
      borderColor: [
        'rgb(123, 49, 65)',
        'rgb(27, 85, 123)',
        'rgb(131, 104, 42)',
        'rgb(51, 122, 122)',
        'rgb(131, 86, 41)'
      ],
      hoverOffset: 4
    }]
  };

  return data;
}

export function generateLangDataBar(map) {
  var langs = [];
  var bytes = [];

  for (var [key, value] of Object.entries(map)) {
    langs.push(key);
    bytes.push(value);
  }

  const data = {
    labels: langs,
    datasets: [{
      label: 'Usage',
      data: bytes,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    }]
  };

  return data;
}