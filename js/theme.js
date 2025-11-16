const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

const userTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

const updateIcons = (isDarkMode) => {
    sunIcon.classList.toggle('hidden', !isDarkMode);
    moonIcon.classList.toggle('hidden', isDarkMode);
};

const themeCheck = () => {
    if (userTheme === 'dark' || (!userTheme && systemTheme)) {
        document.documentElement.classList.add('dark');
        updateIcons(true);
    } else {
        updateIcons(false);
    }
};

const themeSwitch = () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        updateIcons(false);
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        updateIcons(true);
    }
};

export function initTheme() {
    themeToggle.addEventListener('click', themeSwitch);
    themeCheck();
}
