"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { socials } from "../data";
import { Star, GitFork, Users, FolderGit2, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const USERNAME = "adp-iitm";

type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  updated_at: string;
};

type Profile = {
  public_repos: number;
  followers: number;
  following: number;
};

// GitHub's own language colors, trimmed to what's likely to show up.
const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  C: "#555555",
  "C++": "#f34b7d",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  EJS: "#a91e50",
  Jupyter: "#DA5B0B",
};

function langColor(lang: string) {
  return LANG_COLORS[lang] ?? "#22d3ee";
}

// GitHub descriptions are often left blank, so these fill in the real ones —
// and also let you pin your main projects to the front regardless of stars.
// Key = repo name, lowercase. Add/edit freely, or send me the real
// descriptions for the ones marked TODO and I'll fill them in.
const REPO_OVERRIDES: Record<string, { description?: string; priority?: number }> = {
  "data-analysis-agent": {
    description:
      "NLP-to-Python code generation pipeline that automates exploratory data analysis — dataset queries, web scraping, and visualization in a sandboxed runtime.",
    priority: 1,
  },
  breatheesg: {
    description:
      "An emissions data platform built from scratch — ingestion, normalization, review, and audit workflows on Django REST Framework and React.",
    priority: 2,
  },
  "my-portfolio": {
    description: "This portfolio site — built with React, Tailwind, and Framer Motion.",
    priority: 3,
  },
  "rewear-elite": {
    description: "A community-driven platform for exchanging pre-loved clothing.",
    priority: 4,
  },
  cybersafe: {
    description: "A cybersecurity tool for detecting and preventing online threats.",
    priority: 5,
  },
  cricket_predictor: {
    description: "A machine learning model for predicting cricket match outcomes.",
    priority: 6,
  },
};

function getOverride(repoName: string) {
  return REPO_OVERRIDES[repoName.toLowerCase()];
}

export function GithubStats() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`).then((r) => {
        if (!r.ok) throw new Error("failed");
        return r.json();
      }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`).then((r) => {
        if (!r.ok) throw new Error("failed");
        return r.json();
      }),
    ])
      .then(([profileData, repoData]) => {
        setProfile(profileData);
        setRepos(Array.isArray(repoData) ? repoData.filter((r: Repo) => !r.fork) : []);
      })
      .catch(() => setError(true));
  }, []);

  const totalStars = useMemo(
    () => repos?.reduce((sum, r) => sum + r.stargazers_count, 0) ?? 0,
    [repos]
  );

  const languageMix = useMemo(() => {
    if (!repos) return [];
    const counts: Record<string, number> = {};
    repos.forEach((r) => {
      if (!r.language) return;
      counts[r.language] = (counts[r.language] ?? 0) + 1;
    });
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    return Object.entries(counts)
      .map(([name, count]) => ({ name, pct: (count / total) * 100 }))
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 5);
  }, [repos]);

  const topRepos = useMemo(
    () =>
      [...(repos ?? [])]
        .sort((a, b) => {
          const pa = getOverride(a.name)?.priority ?? 99;
          const pb = getOverride(b.name)?.priority ?? 99;
          if (pa !== pb) return pa - pb;
          return b.stargazers_count - a.stargazers_count || +new Date(b.updated_at) - +new Date(a.updated_at);
        })
        .slice(0, 6),
    [repos]
  );

  const stats = [
    { label: "Repositories", value: profile?.public_repos, icon: FolderGit2 },
    { label: "Stars earned", value: totalStars, icon: Star },
    { label: "Followers", value: profile?.followers, icon: Users },
    { label: "Forks", value: repos?.reduce((s, r) => s + r.forks_count, 0), icon: GitFork },
  ];

  return (
    <section id="github" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">GitHub</p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Code, <span className="text-gradient">in the open.</span>
          </h2>
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 hover:text-cyan-200"
          >
            <FaGithub size={15} />
            @{USERNAME}
            <ArrowUpRight size={14} />
          </a>
        </div>
      </Reveal>

      {error && (
        <p className="mt-10 text-sm text-white/40">
          Live GitHub data is unavailable right now — check the{" "}
          <a href={socials.github} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline">
            profile directly
          </a>
          .
        </p>
      )}

      {!error && (
        <>
          {/* stat cards */}
          <Reveal delay={0.05} className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="glass glow-border rounded-2xl p-5"
                >
                  <Icon size={18} className="text-cyan-300" />
                  <p className="mt-4 font-heading text-2xl font-bold text-white sm:text-3xl">
                    {stat.value === undefined || stat.value === null ? (
                      <span className="inline-block h-7 w-12 animate-pulse rounded bg-white/10 align-middle" />
                    ) : (
                      stat.value.toLocaleString()
                    )}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-white/40">{stat.label}</p>
                </motion.div>
              );
            })}
          </Reveal>

          {/* language mix */}
          {languageMix.length > 0 && (
            <Reveal delay={0.1} className="mt-6">
              <div className="glass glow-border rounded-2xl p-6">
                <p className="text-xs uppercase tracking-widest text-white/40">Language mix</p>
                <div className="mt-4 flex h-2.5 w-full overflow-hidden rounded-full bg-white/5">
                  {languageMix.map((lang) => (
                    <div
                      key={lang.name}
                      style={{ width: `${lang.pct}%`, backgroundColor: langColor(lang.name) }}
                      title={`${lang.name} — ${lang.pct.toFixed(0)}%`}
                    />
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {languageMix.map((lang) => (
                    <span key={lang.name} className="inline-flex items-center gap-2 text-xs text-white/60">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: langColor(lang.name) }}
                      />
                      {lang.name}
                      <span className="text-white/30">{lang.pct.toFixed(0)}%</span>
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* repo grid */}
          <div className="mt-14">
            <h3 className="mb-6 font-heading text-lg font-semibold text-white/80">Top repositories</h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {repos === null &&
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="glass h-36 animate-pulse rounded-2xl" />
                ))}

              {topRepos.map((repo, i) => (
                <motion.a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="glass glow-border group relative overflow-hidden rounded-2xl p-5"
                >
                  <div
                    className="absolute inset-x-0 top-0 h-0.5 opacity-70"
                    style={{
                      background: `linear-gradient(90deg, ${langColor(repo.language ?? "")}, transparent)`,
                    }}
                  />

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-white/85">
                      <FaGithub size={14} className="shrink-0 text-white/40" />
                      <span className="font-heading text-sm font-semibold group-hover:text-cyan-300">
                        {repo.name}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="shrink-0 text-white/20 transition group-hover:text-cyan-300"
                    />
                  </div>

                  <p className="mt-2.5 line-clamp-2 min-h-[2.2em] text-xs leading-relaxed text-[#9CA3AF]">
                    {repo.description ?? getOverride(repo.name)?.description ?? "A project by Aditya Pareek."}
                  </p>

                  <div className="mt-4 flex items-center gap-4 text-[11px] text-white/40">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: langColor(repo.language) }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Star size={11} /> {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork size={11} /> {repo.forks_count}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
