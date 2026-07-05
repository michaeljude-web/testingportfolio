(function () {
  document.querySelectorAll('.section-nav-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.section-nav-btn').forEach(function (b) { b.classList.remove('current'); });
      document.querySelectorAll('.content-block').forEach(function (p) { p.classList.remove('current'); });
      btn.classList.add('current');
      document.getElementById(btn.dataset.target).classList.add('current');
    });
  });

  var tiles = Array.prototype.slice.call(document.querySelectorAll('#photoGrid .photo-grid-item'));
  var viewer = document.getElementById('imageViewer');
  var viewerImg = document.getElementById('viewerImage');
  var viewerCounter = document.getElementById('viewerCount');
  var closeBtn = document.getElementById('viewerClose');
  var backBtn = document.getElementById('viewerBack');
  var forwardBtn = document.getElementById('viewerForward');
  var currentIndex = 0;

  function tileImg(tile) {
    return tile.querySelector('img');
  }

  function renderSlide(index) {
    var total = tiles.length;
    currentIndex = (index + total) % total;
    var img = tileImg(tiles[currentIndex]);
    viewerImg.src = img.getAttribute('src');
    viewerCounter.textContent = (currentIndex + 1) + ' / ' + total;
  }

  function openViewer(index) {
    renderSlide(index);
    viewer.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeViewer() {
    viewer.classList.remove('visible');
    viewerImg.src = '';
    document.body.style.overflow = '';
  }

  tiles.forEach(function (tile, index) {
    tile.addEventListener('click', function () { openViewer(index); });
    tile.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openViewer(index); }
    });
  });

  closeBtn.addEventListener('click', closeViewer);
  backBtn.addEventListener('click', function () { renderSlide(currentIndex - 1); });
  forwardBtn.addEventListener('click', function () { renderSlide(currentIndex + 1); });

  viewer.addEventListener('click', function (e) {
    if (e.target === viewer || e.target.classList.contains('image-viewer-stage')) {
      closeViewer();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (!viewer.classList.contains('visible')) return;
    if (e.key === 'Escape') closeViewer();
    if (e.key === 'ArrowLeft') renderSlide(currentIndex - 1);
    if (e.key === 'ArrowRight') renderSlide(currentIndex + 1);
  });

  var touchStartX = null;
  viewer.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  viewer.addEventListener('touchend', function (e) {
    if (touchStartX === null) return;
    var diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) renderSlide(currentIndex - 1);
      else renderSlide(currentIndex + 1);
    }
    touchStartX = null;
  }, { passive: true });
}());