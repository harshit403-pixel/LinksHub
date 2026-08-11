import axios from "axios";

export const parseGithubUrl = (url) => {
  const clean = url
    .replace(".git", "")
    .replace(/\/$/, "");

  const parts = clean.split("/");

  if (parts.length < 5) {
    throw new Error("Invalid GitHub URL");
  }

  return {
    owner: parts[3],
    repo: parts[4],
  };
};

export const fetchRepository = async (
  githubUrl
) => {
  const { owner, repo } =
    parseGithubUrl(githubUrl);

  const headers = process.env.GITHUB_TOKEN
    ? {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept:
          "application/vnd.github+json",
      }
    : {};

  const repoResponse = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}`,
    { headers }
  );

  let readme = "";

  try {
    const readmeResponse =
      await axios.get(
        `https://raw.githubusercontent.com/${owner}/${repo}/${repoResponse.data.default_branch}/README.md`
      );

    readme = readmeResponse.data;
  } catch {}

  return {
    title: repoResponse.data.name,
    description:
      repoResponse.data.description || "",
    homepage:
      repoResponse.data.homepage || "",
    stars: repoResponse.data.stargazers_count,
    topics: repoResponse.data.topics || [],
    language: repoResponse.data.language,
    readme,
    owner,
    repo,
  };
};

export const exchangeGithubCodeForToken =
  async (code) => {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id:
          process.env.GITHUB_CLIENT_ID,
        client_secret:
          process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    return tokenResponse.data.access_token;
  };

export const fetchGithubUser = (
  accessToken
) =>
  axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const fetchGithubRepositories =
  (accessToken) =>
    axios.get(
      "https://api.github.com/user/repos",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept:
            "application/vnd.github+json",
        },
        params: {
          per_page: 100,
          sort: "updated",
          affiliation: "owner",
        },
      }
    );
