const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

function init() {
    d3.json(url).then(function (data) {
        console.log(data);
        let names = data.names;
        let dropdown = d3.select("#selDataset");
        for (let i = 0; i < names.length; i++) {
            dropdown.append("option").text(names[i]).property("value", names[i]);
        }

        panel(names[0], data);
        charts(names[0], data);
    }).catch(function(error) {
        console.log("Error fetching data:", error);
    });
}

function panel(x, data) {
    let metadataPanel = d3.select("#sample-metadata");
    metadataPanel.html("");
    let metadata = data.metadata.find(sample => sample.id == x);

    Object.entries(metadata).forEach(([key, value]) => {
        metadataPanel.append("p").text(`${key}: ${value}`);
    });
}

function charts(y, data) {
    createChart(y, data);
}

function createChart(sampleID, data) {
    let samples = data.samples.filter(sample => sample.id === sampleID)[0];

    let top10_otus = samples.otu_ids.slice(0, 10).reverse();
    let top10_sample_values = samples.sample_values.slice(0, 10).reverse();
    let top10_otu_labels = samples.otu_labels.slice(0, 10).reverse();

    let trace = {
        x: top10_sample_values,
        y: top10_otus.map(otu => `OTU ${otu}`),
        text: top10_otu_labels,
        type: "bar",
        orientation: "h"
    };

    let plotData = [trace];

    let layout = {
        title: "Top 10 Bacteria Cultures Found",
        xaxis : { title: 'Number of Bacteria'},
        yaxis: {
            tickmode: "linear"
        }
    };

    Plotly.newPlot("bar", plotData, layout);

    let sample = data.samples.find(sample => sample.id === sampleID);
    let bubbleTrace = {
        x: sample.otu_ids,
        y: sample.sample_values,
        text: sample.otu_labels,
        mode: 'markers',
        marker: {
            size: sample.sample_values,
            color: sample.otu_ids,
            colorscale: 'Earth'
        }
    };

    let bubbleData = [bubbleTrace];
    let bubbleLayout = {
        title: 'Bacteria Cultures Per Sample',
        xaxis: { title: 'OTU ID' },
        yaxis: { title: 'Number of Bacteria' },
        hovermode: 'closest',
        showlegend: false
    };

    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
}

function optionChanged(value) {
    panel(value);
    charts(value);
}

init();