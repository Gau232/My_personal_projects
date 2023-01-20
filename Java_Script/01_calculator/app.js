let screen = document.querySelector('.screen');
let buttons = document.querySelectorAll('.btn');
let equal = document.querySelector('.btn-equal');
let clear = document.querySelector('.btn-clear');

buttons.forEach(function(button){
    button.addEventListener('click', function(e){
        let value = e.target.dataset.num;
        screen.value += value;
    })
});

clear.addEventListener('click', function(e){
    screen.value = "";
})

equal.addEventListener('click', function(e){
    if(screen.value !== ''){
        let ans = eval(screen.value);
        screen.value = ans;
    }
})

