const theme_toggle = document.getElementById('theme');
const body = document.body;

function changeTheme(el) {
// check to see what the current value of our select is.
    let value = el.value;

    if (value === 'dark') {
        body.classList.add('dark');
    }
    else {
        body.classList.remove('dark');
    }

};

// add an event listener to the themeSelector element here.
// Use the changeTheme function as the event handler function.
theme_toggle.addEventListener('change', function(el){
    changeTheme(el.currentTarget);
});