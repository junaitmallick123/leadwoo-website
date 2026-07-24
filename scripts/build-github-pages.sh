#!/usr/bin/env bash
set -euo pipefail

site_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
output_dir="${site_root}/dist"
upstream="https://tryleadwoo.com"
repo_base="/leadwoo-website"

rm -rf "${output_dir}"
mkdir -p "${output_dir}/assets" "${output_dir}/plans"

curl --fail --location --silent --show-error "${upstream}/" -o "${output_dir}/index.html"
curl --fail --location --silent --show-error "${upstream}/assets/index-xoRJ665e.js" -o "${output_dir}/assets/index.js"
curl --fail --location --silent --show-error "${upstream}/assets/index-C3XYJhxe.css" -o "${output_dir}/assets/index.css"
curl --fail --location --silent --show-error "${upstream}/favicon.svg" -o "${output_dir}/favicon.svg"

# Keep the original application intact while teaching its router that GitHub
# Pages serves this repository below /leadwoo-website.
perl -0pi -e 's#n\.jsxs\(Jbe,\{children:#n.jsxs(Jbe,{basename:"/leadwoo-website",children:#g' "${output_dir}/assets/index.js"

# Serve the mirrored assets from the GitHub Pages project path.
perl -0pi -e 's#src="/assets/index-xoRJ665e\.js"#src="/leadwoo-website/assets/index.js"#g;
  s#href="/assets/index-C3XYJhxe\.css"#href="/leadwoo-website/assets/index.css"#g;
  s#href="/favicon\.svg"#href="/leadwoo-website/favicon.svg"#g' "${output_dir}/index.html"

# The original compiled app references these branded assets. Keeping them on
# the owner-controlled source domain preserves the visual replica without
# duplicating large media files in this editing repository.
perl -0pi -e 's#(["(])(/assets/)#$1https://tryleadwoo.com$2#g;
  s#(["(])(/attorney-woo\.png)#$1https://tryleadwoo.com$2#g' "${output_dir}/assets/index.js" "${output_dir}/assets/index.css"

cp "${output_dir}/index.html" "${output_dir}/404.html"
cp "${site_root}/static/plans/index.html" "${output_dir}/plans/index.html"
touch "${output_dir}/.nojekyll"

echo "GitHub Pages artifact prepared in ${output_dir}"
