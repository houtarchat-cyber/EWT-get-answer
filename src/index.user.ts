// ==UserScript==
// @name           升学 E 网通 (EWT360) 试卷选择题自动完成 + 试题答案获取 - Beta
// @name:en        EWT Exam Auto Resolver & Answers Getter - Beta
// @namespace      https://ewt.houtar.eu.org/examanswer2
// @version        0.2.0
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
  const getAnswerByQuestionId = async (
    questionId: string,
    isChildQuestion?: Boolean
  ): Promise<string | string[]> => {
    const res = await fetch(
      `https://web.ewt360.com/customerApi/api/studyprod/web/answer/quesiton/analysis?questionId=${questionId}&` +
        document.location.hash.slice(14)
    );
    const resJson: Datas.AnalysisData = await res.json();
    if (isChildQuestion === true) {
      return (resJson.data.childQuestions as Datas.Question[]).map(
        (element): string => {
          autoComplete(element.id, element.rightAnswer);
          return element.rightAnswer.join();
        }
      );
    }
    autoComplete(resJson.data.id, resJson.data.rightAnswer);
    return resJson.data.rightAnswer.join();
  };
  const autoComplete = (questionId: string, answers: string[]) => {
    const questionDiv = document.querySelector(
      `#ewt-question-${questionId} > div > div > ul`
    );
    questionDiv
      ?.querySelectorAll('.selected')
      .forEach(el => (el as HTMLLIElement).click());
    answers.forEach(answer => {
      (
        questionDiv?.children[
          ['A', 'B', 'C', 'D'].indexOf(answer)
        ] as HTMLLIElement
      )?.click();
    });
  };
  const getAnswersByPaperData = async (d: Datas.PaperData) => {
    let answers = '';
    for (let key = 0; key < d.data.questions.length; key++) {
      const element = d.data.questions[key];
      const questionNum = key + 1;
      const childQuestions = element.childQuestions;
      if (childQuestions.length === 0) {
        let answer = await getAnswerByQuestionId(element.id);
        answer = answer === '' ? element.analyse : answer;
        answers += `<h4>${questionNum}: ${answer}</h4>`;
      } else {
        const childQuestionAnswers = await getAnswerByQuestionId(
          element.id,
          true
        );
        for (
          let childQuestionKey = 0;
          childQuestionKey < childQuestions.length;
          childQuestionKey++
        ) {
          const childQuestion = childQuestions[childQuestionKey];
          const childQuestionNum = childQuestionKey + 1;
          const childQuestionAnswer =
            childQuestionAnswers[childQuestionKey] === ''
              ? childQuestion.analyse
              : childQuestionAnswers[childQuestionKey];
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
    .then(async (p): Promise<Datas.PaperData> => await p.json())
    .then((d: Datas.PaperData) => {
      getAnswersByPaperData(d)
        .then((answers): void => {
          const answerShower = window.open('', '_blank', 'popup');
          if (answerShower !== null) {
            answerShower.document.body.innerHTML = answers;
          } else {
            window.alert(
              '答案窗口未弹出。\n这可能是由于您的浏览器阻止了弹出窗口。'
            );
          }
        })
        .catch((e): void => {
          console.error(e);
        });
    })
    .catch((e): void => {
      console.error(e);
    });
})();
