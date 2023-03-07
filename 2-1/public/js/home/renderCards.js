const renderCards = (searchValue) => {
  $("#cards-wrapper").html("");
  if (!searchValue) {
    $.ajax({
      type: "GET",
      url: "/shoes",
      success(data) {
        const shoes = data;
        for (const shoe of shoes) {
          $("#cards-wrapper").append(
            `<div class="col-3 p-3">${cardGenerator(shoe)}</div>`
          );
        }
      },
    });
  } else {
    $.ajax({
      type: "GET",
      url: `/search?value=${searchValue}`,
      success(data) {
        const shoes = data;
        for (const shoe of shoes) {
          $("#cards-wrapper").append(
            `<div class="col-3 p-3">${cardGenerator(shoe)}</div>`
          );
        }
      },
    });
  }
};
