// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Design office of Łukasz Tyrała ⌚︎ EST 2008';
export const SITE_DESCRIPTION = 'Professional information, interaction & interface design services for indispensable applications and websites.';
export const SITE_AUTHOR = 'Łukasz Tyrała';

export const CAREER_START = 2008; // the year I started my professional career
export const TEACHING_START = 2013; // the year I started my education in design

// Evaluated at build time; the site is rebuilt on every deploy.
const currentYear = new Date().getFullYear();
export const YEARS_EXPERIENCE = currentYear - CAREER_START;
export const YEARS_TEACHING = currentYear - TEACHING_START;
