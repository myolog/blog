document.addEventListener("DOMContentLoaded", () => {
  const blogBody = document.querySelector(".blog-body");
  const scrollbarContainer = document.querySelector(".scrollbar-container");
  if (!blogBody || !scrollbarContainer) return;
  
  // Gather headers from markdown content
  const headers = blogBody.querySelectorAll("h1, h2");
  headers.forEach(header => {
    // Calculate vertical position percentage relative to the blog content
    const blogRect = blogBody.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    const offsetPercent = ((headerRect.top - blogRect.top) / blogRect.height) * 100;
    
    // Create tooltip element
    const tip = document.createElement("div");
    tip.className = "header-tooltip";
    tip.style.top = `calc(${offsetPercent}% - 10px)`; // adjust vertical alignment as needed
    tip.textContent = header.textContent.trim();
    scrollbarContainer.appendChild(tip);
  });
});
