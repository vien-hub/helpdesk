#!/usr/bin/env bash
# Adds the flash-message share to HandleInertiaRequests (idempotent).
set -e
F=app/Http/Middleware/HandleInertiaRequests.php
if [ ! -f "$F" ]; then echo "ERROR: run this from the Laravel project root (after breeze:install)."; exit 1; fi
if grep -q "'flash'" "$F"; then
  echo "HandleInertiaRequests already has flash. Nothing to do."
else
  perl -0pi -e "s/(\n(\s*)'auth' => \[)/\n\$2'flash' => [\n\$2    'success' => fn () => \$request->session()->get('success'),\n\$2    'error' => fn () => \$request->session()->get('error'),\n\$2],\$1/" "$F"
  grep -q "'flash'" "$F" && echo "Patched $F" || echo "COULD NOT PATCH - add the 'flash' array to share() manually (see README)."
fi
chmod +x start.sh 2>/dev/null || true
