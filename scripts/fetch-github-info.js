async function fetchGH(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) {
    console.error(`Error fetching ${url}: ${res.status} ${res.statusText}`);
    return null;
  }
  return await res.json();
}

async function run() {
  const repos = await fetchGH('https://api.github.com/users/HYPNOTYZEDCHART/repos?per_page=100&sort=updated');
  console.log('=== HYPNOTYZEDCHART REPOS ===');
  if (Array.isArray(repos)) {
    for (const r of repos) {
      console.log(`- ${r.name} | ${r.language} | stars: ${r.stargazers_count} | updated: ${r.updated_at}`);
      console.log(`  description: ${r.description}`);
      console.log(`  url: ${r.html_url}`);
    }
  }

  const openboutik = await fetchGH('https://api.github.com/repos/OpenBoutik-Team/openboutik-api');
  console.log('\n=== OPENBOUTIK-API REPO ===');
  if (openboutik) {
    console.log(`Name: ${openboutik.name}`);
    console.log(`Desc: ${openboutik.description}`);
    console.log(`Lang: ${openboutik.language}`);
    console.log(`Stars: ${openboutik.stargazers_count} | Forks: ${openboutik.forks_count}`);
  }

  const contributors = await fetchGH('https://api.github.com/repos/OpenBoutik-Team/openboutik-api/contributors');
  console.log('\n=== CONTRIBUTORS IN OPENBOUTIK ===');
  if (Array.isArray(contributors)) {
    for (const c of contributors) {
      console.log(`- ${c.login}: ${c.contributions} contributions (${c.html_url})`);
    }
  }

  const commits = await fetchGH('https://api.github.com/repos/OpenBoutik-Team/openboutik-api/commits?per_page=30');
  console.log('\n=== RECENT COMMITS IN OPENBOUTIK ===');
  if (Array.isArray(commits)) {
    for (const c of commits.slice(0, 15)) {
      const authorLogin = c.author ? c.author.login : (c.commit.author ? c.commit.author.name : 'unknown');
      console.log(`- [${c.commit.author.date}] [${authorLogin}] ${c.commit.message.split('\n')[0]}`);
    }
  }
}

run();
