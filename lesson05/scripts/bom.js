const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', function() {});

function isDuplicate(chapter) {
    const chapters = Array.from(list.querySelectorAll('li'));
    return chapters.some(li => li.textContent.includes(chapter));
}

button.addEventListener('click', addChapter);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addChapter();
    }
});

function addChapter() {
    const chapter = input.value.trim();
    
    if (chapter === '') {
        input.focus();
        return;
    }

    if (isDuplicate(chapter)) {
        alert('This Chapter is already listed!');
        input.value = '';
        input.focus();
        return;
    }

    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    li.textContent = chapter;
    deleteButton.textContent = '✖️';

    li.append(deleteButton);
    list.append(li);

    deleteButton.addEventListener('click', function () {
        list.removeChild(li);
        input.focus();
    });

    input.value = '';
    input.focus();
}

const el = document.getElementById('button');
console.log(el.ariaLabel);
el.ariaLabel = 'Add a Chapter';
console.log(el.ariaLabel);