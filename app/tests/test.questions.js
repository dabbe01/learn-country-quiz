import { equal, notDeepEqual } from "assert";
import { getRandomQuestions } from "../src/utils.js";

describe("Test random questions feature", () => {
    it("should not have the same questions", () => {
        notDeepEqual(getRandomQuestions(), getRandomQuestions());
    });
    it("should not have the same answer twice", () => {
        const questions = getRandomQuestions();
        Object.values(questions).forEach((question) => {
            const { correct } = question;
            const isUnique = Object.values(questions).some(q => q.correct !== correct);

            equal(isUnique, true);
        });
    });
    it("should not repeat the same answer options twice", () => {
        const questions = getRandomQuestions();
        Object.values(questions).forEach((question) => {
            const { alternatives } = question;
            const isUnique = Object.values(alternatives).every(q => {
                alternatives.filter(a => a === q).length === 1;
            });

            equal(isUnique, true);
        });
    });
});