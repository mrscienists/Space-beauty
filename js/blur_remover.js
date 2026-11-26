function remove_blur(){
    const elements = document.querySelectorAll("*");
    elements.forEach(elem => {
        elem.style.setProperty('backdrop-filter', 'none', 'important');
    });
}

document.addEventListener("DOMContentLoaded", () =>{
    let fps = 0;
    let lastTime = performance.now();

    function calculateFps(now) {
        fps++;
        if (now - lastTime >= 1000) {
            if (fps < 50){
                remove_blur();
                return;
            }
            fps = 0;
            lastTime = now;
        }
        requestAnimationFrame(calculateFps);
    }
    requestAnimationFrame(calculateFps);
});