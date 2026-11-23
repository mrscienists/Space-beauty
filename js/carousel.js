document.addEventListener("DOMContentLoaded", () => {
    const carousel_container = document.querySelector(".carousel");
    const track = document.querySelector(".carousel-images");
    const images = document.querySelectorAll(".carousel-images img");
    const next_btt = document.querySelector(".buttons #next");
    const prev_btt = document.querySelector(".buttons #prev");
    const toggle_btt = document.querySelector(".buttons #toggle_auto");

    const txt_when_switch_off = toggle_btt.dataset.off;
    const txt_when_switch_on = toggle_btt.dataset.on;

    toggle_btt.innerHTML = txt_when_switch_on;

    let current_img = 0;
    let toggle_scroller = 1; /*0 - Stop auto_scrolling, 1 - Start auto_scrolling*/

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    function change_img(){
        const slideWidth = images[0].clientWidth;
        track.style.transform = `translateX(${-current_img * slideWidth}px)`;
    }

    async function auto_scroll(){
        let switch_delay;

        try{
            switch_delay = Number(carousel_container.dataset.switchDelay);
        } catch(error) {
            console.error(error)
            switch_delay = 3.5;
        }

        while(true){
            if(toggle_scroller) {
                await sleep(switch_delay * 1000);
            } else {
                await sleep(50);
            }

            if(toggle_scroller) {
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
            current_img--;
            if (current_img < 0){
                current_img = images.length - 1;
            }
            change_img();
        }
    );

    toggle_btt.addEventListener('click', (e) => {
            e.preventDefault();
            toggle_scroller = (toggle_scroller + 1) % 2;

            if(toggle_scroller) {
                toggle_btt.innerHTML = txt_when_switch_on;
            } else {
                toggle_btt.innerHTML = txt_when_switch_off;
            }
        }
    );

    window.addEventListener('resize', change_img);
    auto_scroll();
});