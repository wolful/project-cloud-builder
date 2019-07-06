function getRepoName(githubUrl) {
  const matchArr = githubUrl.match(/[^\/]*\.git$/g);
  if (!matchArr) return null;
  if (matchArr[0]) {
    return matchArr[0].replace(".git", '');
  }
}

module.exports = {
  getRepoName
}
