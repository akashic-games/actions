import { generateReleaseNote } from "../generateReleaseNote";

describe("test generateReleaseNote", () => {
	const changelog = `
# CHANGELOG

## 2.0.1
* test1

## 2.0.0-beta.12
* test2

## 2.0.0-beta.1 - 11
* test3

## 1.5.1
`;

	const changelogWithOneVersion = `
# CHANGELOG

## 1.0.0
* first release
`;

	it("CHANGELOGに記載されているバージョンの内容を取得できる", () => {
		expect(generateReleaseNote(changelog, "2.0.1")).toEqual("* test1\n\n");
		expect(generateReleaseNote(changelog, "2.0.0-beta.12")).toEqual("* test2\n\n");
	});

	it("CHANGELOGに記載されていないバージョンを指定した場合空文字が返ってくる", () => {
		expect(generateReleaseNote(changelog, "1.5.0")).toEqual("");
	});

	it("CHANGELOGに記載されているバージョンが1つだけでも上記テストと同様の挙動となる", () => {
		expect(generateReleaseNote(changelogWithOneVersion, "1.0.0")).toEqual("* first release\n\n");
		expect(generateReleaseNote(changelogWithOneVersion, "1.0.1")).toEqual("");
	});
});
