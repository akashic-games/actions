import * as fs from "fs";
import * as path from "path";
import * as core from "@actions/core";
import * as github from "@actions/github";
import { generateReleaseNote } from "./generateReleaseNote";

const npmPublish = require("@jsdevtools/npm-publish");
const inputs = {
	githubToken: core.getInput("github_token"),
	npmToken: core.getInput("npm_token")
};
const targetDirPath = process.env.GITHUB_WORKSPACE;
const packageJsonPath = path.join(targetDirPath, "package.json");
const changelogPath = path.join(targetDirPath, "CHANGELOG.md");
// GITHUB_REPOSITORYのフォーマットは オーナー名/リポジトリ名 となっているのでそれぞれ抽出する
const repositoryInfo = process.env.GITHUB_REPOSITORY.split("/");
const ownerName = repositoryInfo[0];
const repositoryName = repositoryInfo[1];
const gitCommitHash = process.env.GITHUB_SHA;

(async () => {
	try {
		await npmPublish({
			package: packageJsonPath,
			token: inputs.npmToken
		});
		const packageJson = require(packageJsonPath);
		const version = packageJson.version;
		let body = "";
		if (fs.existsSync(changelogPath)) {
			const changelog = fs.readFileSync(changelogPath).toString();
			body = generateReleaseNote(changelog, version);
		}
		const octokit = github.getOctokit(inputs.githubToken);
		await octokit.repos.createRelease({
			owner: ownerName,
			repo: repositoryName,
			tag_name: "v" + version,
			name: "Release v" + version,
			body: body,
			target_commitish: gitCommitHash
		});
	} catch (error) {
		core.setFailed(error.message);
	}
})();
