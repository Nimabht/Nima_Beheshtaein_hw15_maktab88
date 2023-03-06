$(() => {
  $("form").on("submit", function (e) {
    e.preventDefault();
    const searchValue = $("#searchValue").val();
    renderCards(searchValue);
  });
  renderCards();
});
