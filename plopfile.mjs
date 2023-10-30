import { exec } from "child_process";
import { nanoid } from "nanoid";

function fn(plop) {
  plop.setHelper("today", () => {
    return new Date().toISOString().split("T")[0];
  });

  plop.setActionType("open", function (answers) {
    const filePath = `src/content/posts/${answers.slug}.mdx`;
    exec(`code ${filePath}`);
    exec(`open http://localhost:3700/posts/${answers.slug}`);
  });

  plop.setGenerator("post", {
    description: "Blog post",
    prompts: [
      {
        type: "input",
        name: "slug",
        message: "filename that will be used as the slug for the post",
        default: () => nanoid(8),
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/content/posts/{{slug}}.mdx",
        templateFile: "templates/post.mdx.hbs",
      },
      {
        type: "open",
      },
    ],
  });
}

export default fn;
