let trace1 = {
    x: xData,
    y: yData
  };
  
  let data = [trace1];
  
  let layout = {
    title: "otu_ids"
  };
  
  Plotly.newPlot("plot", data, layout);


// Display the sample metadata, i.e., an individual's demographic information.
** activity day 3 5
//Display each key-value pair from the metadata JSON object somewhere on the page.



  const url = "https://api.spacexdata.com/v4/launchpads";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});
