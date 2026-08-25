document.addEventListener("DOMContentLoaded", () => {
  const tooltipElements = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]',
  );
  [...tooltipElements].forEach((element) => new bootstrap.Tooltip(element));

  const shareButton = document.querySelector("#shareButton");
  const toastMessage = document.querySelector("#toastMessage");
  let toastTimer;

  shareButton.addEventListener("click", async () => {
    const shareData = {
      title: document.title,
      text: "Temukan Seishun Projects",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toastMessage.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(
          () => toastMessage.classList.remove("show"),
          2400,
        );
      }
    } catch (error) {
      if (error.name !== "AbortError")
        console.warn("Share action unavailable.", error);
    }
  });
});
