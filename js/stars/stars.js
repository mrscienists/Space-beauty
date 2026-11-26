function launch_stars(){
    const container = document.getElementById("stars");
    const STAR_COUNT = Number(getComputedStyle(container).getPropertyValue("--star-count").trim()) || 60

    
    for (let i = 0; i < STAR_COUNT; i++) {
        const star = document.createElement("div");
        star.className = "star";

        const min_size = Number(getComputedStyle(container).getPropertyValue("--min-size").trim()) || 0.5
        const max_size = Number(getComputedStyle(container).getPropertyValue("--max-size").trim()) || 6

        const size = Math.random() * (max_size - min_size) + min_size;
        star.style.width = star.style.height = size + "px";

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";

        const animation_duration_min = Number(getComputedStyle(container).getPropertyValue("--min-duration").trim()) || 2
        const animation_duration_max = Number(getComputedStyle(container).getPropertyValue("--max-duration").trim()) || 3

        const animation_delay_min = Number(getComputedStyle(container).getPropertyValue("--min-delay").trim()) || 2
        const animation_delay_max = Number(getComputedStyle(container).getPropertyValue("--max-delay").trim()) || 3

        star.style.animationDuration = (Math.random() * (animation_duration_max - animation_duration_min) + animation_duration_min) + "s";
        star.style.animationDelay = -(Math.random() * (animation_delay_max - animation_delay_min) + animation_delay_min) + "s";
        
        container.appendChild(star);
    }
}