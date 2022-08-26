export interface PaperData {
  success: boolean;
  code: string;
  msg: string;
  data: Data;
}

export interface Data {
  subjectId: number;
  subjectName: string;
  suggestTime: number;
  questionCount: number;
  title: string;
  platform: number;
  bizCode: number;
  paperTypeId: number;
  questions: Question[];
}

export interface Question {
  id: string;
  scoreCriterion: string;
  cate: number;
  cateName: CateName;
  questionContent: string;
  options: Option[];
  myAnswer: unknown[];
  rightStatus: number;
  rightAnswer: string[];
  degreeRange: number;
  degreeRangeDesc: DegreeRangeDesc;
  questionType: number;
  questionSource: number;
  audioUrl: null | string;
  questionSort: number;
  analyse: string;
  method: null;
  childQuestions: Question[];
  knowledges: Knowledge[];
  revision: boolean;
  score: number;
  myScore: number;
  scoreList: unknown[];
  lessons: unknown[];
  collected: boolean;
  subjectId: number;
  questionNo: number;
  subjective: boolean;
}

export enum CateName {
  单选 = '单选',
  填空 = '填空',
  解答 = '解答',
}

export enum DegreeRangeDesc {
  Empty = '',
  易 = '易',
}

export interface Knowledge {
  id: string;
  title: string;
}

export interface Option {
  index: number;
  choice: Choice;
  option: string;
}

export enum Choice {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}
