const fs = require("fs");
const path = require("path");
const core = require("@actions/core");
const github = require("@actions/github");
const npmPublish = require("@jsdevtools/npm-publish");
const generateReleaseNote = require("./generateReleaseNote");
const inputs = {
	githubToken: core.getInput("github_token"),
	npmToken: core.getInput("npm_token"),
};
const targetDirPath = process.env.GITHUB_WORKSPACE;
const packageJsonPath = path.join(targetDirPath, "package.json");
const changelogPath = path.join(targetDirPath, "CHANGELOG.md");

(async () => {
	try {
		await npmPublish({
			package: packageJsonPath,
			token: inputs.npmToken,
			access: "public"
		});
		const packageJson = require(packageJsonPath);
		const version = packageJson["version"];
		let body = "";
		if (fs.existsSync(changelogPath)) {
			const changelog = fs.readFileSync(changelogPath).toString();
			body = generateReleaseNote(changelog, version);
		}
		const octokit = github.getOctokit(inputs.githubToken);
		// GITHUB_REPOSITORYのフォーマットは オーナー名/リポジトリ名 となっているのでそれぞれ抽出する
		const repositoryInfo = process.env.GITHUB_REPOSITORY.split("/");
		await octokit.repos.createRelease({
			owner: repositoryInfo[0],
			repo: repositoryInfo[1],
			tag_name: "v" + version,
			name: "Release " + version,
			body: body,
			target_commitish: process.env.GITHUB_SHA
		});
	} catch(error) {
		core.setFailed(error.message);
	}
})();