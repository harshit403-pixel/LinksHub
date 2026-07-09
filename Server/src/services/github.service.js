import axios from "axios";

export const parseGithubUrl = (url) => {
    const clean = url
        .replace(".git", "")
        .replace(/\/$/, "");

    const parts = clean.split("/");

    if(parts.length < 5){
        throw new Error("Invalid GitHub URL");
    }

    return {
        owner: parts[3],
        repo: parts[4]
    };
};

export const fetchRepository = async (githubUrl) => {
  const { owner, repo } = parseGithubUrl(githubUrl);

  const repoResponse = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}`
  );

  let readme = "";

  try {
    const readmeResponse = await axios.get(
      `https://raw.githubusercontent.com/${owner}/${repo}/${repoResponse.data.default_branch}/README.md`
    );

    readme = readmeResponse.data;
  } catch {}

  return {
    title: repoResponse.data.name,
    description: repoResponse.data.description || "",
    homepage: repoResponse.data.homepage || "",
    stars: repoResponse.data.stargazers_count,
    topics: repoResponse.data.topics || [],
    language: repoResponse.data.language,
    readme,
    owner,
    repo,
  };
};