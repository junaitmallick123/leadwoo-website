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

# Apply the LeadWoo shield to all pages and load the shared motion effects.
while IFS= read -r -d '' page; do
  sed -E -i 's|<link rel="icon"[^>]*>||Ig; s|</head>|<link rel="icon" type="image/png" sizes="64x64" href="/leadwoo-website/assets/leadwoo-favicon.png"></head>|I' "$page"
  if grep -qi '<header[ >]' "$page" && grep -qi '<footer[ >]' "$page"; then
    sed -i "s|</head>|<link rel=\"stylesheet\" href=\"/leadwoo-website/assets/site-motion.${motion_hash}.css\"><script src=\"/leadwoo-website/assets/site-motion.${motion_hash}.js\" defer></script></head>|I" "$page"
  fi
done < <(find "${output_dir}" -name '*.html' -type f -print0)

# GitHub Pages serves this file for any future route that has not yet been
# materialized. The homepage is a safe, branded fallback.
cp "${output_dir}/index.html" "${output_dir}/404.html"
touch "${output_dir}/.nojekyll"

echo "Static LeadWoo replica prepared in ${output_dir}"
