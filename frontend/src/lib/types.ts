export interface Mcq {
	question: string;
	numberOfOptions: number;
	options: Array<string>;
	numberOFAllowedOptions: {
		one: number;
		more: number;
	}; // number of options to be selected
}

export interface Form {
	shortQuestion: Array<string>;
	longQuestion: Array<string>;
	mcqs: Mcq[];
	uploads: Array<string>;
}

export interface Draft {
	email: string;
	longQuestion: {
		question: string;
		answer: string;
	}[];
	shortQuestion: {
		question: string;
		answer: string;
	}[];
	mcqs: {
		question: string;
		answer: string[];
	}[];
}

export type UserData = {
	id: number;
	name: string;
	surname: string;
	patronymic: string;
	permission: string;
	email: string;
	phone: string;
	city: string;
	region: string;
	institution_type: string;
	institution_name: string;
	institution_faculty: string;
	institution_course: string;
	vkontakte_id: string;
	google_id: string;
	telegram_id: string;
};
export type Competition = {
	id: number;
	name: string;
	registration_start: string;
	registration_end: string;
	started_at: string;
	persons_amount: number;
	request_template: string;
	link: string;
    admins: Array<number>;
};
export type Field = {
	id: string;
	name: string;
	type: number;
	is_required: boolean;
	is_visible: boolean;
};
export type CompetitionWithFields = {
    id: number;
	name: string;
	registration_start: string;
	registration_end: string;
	started_at: string;
	persons_amount: number;
	request_template: string;
	link: string;
    fields : Array<Field>
    admins: Array<number>;

};
export type Competitions = Array<Competition>;

export type UserRequest = {
	id: number;
	owner: number;
	competition: number;
	team_name: string;
	status: string;
	description: string;
	created_at: string;
	participants: Array<number>;
};

export type RequestsOut = {
	team_name: string,
	team: {
		user_id: number,
		form: {
			field_id: string,
			value: string
		  }[];
	  }[],
	competition: number
}
export type Requests = Array<UserRequest>;
