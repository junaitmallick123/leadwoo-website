#!/usr/bin/env bash
set -euo pipefail

site_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
output_dir="${site_root}/dist"

rm -rf "${output_dir}"
mkdir -p "${output_dir}"
cp -R "${site_root}/static/." "${output_dir}/"

# GitHub Pages serves this file for any future route that has not yet been
# materialized. The homepage is a safe, branded fallback.
cp "${output_dir}/index.html" "${output_dir}/404.html"
touch "${output_dir}/.nojekyll"

echo "Static LeadWoo replica prepared in ${output_dir}"
