import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: import.meta.env.GH_TOKEN ?? "",
});

export default octokit;
