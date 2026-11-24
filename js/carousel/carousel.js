document.addEventListener("DOMContentLoaded", () => {
    const carousel_container = document.querySelector(".carousel");
    const track = document.querySelector(".carousel-images");
    const images = document.querySelectorAll(".carousel-images img");
    const next_btt = document.querySelector(".buttons #next");
    const prev_btt = document.querySelector(".buttons #prev");
    const toggle_btt = document.querySelector(".buttons #toggle_auto");

    let txt_when_switch_off = toggle_btt.dataset.off;
    let txt_when_switch_on = toggle_btt.dataset.on;
    
    if (txt_when_switch_off === undefined) {
        txt_when_switch_off = "off"
    }

    if (txt_when_switch_on === undefined) {
        txt_when_switch_on = "on"
    }

    toggle_btt.innerHTML = txt_when_switch_on;

    let current_img = 0;
    let toggle_scroller = 1; /*0 - Stop auto_scrolling, 1 - Start auto_scrolling*/

    function initialize_style() {
        const carousel_style = {
            position: "relative",
            width: "100%",
            overflow: "hidden",
            margin: "0 auto",

            maxWidth: "var(--carousel-max-width, 300px)",
            height: "var(--carousel-height, auto)",
            backgroundColor: "var(--carousel-bg, transparent)",
            border: "var(--carousel-border, none)",
            borderRadius: "var(--carousel-radius, 0px)",
            boxShadow: "var(--carousel-shadow, none)"
        };
        Object.assign(carousel_container.style, carousel_style);

        const track_style = {
            display: "flex",
            width: "100%",

            transition: "var(--carousel-transition, transform 0.7s ease-in-out)"
        };
        Object.assign(track.style, track_style);

        const images_style = {
            width: "100%",
            flexShrink: "0",

            objectFit: "var(--carousel-img-fit, cover)",
            height: "var(--carousel-img-height, auto)",
            aspectRatio: "var(--carousel-img-ratio, auto)"
        };
        images.forEach(img => Object.assign(img.style, images_style));

        const next_btt_style = {
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: "10px",
            cursor: "pointer",
            userSelect: "none",

            padding: "var(--carousel-btn-padding, 10px 15px)",
            color: "var(--carousel-next-color, var(--carousel-btn-color, black))",
            backgroundColor: "var(--carousel-next-bg, var(--carousel-btn-bg, transparent))",
            fontSize: "var(--carousel-btn-font-size, inherit)",
            fontWeight: "var(--carousel-btn-font-weight, normal)",
            border: "var(--carousel-btn-border, none)",
            borderRadius: "var(--carousel-btn-radius, 0px)",
            boxShadow: "var(--carousel-btn-shadow, none)"
        };
        Object.assign(next_btt.style, next_btt_style);

        const prev_btt_style = {
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: "10px",
            cursor: "pointer",
            userSelect: "none",

            padding: "var(--carousel-btn-padding, 10px 15px)",
            color: "var(--carousel-prev-color, var(--carousel-btn-color, black))",
            backgroundColor: "var(--carousel-prev-bg, var(--carousel-btn-bg, transparent))",
            fontSize: "var(--carousel-btn-font-size, inherit)",
            fontWeight: "var(--carousel-btn-font-weight, normal)",
            border: "var(--carousel-btn-border, none)",
            borderRadius: "var(--carousel-btn-radius, 0px)",
            boxShadow: "var(--carousel-btn-shadow, none)"
        };
        Object.assign(prev_btt.style, prev_btt_style);

        const toggle_btt_style = {
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            cursor: "pointer",
            userSelect: "none",

            padding: "var(--carousel-toggle-padding, 10px 15px)",
            color: "var(--carousel-toggle-color, black)",
            backgroundColor: "var(--carousel-toggle-bg, transparent)",
            fontSize: "var(--carousel-toggle-font-size, inherit)",
            fontWeight: "var(--carousel-toggle-font-weight, normal)",
            border: "var(--carousel-toggle-border, none)",
            borderRadius: "var(--carousel-toggle-radius, 0px)",
            boxShadow: "var(--carousel-toggle-shadow, none)"
        };
        Object.assign(toggle_btt.style, toggle_btt_style);
    }

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
    initialize_style()
    auto_scroll();
});