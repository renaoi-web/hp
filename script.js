
    const carousel = document.getElementById('carousel');
    const totalItems = 6; // 本画像の枚数（必要に応じて調整）
    const dotsContainer = document.getElementById('dots');
    let currentIndex = 0;

    function createDots() {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => scrollToIndex(i));
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots(index) {
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    }

    function scrollToIndex(index) {
      const items = carousel.querySelectorAll('.carousel-item');
      const target = items[index + 1]; // クローンを除いて+1
      if (target) {
        carousel.scrollTo({ left: target.offsetLeft - carousel.offsetLeft, behavior: 'smooth' });
        currentIndex = index;
        updateDots(index);
      }
    }

    function scrollCarousel(dir) {
      currentIndex = (currentIndex + dir + totalItems) % totalItems;
      scrollToIndex(currentIndex);
    }

    carousel.addEventListener('scroll', () => {
      const scrollLeft = carousel.scrollLeft;
      const items = carousel.querySelectorAll('.carousel-item');
      const first = items[1];
      const last = items[items.length - 2];

      if (scrollLeft <= items[0].offsetLeft + 1) {
        carousel.scrollTo({ left: last.offsetLeft - carousel.offsetLeft, behavior: 'auto' });
        currentIndex = totalItems - 1;
        updateDots(currentIndex);
      } else if (scrollLeft >= items[items.length - 1].offsetLeft - 1) {
        carousel.scrollTo({ left: first.offsetLeft - carousel.offsetLeft, behavior: 'auto' });
        currentIndex = 0;
        updateDots(currentIndex);
      } else {
        let closest = 0;
        let minDiff = Infinity;
        for (let i = 0; i < totalItems; i++) {
          const diff = Math.abs(items[i + 1].offsetLeft - scrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closest = i;
          }
        }
        if (closest !== currentIndex) {
          currentIndex = closest;
          updateDots(currentIndex);
        }
      }
    });

    window.addEventListener('load', () => {
      createDots();
      scrollToIndex(0);
    });
