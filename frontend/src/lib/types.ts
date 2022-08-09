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

export type ContestType = [
    {
        "id": number,
        "name": string,
        "registration_start": string,
        "registration_end": string,
        "started_at": string,
        "persons_amount": number,
        "request_template": string,
        "link": string
    }
] 

export type UserData = {
    "id": number,
    "name": string,
    "surname": string,
    "patronymic": string,
    "permission": number,
    "email": string,
    "phone": string,
    "city": string,
    "region": string,
    "institution_type": number,
    "institution_name": string,
    "institution_faculty": string,
    "institution_course": string,
    "vkontakte_id": string,
    "google_id": string,
    "telegram_id": string
}