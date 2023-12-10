var cooldown = false;

function incrementCounter(counterId) {
    if (cooldown) return;
    cooldown = true;
    setTimeout(function() { cooldown = false; }, 3000); // 3 seconds cooldown

    var counter = document.getElementById(counterId);
    var count = parseInt(counter.innerText);
    count++;
    counter.innerText = count + " downloads";
}
