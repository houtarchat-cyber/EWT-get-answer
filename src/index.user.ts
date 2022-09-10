// ==UserScript==
// @name           升学 E 网通 (EWT360) 试卷选择题自动完成 + 试题答案获取
// @name:en        EWT Exam Auto Resolver & Answers Getter
// @namespace      https://ewt.houtar.eu.org/examanswer2
// @version        1.0.0
// @description    此脚本在 EWT 试题中获取试题答案并自动完成选择题。
// @description:en This script gets exam answers and automatically resolve single and multiple choice in EWT exam.
// @author         Houtar
// @match          https://web.ewt360.com/mystudy/
// @icon           https://web.ewt360.com/favicon.ico
// @grant          none
// @license        GNU General Public License
// ==/UserScript==
(() => {
  'use strict';
  if (!document.location.hash.includes('exam/answer')) {
    return;
  }
  const getAnswerByQuestionId: (
    questionId: string,
    isChildQuestion?: boolean
  ) => Promise<string | string[]> = async (questionId, isChildQuestion) => {
    const resJson: Datas.AnalysisData = await (
      await fetch(
        `https://web.ewt360.com/customerApi/api/studyprod/web/answer/quesiton/analysis?questionId=${questionId}&` +
          document.location.hash.slice(14)
      )
    ).json();
    const {rightAnswer, childQuestions, id} = resJson.data;
    if (isChildQuestion === true) {
      return (childQuestions as Datas.Question[]).map((element): string => {
        autoComplete(element.id, element.rightAnswer);
        return element.rightAnswer.join();
      });
    }
    autoComplete(id, rightAnswer);
    return rightAnswer.join();
  };
  const autoComplete: (questionId: string, answers: string[]) => void = (
    questionId,
    answers
  ) => {
    const questionDiv: HTMLUListElement | null = document.querySelector(
      `#ewt-question-${questionId} > div > div > ul`
    );
    questionDiv?.querySelectorAll('.selected').forEach(el => {
      (el as HTMLLIElement).click();
    });
    answers.forEach(answer => {
      (
        questionDiv?.children[
          ['A', 'B', 'C', 'D'].indexOf(answer)
        ] as HTMLLIElement
      )?.click();
    });
  };
  const getAnswersByPaperData: (d: Datas.PaperData) => Promise<string> = async (
    d: Datas.PaperData
  ) => {
    let answers = '';
    for (let key = 0; key < d.data.questions.length; key++) {
      const element: Datas.Question = d.data.questions[key];
      const questionNum: number = key + 1;
      const childQuestions: Datas.Question[] = element.childQuestions;
      if (childQuestions.length === 0) {
        let answer: string = (await getAnswerByQuestionId(
          element.id
        )) as string;
        if (answer === '') {
          answer = element.analyse;
        }
        answers += `<h4>${questionNum}: ${answer}</h4>`;
      } else {
        const childQuestionAnswers: string[] = (await getAnswerByQuestionId(
          element.id,
          true
        )) as string[];
        for (
          let childQuestionKey = 0;
          childQuestionKey < childQuestions.length;
          childQuestionKey++
        ) {
          const childQuestion: Datas.Question =
            childQuestions[childQuestionKey];
          const childQuestionNum: number = childQuestionKey + 1;
          let childQuestionAnswer: string;
          if (childQuestionAnswers[childQuestionKey] === '') {
            childQuestionAnswer = childQuestion.analyse;
          } else {
            childQuestionAnswer = childQuestionAnswers[childQuestionKey];
          }
          answers +=
            `<h4>${questionNum}. (${childQuestionNum})` +
            ` : ${childQuestionAnswer}</h4>`;
        }
      }
    }
    return answers;
  };
  fetch(
    'https://web.ewt360.com/customerApi/api/studyprod/web/answer/paper' +
      document.location.hash.slice(13)
  )
    .then(async (p: Response): Promise<Datas.PaperData> => {
      return await p.json();
    })
    .then((d: Datas.PaperData) => {
      getAnswersByPaperData(d)
        .then((answers: string): void => {
          const answerShower: Window | null = window.open(
            '',
            '_blank',
            'popup'
          );
          if (answerShower !== null) {
            answerShower.document.body.innerHTML = answers;
          } else {
            window.alert(
              '答案窗口未弹出。\n这可能是由于您的浏览器阻止了弹出窗口。'
            );
          }
        })
        .catch((e: Error): void => {
          console.error(e);
        });
    })
    .catch((e: Error): void => {
      console.error(e);
    });
})();
