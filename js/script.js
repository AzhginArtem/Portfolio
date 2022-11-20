let circle = document.querySelectorAll('.skills__circle');
let percent = document.querySelectorAll('.skills__percent');
let diagram = document.querySelectorAll(".skills__item");
let content = document.querySelectorAll(".skills__content");
const interval = 20;
let angle = 0;
const angle_increment = 6;
let percents = [100, 50, 30, 75, 80];


window.addEventListener("scroll", startAnimation)

function startAnimation() {
    if (window.scrollY >= 350) { 
        for (let i = 0; i < 5; i++) {
            animation(i, percents[i]);
        }
        window.removeEventListener("scroll", startAnimation);
    }
}

function animation(i, percentNum) {
    let timer = window.setInterval(function () {
        circle[i].setAttribute("stroke-dasharray", angle + ", 10000");
        percent[i].innerHTML = parseInt(angle/560*100) + '%';
        if (angle >= 560) {
            window.clearInterval(window.timer);
        }
        angle += angle_increment;
        if (parseInt(percent[i].innerHTML.substring(0, percent[i].innerHTML.length - 1)) >= percentNum) {
            percent[i].innerHTML = percentNum+'%';
            clearInterval(timer);
        }
    }, interval);
}

diagram.forEach((e, index) => {
    e.addEventListener("click", ()=> {
        diagram.forEach(el => {
            el.id = '';
        })
        e.id = 'active';
        content.forEach(e => {
            e.style.display = "none";
        })
        content[index].style.display = "block";
    })
});

content.forEach(e => {
    e.style.display = "none";
})
content[0].style.display = "block";

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
let header = document.querySelector('.header');
let burger = document.querySelector(".menu");
burger.addEventListener('click', ()=> {
    burger.classList.toggle("active")
    header.classList.toggle("active__header")
})
let headerLinks = document.querySelectorAll('.header__item')
headerLinks.forEach((e) => {
    e.addEventListener('click', () => {
        burger.classList.toggle("active")
        header.classList.toggle("active__header")
    })
})
let lang = document.querySelector(".header__lang");
lang.addEventListener('click', () => {
    const animationElement = document.querySelector(".header__logo");
    let widthOfElement = animationElement.offsetWidth;
    animationElement.style.position = 'absolute';
    gsap.to(animationElement, {width: innerWidth, height: innerHeight, duration: 1});
    document.querySelector(".skills__menu").style.zIndex = -1;
    document.querySelector(".projects__container").style.zIndex = -1;
    setTimeout(() => {
        if (!document.querySelector(".ru")) {
            document.querySelector("body").style.fontFamily = "Yanone Kaffeesatz"; 
            for (let key in langArr){
                console.log(key);
                document.querySelector(key).innerHTML = langArr[key]['ru'];
            }
            document.querySelector(".header__lang_circle").classList.add("ru");
        } else {
            for (let key in langArr){
                document.querySelector("" + key).innerHTML = langArr[key]['en'];
            }
            document.querySelector("body").style.fontFamily = "Teko";
            document.querySelector(".header__lang_circle").classList.remove("ru");
        }
    }, 1000);
    setTimeout(() => {
        gsap.to(animationElement, {width: widthOfElement, height: 200, duration: 1});
        setTimeout(() => {
            document.querySelector(".skills__menu").style.zIndex = 1;
            document.querySelector(".projects__container").style.zIndex = 1;
        }, 280);
    }, 1500)
    animationElement.style.position = 'relative';
})

$('form').submit(function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/mailer/smart.php",
        data: $(this).serialize()
    }).done(() => {
        $(this).find("input").val("");
        $(this).find("textarea").val("");

        $("fomr").trigger('reset');
    })

    return false;
}); 