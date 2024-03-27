import { MediaArguments } from "../models/ScriptArguments.js";
import { CustomScript } from "./CustomScript.js";

export class MediaScript extends CustomScript {
  /**
   * Retrieve the arguments passed to the script
   * @returns
   */
  public static getArguments(): MediaArguments | undefined {
    const args = process.argv;

    if (!args || args.length <= 0) {
      return undefined;
    }

    const command = args[0];
    const scriptPath = args[1];
    const workspacePath = args[2];
    const mediaPath = args[3];

    // Get all arguments after the file path
    const answerArgs = args.slice(4);
    const answers = answerArgs.reduce((acc, curr) => {
      const [key, value] = curr.split("=");
      acc[key] = value;
      return acc;
    }, {} as { [key: string]: string });

    return {
      command,
      scriptPath,
      workspacePath,
      mediaPath,
      answers: Object.keys(answers).length > 0 ? answers : undefined,
    };
  }
}
