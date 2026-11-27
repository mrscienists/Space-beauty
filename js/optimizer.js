function remove_blur(){
    const elements = document.querySelectorAll("*");
    elements.forEach(elem => {
        elem.style.setProperty('backdrop-filter', 'none', 'important');
    });
}

function video_remover(){
    const video = document.querySelector("video");
    video.remove();

    const video_container = document.querySelector(".video-container")

    const img = "<img  alt='.' src='images/bg.webp'>"
    video_container.innerHTML = img
}

document.addEventListener("DOMContentLoaded", () =>{
    let fps = 0;
    let lastTime = performance.now();

    function calculateFps(now) {
        fps++;
        if (now - lastTime >= 1000) {
            if (fps < 50){
                remove_blur();
                if(fps < 30){
                    video_remover();
                }
                return;
            }
            fps = 0;
            lastTime = now;
        }
        requestAnimationFrame(calculateFps);
    }
    requestAnimationFrame(calculateFps);
});