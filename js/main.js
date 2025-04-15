(function() {
	"use strict";

	var treeviewMenu = $('.app-menu');

	// Toggle Sidebar
	$('[data-toggle="sidebar"]').click(function(event) {
		event.preventDefault();
		$('.app').toggleClass('sidenav-toggled');
	});

	// Activate sidebar treeview toggle
	$("[data-toggle='treeview']").click(function(event) {
		event.preventDefault();
		if (!$(this).parent().hasClass('is-expanded')) {
			treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
		}
		$(this).parent().toggleClass('is-expanded');
	});

})();

(async () => {
  const userID = localStorage.getItem("UserID");
  const url = `https://script.google.com/macros/s/AKfycbz1vIsgVzmrItnOny0sp-4e4mO0ZL4iP-PYOtQ6-xMgLmtAY5XIRpefJ3wz2nHLTgE4yw/exec?action=getLevelProgress&userID=${userID}`;

  const res = await fetch(url);
  const result = await res.json();
  console.log("📦 ดึงข้อมูล progress:", result);

  const levelKeys = ["school", "area", "admin"];
  levelKeys.forEach(key => {
    const data = result[key] || { done: 0, total: 1 };
    const percent = Math.round((data.done / 39) * 100);

    const bar = document.getElementById(`level-${key}`);
    const label = document.getElementById(`label-${key}`);

    if (bar && label) {
      bar.style.width = `${percent}%`;
      label.textContent = `${percent}%`;
    } else {
      console.warn(`⚠️ ไม่พบ #level-${key} หรือ #label-${key}`);
    }
  });
})();

const observer = new MutationObserver(() => {
  const carouselEl = document.querySelector('#imageCarousel');
  if (carouselEl) {
    new bootstrap.Carousel(carouselEl, {
      interval: 3000,
      ride: 'carousel',
      wrap: true
    });
    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
