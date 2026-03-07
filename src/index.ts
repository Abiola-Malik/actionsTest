import { setFailed, getInput } from "@actions/core";
import { context, getOctokit } from "@actions/github";

async function run() {
  const token = getInput("gh-token");
  const label = getInput("label");
  const octokit = getOctokit(token);
  const { pull_request } = context.payload;
  if (!pull_request) {
    setFailed("This action can only be run on pull_request events.");
    return;
  }
  const { owner, repo } = context.repo;
  const prNumber = pull_request.number;
  try {
    await octokit.rest.issues.addLabels({
      owner,
      repo,
      issue_number: prNumber,
      labels: [label],
    });
  } catch (error) {
    if (error instanceof Error) {
      setFailed(`Failed to add label: ${error.message}`);
    } else {
      setFailed(`Failed to add label: ${error}`);
    }
  }
}

run();
