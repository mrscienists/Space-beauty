document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-images");
    const images = document.querySelectorAll(".carousel-images img");
    const next_btt = document.querySelector(".buttons #next");
    const prev_btt = document.querySelector(".buttons #prev");

    let current_img = 0;

    function change_img(){
        const slideWidth = images[0].clientWidth;
        track.style.transform = `translateX(${-current_img * slideWidth}px)`;
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

    window.addEventListener('resize', change_img);
});