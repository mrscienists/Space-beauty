document.addEventListener("DOMContentLoaded", () => {
    const carousel_container = document.querySelector(".carousel");
    const track = document.querySelector(".carousel-images");
    const images = document.querySelectorAll(".carousel-images img");
    const next_btt = document.querySelector(".buttons #next");
    const prev_btt = document.querySelector(".buttons #prev");
    const toggle_btt = document.querySelector(".buttons #toggle_auto")

    let current_img = 0;
    let toggle_timer = 1; /*0 - Stop auto_scrolling, 1 - Start auto_scrolling*/

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    function change_img(){
        const slideWidth = images[0].clientWidth;
        track.style.transform = `translateX(${-current_img * slideWidth}px)`;
    }

    async function auto_scroll(){
        let switch_time;
        try{
            switch_time = Number(carousel_container.dataset.switchTime);
        }
        catch(error) {
            console.log(error)
            switch_time = 3.5;
        }
        
        while(toggle_timer){
            await sleep(switch_time * 1000);
            if(toggle_timer) {
                current_img++;
                if (current_img >= images.length){
                    current_img = 0;
                }
                change_img();
            }
        }
    }

    next_btt.addEventListener('click', (e) => {
            e.preventDefault();
            current_img++;
            if (current_img >= images.length){
                current_img = 0;
            }
            change_img();
        }
    );

    prev_btt.addEventListener('click', (e) => {
            e.preventDefault();
            current_img++;
            if (current_img >= images.length){
                current_img = 0;
            }
            change_img();
        }
    );

    toggle_btt.addEventListener('click', (e) => {
            e.preventDefault();
            toggle_timer = (toggle_timer + 1) % 2;
            if(toggle_timer){
                auto_scroll()
            }
            console.log(toggle_timer)
        }
    );

    window.addEventListener('resize', change_img);
    auto_scroll()
});