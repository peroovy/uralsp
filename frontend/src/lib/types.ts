export interface Mcq{
    question: string;
    numberOfOptions:number;
    options:Array<string>;
    numberOFAllowedOptions: {
        one: number,
        more: number
    }; // number of options to be selected 
}

export interface Form{
    shortQuestion: Array<string>,
    longQuestion: Array<string>,
    mcqs: Mcq[],
    uploads: Array<string>
}

export interface Draft{
    email: string,
    longQuestion: {
        question: string,
        answer: string
    }[],
    shortQuestion: {
        question: string,
        answer: string
    }[],
    mcqs: {
        question: string,
        answer: string[]
    }[],
}

export type ContestType = {
    contestID: string,
    writerName: string,
    contestTitle: string,
    description: string,
    start_time: string,
    end_time: string,
    form: Form,
} 