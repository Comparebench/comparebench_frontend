import { Component, OnInit } from '@angular/core';
import {BenchmarkService} from "../benchmark.service";
import {Router} from "@angular/router";
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-benchmark',
  templateUrl: './benchmark.component.html',
  styleUrls: ['./benchmark.component.css']
})
export class BenchmarkCreationComponent implements OnInit {
    title;
    adding = true;
    isPrivate = false;
    addedBenchmarks = [];
    supportedBenchmarks;
    currentBenchmarkType;
    currentUploadFile: File = null;
    currentManualScore: string = '';
    cpuzFile: File = null;
    tdmarkFiles = [];
    cinebenchScore= '';


    constructor(private benchmarkService:BenchmarkService, private router: Router, private meta: Meta) {
        this.meta.addTag({ name: 'description', content: 'CompareBench Description!' });
    }
    addBenchmark(){
        console.log('addbenchmark')

        if(this.currentBenchmarkType === '1'){
            this.addedBenchmarks.push({'type': '3DMark', name:this.currentUploadFile.name});
            this.tdmarkFiles.push(this.currentUploadFile);
            this.currentUploadFile = undefined
        }
        else if(this.currentBenchmarkType === '3'){
            this.cinebenchScore = this.currentManualScore
        }
        this.adding = true;
        this.currentBenchmarkType = undefined
    }

    handleFileInput(files: FileList) {
        this.currentUploadFile = files.item(0);
        this.adding = false
    }
    cpuzUpload(files: FileList) {
        this.cpuzFile = files.item(0);

    }
    completeBenchmark(){
        const formData: FormData = new FormData();
        for(let i=0;i<this.tdmarkFiles.length;i++){
            formData.append('3dmark_upload', this.tdmarkFiles[i])
        }
        formData.append('title', this.title);
        formData.append('cinebench_score', this.cinebenchScore);
        formData.append('private', this.isPrivate.toString());
        formData.append('cpuz_html', this.cpuzFile);
        this.benchmarkService.addBenchmark(formData).subscribe((response) => {
            this.router.navigate(['/benchmark-creation', response['benchmark_id']])
        })
    }
    benchmarkTypeChanged(){
        if(this.currentBenchmarkType === '3'){
            this.adding=false
        }
    }
    ngOnInit() {
        this.benchmarkService.getBenchmarkTypes().subscribe((response) => {
            this.supportedBenchmarks = response["benchmark_types"]
        })
    }

}
