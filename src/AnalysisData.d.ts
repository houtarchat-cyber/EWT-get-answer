export interface AnalysisData {
  success: boolean;
  code: string;
  msg: string;
  data: Data;
}

export interface Data {
  id: string;
  scoreCriterion: null;
  cate: number;
  cateName: string;
  questionContent: string;
  options: Option[];
  myAnswer: unknown[];
  rightStatus: number;
  rightAnswer: string[];
  degreeRange: number;
  degreeRangeDesc: string;
  questionType: number;
  questionSource: number;
  audioUrl: string;
  questionSort: number;
  analyse: null;
  method: string;
  childQuestions: unknown[];
  knowledges: unknown[];
  revision: boolean;
  score: number;
  myScore: number;
  scoreList: unknown[];
  lessons: unknown[];
  collected: boolean;
  subjectId: number;
  questionNo: null;
  knowledgeTitle: null;
  hasAccessMethod: boolean;
  subjective: boolean;
}

export interface Option {
  index: number;
  choice: string;
  option: string;
}
