import { Question } from "../models/Question.js";

export abstract class CustomScript {
  /**
   * Call this method to ask questions to the user
   * @param questions
   */
  public static askQuestions(questions: Question[]): void {
    console.log(
      JSON.stringify({
        questions: questions,
      })
    );
  }

  /**
   * Call this method to indicate that the script has finished.
   * @param log
   */
  public static done(log: string): void {
    console.log(log);
  }
}
