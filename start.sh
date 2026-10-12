#!/bin/sh
set -e
PORT="${PORT:-8080}"

# Make sure only one Apache MPM (prefork, required by mod_php) is enabled
rm -f /etc/apache2/mods-enabled/mpm_event.* /etc/apache2/mods-enabled/mpm_worker.*
a2enmod mpm_prefork >/dev/null 2>&1 || true

sed -i -E "s/^Listen [0-9]+$/Listen ${PORT}/" /etc/apache2/ports.conf
sed -i -E "s/<VirtualHost \*:[0-9]+>/<VirtualHost *:${PORT}>/" /etc/apache2/sites-available/000-default.conf

php artisan migrate --force
php artisan db:seed --force
php artisan storage:link 2>/dev/null || true

exec apache2-foreground