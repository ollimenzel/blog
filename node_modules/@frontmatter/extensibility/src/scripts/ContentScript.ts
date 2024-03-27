import { ContentArguments } from "../models/ScriptArguments.js";
import { CustomScript } from "./CustomScript.js";

export class ContentScript extends CustomScript {
  /**
   * Retrieve the arguments passed to the script
   * @returns
   */
  public static getArguments(): ContentArguments | undefined {
    const args = process.argv;

    const command = args[0];
    const scriptPath = args[1];
    const workspacePath = args[2];
    const filePath = args[3];
    let frontMatter = args[4];

    // Parse the frontmatter
    if (frontMatter.startsWith(`"`) || frontMatter.startsWith(`'`)) {
      frontMatter = frontMatter.slice(1);
    }

    if (frontMatter.endsWith(`"`) || frontMatter.endsWith(`'`)) {
      frontMatter = frontMatter.slice(0, -1);
    }

    try {
      frontMatter =
        typeof frontMatter === "string" ? JSON.parse(frontMatter) : frontMatter;
    } catch (e) {
      // Failed parsing JSON
    }

    // Get all arguments after the file path
    const answerArgs = args.slice(5);
    const answers = answerArgs.reduce((acc, curr) => {
      const [key, value] = curr.split("=");
      acc[key] = value;
      return acc;
    }, {} as { [key: string]: string });

    return {
      command,
      scriptPath,
      workspacePath,
      filePath,
      frontMatter,
      answers: Object.keys(answers).length > 0 ? answers : undefined,
    };
  }

  /**
   * Call this method to update the front matter
   * @param data
   */
  public static updateFrontMatter(data: { [fieldName: string]: any }): void {
    console.log(
      JSON.stringify({
        frontmatter: data,
      })
    );
  }
}
