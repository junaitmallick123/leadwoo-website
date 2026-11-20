#!/usr/bin/env bash
set -euo pipefail

site_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
output_dir="${site_root}/dist"

rm -rf "${output_dir}"
mkdir -p "${output_dir}"
cp -R "${site_root}/static/." "${output_dir}/"

# Keep markup and motion assets in sync across deploys and browser caches.
motion_hash="$(cat "${output_dir}/assets/site-motion.css" "${output_dir}/assets/site-motion.js" | sha256sum | cut -c1-16)"
for extension in css js; do
  cp "${output_dir}/assets/site-motion.${extension}" "${output_dir}/assets/site-motion.${motion_hash}.${extension}"
done

# Load the common navigation and footer effects wherever both are rendered.
while IFS= read -r -d '' page; do
  if grep -qi '<header[ >]' "$page" && grep -qi '<footer[ >]' "$page"; then
    sed -i "s|</head>|<link rel=\"stylesheet\" href=\"/leadwoo-website/assets/site-motion.${motion_hash}.css\"><script src=\"/leadwoo-website/assets/site-motion.${motion_hash}.js\" defer></script></head>|I" "$page"
  fi
done < <(find "${output_dir}" -name '*.html' -type f -print0)

# GitHub Pages serves this file for any future route that has not yet been
# materialized. The homepage is a safe, branded fallback.
cp "${output_dir}/index.html" "${output_dir}/404.html"
touch "${output_dir}/.nojekyll"

echo "Static LeadWoo replica prepared in ${output_dir}"
