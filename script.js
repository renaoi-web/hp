  const track = document.querySelector('.carousel-track');
  const items = Array.from(track.children);
  const prevBtn = document.querySelector('.carousel-button.prev');
  const nextBtn = document.querySelector('.carousel-button.next');
  const dots = Array.from(document.querySelectorAll('.carousel-dots button'));
  const totalItems = items.length;

  let currentIndex = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // ボタンの活性/非活性切り替え（ループなし）
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalItems - 1;

    // ドットの状態切替
    dots.forEach((dot, idx) => {
      if(idx === currentIndex){
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });
  }

  prevBtn.addEventListener('click', () => {
    if(currentIndex > 0){
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener('click', () => {
    if(currentIndex < totalItems - 1){
      currentIndex++;
      updateCarousel();
    }
  });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      currentIndex = idx;
      updateCarousel();
    });
  });

  // 初期表示
  updateCarousel();
