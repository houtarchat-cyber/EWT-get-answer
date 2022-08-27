// ==UserScript==
// @name           升学 E 网通 (EWT360) 试题答案获取 - Beta
// @name:en        EWT Exam Answers Getter - Beta
// @namespace      https://ewt.houtar.eu.org/examanswer2
// @version        0.1.1
// @description    此脚本在 EWT 试题中获取试题答案。
// @description:en This script gets exam answers in EWT exam.
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
  const getAnswersByPaperData = async (d: Datas.PaperData) => {
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
          (element): string => element.rightAnswer.join()
        );
      }
      return resJson.data.rightAnswer.join();
    };
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
