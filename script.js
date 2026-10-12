const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
if (menuToggle && nav) menuToggle.addEventListener('click', () => nav.classList.toggle('open'));

const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
  let countdownStarted = false;
  downloadBtn.addEventListener('click', () => {
    if (countdownStarted) return;
    countdownStarted = true;
    downloadBtn.disabled = true;
    const status = document.getElementById('downloadStatus');
    let seconds = 5;
    downloadBtn.textContent = `Please wait ${seconds}s…`;
    status.textContent = 'Your download will start automatically when the countdown ends.';
    const timer = setInterval(() => {
      seconds -= 1;
      if (seconds > 0) {
        downloadBtn.textContent = `Please wait ${seconds}s…`;
      } else {
        clearInterval(timer);
        status.textContent = 'Starting download…';
        downloadBtn.textContent = 'Download started';
        const link = document.createElement('a');
        link.href = downloadBtn.dataset.file;
        link.download = 'MurderMystery-1.0.0.jar';
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => {
          downloadBtn.disabled = false;
          downloadBtn.textContent = 'Download again';
          status.textContent = 'If the download did not start, tap “Download again”.';
          countdownStarted = false;
        }, 1200);
      }
    }, 1000);
  });
}