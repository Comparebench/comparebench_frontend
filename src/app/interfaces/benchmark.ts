export interface IBenchmark {
    rid: any
    cinebench_score: any
    heaven_score: any
    tdmark: any
    gpu: IGPU[]
    title: any
    uid: any
    mem_total: any
    cpu_id: any
    model:any
}

export interface IGPU {
    make: any
    model: any
}
