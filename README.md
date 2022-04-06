<p align="center"><img src="https://laravel.com/assets/img/components/logo-laravel.svg"></p>

## Prerequisite

1. Make sure you have [composer](https://getcomposer.org/download/) installed.
2. Make sure you have latest stable version of [node](https://nodejs.org/en/download/) installed.

### Installation

1. `git clone`
2. `create a .env file copy content from .env.example and update the values`
3. `composer install && composer update`
4. `php artisan cron:refresh-database`
5. if npm version < 7 `npm install && npm run dev` else `npm install --legacy-peer-deps && npm run dev`
6. `php artisan key:gen`
7. `php artisan serve`
