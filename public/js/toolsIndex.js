
// SIDEBAR

const sidebar = document.getElementById('sidebar');
const openSidebarButton = document.getElementById('open-sidebar');

openSidebarButton.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('-translate-x-full');
});

document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !openSidebarButton.contains(e.target)) {
        sidebar.classList.add('-translate-x-full');
    }
});

// BUTTON SEE MORE

const contentSeeMore = document.getElementById('contentSeeMore')
const buttonSeeMore = document.getElementById('buttonSeeMore')
const buttonSeeLess = document.getElementById('buttonSeeLess')

buttonSeeMore.addEventListener('click', () => {
    contentSeeMore.classList.remove('hidden')
    buttonSeeMore.classList.add('hidden')
    buttonSeeLess.classList.remove('hidden')
})

buttonSeeLess.addEventListener('click', () => {
    contentSeeMore.classList.add('hidden')
    buttonSeeMore.classList.remove('hidden')
    buttonSeeLess.classList.add('hidden')
})

