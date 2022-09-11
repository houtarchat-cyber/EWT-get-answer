"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ==UserScript==
// @namespace      https://ewt.houtar.eu.org/examanswer2
// @match          https://web.ewt360.com/mystudy/
// @grant          none
// @name           升学 E 网通 (EWT360) 试卷选择题自动完成 + 试题答案获取
// @name:en        EWT Exam Auto Resolver & Answers Getter
// @description    此脚本在 EWT 试题中获取试题答案并自动完成选择题。
// @description:en This script gets exam answers and automatically resolve single and multiple choice in EWT exam.
// @copyright      2022, Houtar (https://github.com/houtarchat-cyber)
// @license        GPL-3.0-or-later; https://www.gnu.org/licenses/gpl-3.0.txt
// @icon           https://web.ewt360.com/favicon.ico
// @homepageURL    https://github.com/houtarchat-cyber/EWT-get-answer
// @supportURL     https://github.com/houtarchat-cyber/EWT-get-answer/issues
// @version        1.0.0
// @author         Houtar
// ==/UserScript==
(() => {
    'use strict';
    if (!document.location.hash.includes('exam/answer')) {
        return;
    }
    const getAnswerByQuestionId = (questionId, isChildQuestion) => __awaiter(void 0, void 0, void 0, function* () {
        const resJson = yield (yield fetch(`https://web.ewt360.com/customerApi/api/studyprod/web/answer/quesiton/analysis?questionId=${questionId}&` +
            document.location.hash.slice(14))).json();
        const { rightAnswer, childQuestions, id } = resJson.data;
        if (isChildQuestion === true) {
            return childQuestions.map((element) => {
                autoComplete(element.id, element.rightAnswer);
                return element.rightAnswer.join();
            });
        }
        autoComplete(id, rightAnswer);
        return rightAnswer.join();
    });
    const autoComplete = (questionId, answers) => {
        const questionDiv = document.querySelector(`#ewt-question-${questionId} > div > div > ul`);
        questionDiv === null || questionDiv === void 0 ? void 0 : questionDiv.querySelectorAll('.selected').forEach(el => {
            el.click();
        });
        answers.forEach(answer => {
            var _a;
            (_a = questionDiv === null || questionDiv === void 0 ? void 0 : questionDiv.children[['A', 'B', 'C', 'D'].indexOf(answer)]) === null || _a === void 0 ? void 0 : _a.click();
        });
    };
    const getAnswersByPaperData = (d) => __awaiter(void 0, void 0, void 0, function* () {
        let answers = '';
        for (let key = 0; key < d.data.questions.length; key++) {
            const element = d.data.questions[key];
            const questionNum = key + 1;
            const childQuestions = element.childQuestions;
            if (childQuestions.length === 0) {
                let answer = (yield getAnswerByQuestionId(element.id));
                if (answer === '') {
                    answer = element.analyse;
                }
                answers += `<h4>${questionNum}: ${answer}</h4>`;
            }
            else {
                const childQuestionAnswers = (yield getAnswerByQuestionId(element.id, true));
                for (let childQuestionKey = 0; childQuestionKey < childQuestions.length; childQuestionKey++) {
                    const childQuestion = childQuestions[childQuestionKey];
                    const childQuestionNum = childQuestionKey + 1;
                    let childQuestionAnswer;
                    if (childQuestionAnswers[childQuestionKey] === '') {
                        childQuestionAnswer = childQuestion.analyse;
                    }
                    else {
                        childQuestionAnswer = childQuestionAnswers[childQuestionKey];
                    }
                    answers +=
                        `<h4>${questionNum}. (${childQuestionNum})` +
                            ` : ${childQuestionAnswer}</h4>`;
                }
            }
        }
        return answers;
    });
    fetch('https://web.ewt360.com/customerApi/api/studyprod/web/answer/paper' +
        document.location.hash.slice(13))
        .then((p) => __awaiter(void 0, void 0, void 0, function* () {
        return yield p.json();
    }))
        .then((d) => {
        getAnswersByPaperData(d)
            .then((answers) => {
            const answerShower = window.open('', '_blank', 'popup');
            if (answerShower !== null) {
                answerShower.document.body.innerHTML = answers;
            }
            else {
                window.alert('答案窗口未弹出。\n这可能是由于您的浏览器阻止了弹出窗口。');
            }
        })
            .catch((e) => {
            console.error(e);
        });
    })
        .catch((e) => {
        console.error(e);
    });
})();
