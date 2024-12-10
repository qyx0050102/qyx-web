// 平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 页面加载完成后的简单动画
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transition = 'opacity 0.5s ease-in-out';
    });

    setTimeout(() => {
        sections.forEach(section => {
            section.style.opacity = '1';
        });
    }, 300);

    // 添加导航链接的活跃状态处理
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // 初始检查并设置活跃状态
    function setActiveLink() {
        const hash = window.location.hash || '#hero';
        navLinks.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // 页面加载时检查
    setActiveLink();

    // 监听滚动事件来更新活跃状态
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                currentSection = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 重置所有错误消息
            clearErrors();
            
            // 获取表单数据
            const formData = {
                name: document.getElementById('name'),
                email: document.getElementById('email'),
                phone: document.getElementById('phone'),
                message: document.getElementById('message')
            };

            // 验证表单
            let isValid = true;

            // 验证名字
            if (!formData.name.value.match(/^[A-Za-z\s]{2,50}$/)) {
                showError('name', 'Please enter a valid name (2-50 characters, letters only)');
                isValid = false;
            }

            // 验证邮箱
            if (!formData.email.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }

            // 验证电话
            if (!formData.phone.value.match(/^[0-9]{11}$/)) {
                showError('phone', 'Please enter a valid 11-digit phone number');
                isValid = false;
            }

            // 验证消息
            if (formData.message.value.length < 10) {
                showError('message', 'Message must be at least 10 characters long');
                isValid = false;
            }

            // 如果验证通过
            if (isValid) {
                // 这里可以添加发送表单数据的代码
                alert('Thank you for your message! We will contact you soon.');
                contactForm.reset();
            }
        });
    }
});

// 显示错误消息
function showError(fieldId, message) {
    const errorSpan = document.getElementById(`${fieldId}-error`);
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
    }
}

// 清除所有错误消息
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.style.display = 'none';
        error.textContent = '';
    });
}

let slideIndex = 1;

// 页面加载完成后自动开始轮播
document.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
    // 自动轮播
    setInterval(() => {
        changeSlide(1);
    }, 4000); // 改为每4秒切换一次
});

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    // 隐藏所有幻灯片
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // 移除所有点的激活状态
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // 显示当前幻灯片和激活对应的点
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
} 