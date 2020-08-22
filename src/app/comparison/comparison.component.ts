import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user.service";
import * as Chart from 'chart.js';
import {IBenchmark} from "../interfaces/benchmark";

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {
    benchmarks;
    graphOpts;
    freqGraphOpts;
    cinebenchGraphOpts;
    fxExGraphOpts;
    fxExPhysGraphOpts;
    fxUlGraphOpts;
    title;
    profiles: IBenchmark[] = [];
    constructor(private route: ActivatedRoute, private userService: UserService) {
    }

     ngOnInit() {
         this.graphOpts = {
             graphLabels: [],
             graphData: [],
             graphColors: [],
             graphBorderColors: [],
             graphTitle: '',
             graphStep: 100
         };
         this.userService.getComparison(this.route.snapshot.paramMap.get('compareId')).subscribe((response) => {
             this.title = response['summary']
             for(let i=0;i<response['results'].length;i++){
                 this.profiles.push(response['results'][i]['profile'])
             }

             Chart.defaults.global.defaultFontColor = "#babcbd";
             this.benchmarks = response['results'];
             // Generate graph options
             let cbGraphOpts = this.generateCinebenchOpts(this.benchmarks);
             let freqGraphOpts = this.generateFrequencyOpts(this.benchmarks);

             let fsExPhysGraphOpts = this.generate3dMarkFSExPhysOpts(this.benchmarks);
             let fsExGraphOpts = this.generate3dMarkFSExOpts(this.benchmarks);
             let fsUlGraphOpts = this.generate3dMarkFSUlOpts(this.benchmarks);

             // Generate graph given options and element
             this.freqGraphOpts = this.generateGraph(freqGraphOpts);

             if (cbGraphOpts) {
                 this.cinebenchGraphOpts = this.generateGraph(cbGraphOpts);
             }
             if (fsExGraphOpts) {
                 this.fxExGraphOpts = this.generateGraph(fsExGraphOpts);
             }
             if (fsExPhysGraphOpts) {
                 this.fxExPhysGraphOpts = this.generateGraph(fsExPhysGraphOpts);
             }
             if (fsUlGraphOpts) {
                 this.fxUlGraphOpts = this.generateGraph(fsUlGraphOpts);
             }
             // for (let i = 0; i < this.benchmarks.length; i++) {
             //     let bench_key = Object.keys(this.benchmarks[i])[0];
             //     // $('.specs').append("<p>"+this.benchmarks[i].benchmarks.model+"</p>")
             // }
         })
     }

    generateCinebenchOpts (graphData) {
        let CinebenchOpts = JSON.parse(JSON.stringify(this.graphOpts));

        CinebenchOpts.graphTitle = 'Cinebench Score';

        for (let i = 0; i < graphData.length; i++) {
            CinebenchOpts.graphLabels.push(graphData[i].profile.model + ' (' + graphData[i].profile.title + ')');
            if (graphData[i].profile.cinebench_score === "0") {
                return false
            }
            CinebenchOpts.graphData.push(graphData[i].profile.cinebench_score);
            //cores_data.push(benchmarks[i].freq_int);
            //colors.push('rgba(54, 162, 235, 0.2)');
            CinebenchOpts.graphColors.push('rgba(54, 162, 235, 0.2)');
            CinebenchOpts.graphBorderColors.push('rgba(54, 162, 235, 1)');
        }
        let cb_min = Math.floor(Math.min.apply(Math, CinebenchOpts.graphData) / 100) * 100;
        cb_min = cb_min - 500;
        if (cb_min < 0) {
            cb_min = 0
        }
        CinebenchOpts.scaleMin = cb_min;
        return CinebenchOpts
    }

    generateFrequencyOpts (graphData) {
        let FrequencyOpts = JSON.parse(JSON.stringify(this.graphOpts));

        FrequencyOpts.graphTitle = 'Frequency (MHz)';

        for (let i = 0; i < graphData.length; i++) {
            let score = graphData[i].profile.freq_int;
            let append = true;
            if (score >= FrequencyOpts.graphData[0]) {
                append = false;
            }
            if (append) {
                FrequencyOpts.graphLabels.push(graphData[i].profile.model + ' (' + graphData[i].profile.title + ')');
                FrequencyOpts.graphData.push(score);
                FrequencyOpts.graphColors.push('rgba(54, 162, 235, 0.2)');
                FrequencyOpts.graphBorderColors.push('rgba(54, 162, 235, 1)');
            }
            else{
                FrequencyOpts.graphLabels.unshift(graphData[i].profile.model + ' (' + graphData[i].profile.title + ')');
                FrequencyOpts.graphData.unshift(score);
                FrequencyOpts.graphColors.unshift('rgba(54, 162, 235, 0.2)');
                FrequencyOpts.graphBorderColors.unshift('rgba(54, 162, 235, 1)');
            }
        }
        let min = Math.floor(Math.min.apply(Math, FrequencyOpts.graphData) / 100) * 100;
        let max = Math.ceil(Math.max.apply(Math, FrequencyOpts.graphData) / 100) * 100;
        min = min - 100;
        if(min < 0){ min = 0 }
        FrequencyOpts.scaleMin = min;
        FrequencyOpts.scaleMax = max+100;
        return FrequencyOpts
    };

    generate3dMarkFSExOpts (graphData) {
        let fireStrikeOpts = JSON.parse(JSON.stringify(this.graphOpts));
        fireStrikeOpts.graphTitle = '3DMark FS Extreme';
        fireStrikeOpts.graphStep = 500;
        for (let i = 0; i < graphData.length; i++) {
            if(graphData[i].tdmark_result.length === 0){
                return false
            }
            for (let b=0; b < graphData[i].tdmark_result.length; b++){
                if(graphData[i].tdmark_result[b].version === 'FireStrikeExtreme'){
                    let score = graphData[i].tdmark_result[b].final_score;
                    // Check if we should be appending to the existing data or prepending, depending on if this value is highest or lowest
                    let append = true;
                    if (score >= fireStrikeOpts.graphData[0]) {
                        append = false;
                    }

                    if(append) {
                        fireStrikeOpts.graphLabels.push(graphData[i].profile.gpu[0].model);
                        fireStrikeOpts.graphData.push(score);
                        fireStrikeOpts.graphColors.push('rgba(54, 162, 235, 0.2)');
                        fireStrikeOpts.graphBorderColors.push('rgba(54, 162, 235, 1)');
                    }
                    else {
                        fireStrikeOpts.graphLabels.unshift(graphData[i].profile.gpu[0].model);
                        fireStrikeOpts.graphData.unshift(score);
                        fireStrikeOpts.graphColors.unshift('rgba(54, 162, 235, 0.2)');
                        fireStrikeOpts.graphBorderColors.unshift('rgba(54, 162, 235, 1)');
                    }
                }
            }
        }
        let min = Math.floor(Math.min.apply(Math, fireStrikeOpts.graphData) / 100) * 100;
        let max = Math.ceil(Math.max.apply(Math, fireStrikeOpts.graphData) / 100) * 100;
        min = min - 1500;
        if(min < 0){ min = 0 }
        fireStrikeOpts.scaleMin = min;
        fireStrikeOpts.scaleMax = max+1000;
        return fireStrikeOpts
    };

    generate3dMarkFSExPhysOpts (graphData) {
        let fireStrikeOpts = JSON.parse(JSON.stringify(this.graphOpts));
        fireStrikeOpts.graphTitle = '3DMark FS Extreme Physics Score';
        fireStrikeOpts.graphStep = 500;
        for (let i = 0; i < graphData.length; i++) {
            if(graphData[i].tdmark_result.length === 0){
                return false
            }
            for (let b=0; b < graphData[i].tdmark_result.length; b++){
                if(graphData[i].tdmark_result[b].version === 'FireStrikeExtreme'){
                    let score = graphData[i].tdmark_result[b].physics_score;
                    let append = true;
                    if (score >= fireStrikeOpts.graphData[0]) {
                        append = false;
                    }

                    if(append) {
                        fireStrikeOpts.graphLabels.push(graphData[i].profile.gpu[0].model);
                        fireStrikeOpts.graphData.push(score);
                        fireStrikeOpts.graphColors.push('rgba(54, 162, 235, 0.2)');
                        fireStrikeOpts.graphBorderColors.push('rgba(54, 162, 235, 1)');
                    }
                    else {
                        fireStrikeOpts.graphLabels.unshift(graphData[i].profile.gpu[0].model);
                        fireStrikeOpts.graphData.unshift(score);
                        fireStrikeOpts.graphColors.unshift('rgba(54, 162, 235, 0.2)');
                        fireStrikeOpts.graphBorderColors.unshift('rgba(54, 162, 235, 1)');
                    }
                }
            }
        }
        let min = Math.floor(Math.min.apply(Math, fireStrikeOpts.graphData) / 100) * 100;
        let max = Math.ceil(Math.max.apply(Math, fireStrikeOpts.graphData) / 100) * 100;
        min = min - 1500;
        if(min < 0){ min = 0 }
        fireStrikeOpts.scaleMin = min;
        fireStrikeOpts.scaleMax = max+500;
        return fireStrikeOpts
    };

    generate3dMarkFSUlOpts(graphData) {
        let fireStrikeOpts = JSON.parse(JSON.stringify(this.graphOpts));

        fireStrikeOpts.graphTitle = '3DMark FS Ultra';
        fireStrikeOpts.graphStep = 500;

        for (let i = 0; i < graphData.length; i++) {
            if(graphData[i].tdmark_result.length === 0){
                return false
            }
            for (let b=0; b < graphData[i].tdmark_result.length; b++){
                if(graphData[i].tdmark_result[b].version === 'FireStrikeUltra'){
                    let score = graphData[i].tdmark_result[b].final_score;
                    let append = true;
                    if (score >= fireStrikeOpts.graphData[0]) {
                        append = false;
                    }

                    if(append) {
                        fireStrikeOpts.graphLabels.push(graphData[i].profile.gpu[0].model);
                        fireStrikeOpts.graphData.push(score);
                        fireStrikeOpts.graphColors.push('rgba(54, 162, 235, 0.2)');
                        fireStrikeOpts.graphBorderColors.push('rgba(54, 162, 235, 1)');
                    }
                    else {
                        fireStrikeOpts.graphLabels.unshift(graphData[i].profile.gpu[0].model);
                        fireStrikeOpts.graphData.unshift(score);
                        fireStrikeOpts.graphColors.unshift('rgba(54, 162, 235, 0.2)');
                        fireStrikeOpts.graphBorderColors.unshift('rgba(54, 162, 235, 1)');
                    }
                }
            }
        }
        let min = Math.floor(Math.min.apply(Math, fireStrikeOpts.graphData) / 100) * 100;
        let max = Math.ceil(Math.max.apply(Math, fireStrikeOpts.graphData) / 100) * 100;
        min = min - 1500;
        if(min < 0){ min = 0 }
        fireStrikeOpts.scaleMin = min;
        fireStrikeOpts.scaleMax = max+1000;
        return fireStrikeOpts
    };

    generateGraph (graphOpts) {

        let data = {
            type: 'horizontalBar',
            data: {
                labels: graphOpts.graphLabels,
                datasets: []
            },
            weight: 1000,

            options: {
                // plugins: {
				// 		zoom: {
				// 			pan: {
				// 				enabled: true,
				// 				mode: 'xy'
				// 			},
				// 			zoom: {
				// 				enabled: true,
				// 				mode: 'xy'
				// 			}
				// 		}
				// 	},
                defaultFontColor: '#fff',
                title: {
                    display: true,
                    text: graphOpts.graphTitle
                },
                events: [],  // Disables hover
                legend: {
                    display: false
                },
                hover: {
                    mode: 'dataset',
                    animationDuration: 0
                },
                tooltips: {
                    enabled: false
                },
                scales: {
                    xAxes: [{
                        //type: 'logarithmic',
                        //position: 'bottom',
                        barPercentage: 1.0,
                        gridLines: {
                            color: '#202124',
                            offsetGridLines: false
                        },
                        ticks: {
                            stepSize: graphOpts.graphStep,
                            min: graphOpts.scaleMin,
                            max: graphOpts.scaleMax
                        }
                    }]
                },
                animation: {
                    onComplete: function () {
                        let chartInstance = this.chart;
                        let ctx = chartInstance.ctx;
                        ctx.textAlign = "center";
                        ctx.fillStyle = '#babcbd'; // value font color
                        Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
                            let meta = chartInstance.controller.getDatasetMeta(i);
                            Chart.helpers.each(meta.data.forEach(function (bar, index) {
                                ctx.fillText(dataset.data[index], bar._model.x - 20, bar._model.y );
                            }),this)
                        }),this);
                    }
                }

            }
        };
        if(graphOpts.graphData) {
            for (let i = 0; i < graphOpts.graphData.length; i++) {
                let dataset = {
                    data: graphOpts.graphData[i],
                    backgroundColor: graphOpts.graphColors[i],
                    borderColor: graphOpts.graphBorderColors[i],
                    hoverBackgroundColor: graphOpts.graphBorderColors[i],
                    hoverBorderColor: graphOpts.graphColors[i],
                    borderWidth: 1
                };
                data.data.datasets.push(dataset)
            }
        }
        return {...data}
    }

}
