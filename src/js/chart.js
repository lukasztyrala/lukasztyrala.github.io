	// Prepare the data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const distances2021 = [ 48,  43, 222, 178, 484, 444, 112, 450,  91, 141,  14, 131];
  const distances2022 = [ 71, 141, 279, 318,  85, 365, 472, 497, 302, 276, 224, 157];
  const distances2023 = [ 97, 100,  82, 275, 293, 270, 197, 272,  83, 255,  89,  50];
  const distances2024 = [  0,  69,  53, 111, 171, 239,  81, 271,   3, NaN, NaN, NaN];
  
  // Data structure for uPlot
  const data = [
    months.map((m, i) => i), // Convert month names to indices
    distances2021,
    distances2022,
    distances2023,
    distances2024,
  ];
  
console.log(data)

  // Set the options
  const options = {
    height: 200,
    series: [
      { value: (self, rawValue) => months[rawValue] }, // Assuming months are 0-indexed
      {
        label: "2021",
        stroke: '#a1c0cc',
        dash: [10,5],
        width: 2,
        value: (self, rawValue) => rawValue + ' km', // Append 'km' units to series values
      },
      {
        label: "2022",
        stroke: '#a1c0cc',
        width: 2,
        value: (self, rawValue) => rawValue + ' km', // Append 'km' units to series values
      },
      {
        label: "2023",
        stroke: '#a1c0cc',
        width: 2,
        value: (self, rawValue) => rawValue + ' km', // Append 'km' units to series values
      },
      {
        label: "2024",
        stroke: '#223e5d',
        width: 2,
        value: (self, rawValue) => rawValue + ' km', // Append 'km' units to series values
      },
    ],
   axes: [
     {
       values: (self, ticks) => ticks.map(idx => months[idx]), // Format x-axis labels
       grid: { show: false }, // Hide x-axis gridlines
     },
     {
       show: false, // Hide y-axis labels and gridlines
       grid: { show: false },
     },
   ],
  };

// Target a DOM element
const element = document.getElementById('chart');

// 

function createChart() {
  const element = document.getElementById('chart');
  if (element) {
    element.innerHTML = '';

    // Since the DOM is fully loaded, no need for requestAnimationFrame
    const uplot = new uPlot(options, data, element);

    // Set the initial size explicitly
    uplot.setSize({
      width: element.clientWidth,
      height: options.height
    });

    // Resize handling
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        uplot.setSize({
          width: element.clientWidth,
          height: options.height
        });
      }, 100);
    });
  }
}

// Execute immediately since this script is loaded at the end of the body
createChart();
