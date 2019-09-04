export class IBenchmark {
    rid: any
    cinebench_score: any
    heaven_score: any
    tdmark: any
    gpu: IGPU[]=[]
    title: any
    uid: any
    isPrivate: boolean;
    mem_total: any
    cpu_id: any
    model:any;
    freq: any;

    constructor(benchmarkData) {
        this.rid = benchmarkData.rid;
        this.cinebench_score = benchmarkData.cinebench_score;
        this.heaven_score = benchmarkData.heaven_score;
        this.model = benchmarkData.model;
        this.freq = benchmarkData.freq;
        this.title = benchmarkData.title;
        this.mem_total = benchmarkData.mem_total;
        this.isPrivate = benchmarkData.private;
        try {
            for (let g = 0; g < benchmarkData.gpu.length; g++) {
                this.gpu.push(benchmarkData.gpu[g])
            }
        }catch (e) {

        }
        this.freq = benchmarkData.freq;
    }

}

export interface IGPU {
    make: any
    model: any
}
