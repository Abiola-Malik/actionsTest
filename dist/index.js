"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
async function run() {
    const token = (0, core_1.getInput)("gh-token");
    const label = (0, core_1.getInput)("label");
    const octokit = (0, github_1.getOctokit)(token);
    const { pull_request } = github_1.context.payload;
    if (!pull_request) {
        (0, core_1.setFailed)("This action can only be run on pull_request events.");
        return;
    }
    const { owner, repo } = github_1.context.repo;
    const prNumber = pull_request.number;
    try {
        await octokit.rest.issues.addLabels({
            owner,
            repo,
            issue_number: prNumber,
            labels: [label],
        });
    }
    catch (error) {
        if (error instanceof Error) {
            (0, core_1.setFailed)(`Failed to add label: ${error.message}`);
        }
        else {
            (0, core_1.setFailed)(`Failed to add label: ${error}`);
        }
    }
}
run();
