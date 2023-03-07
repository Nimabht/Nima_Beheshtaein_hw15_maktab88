let polipop = new Polipop("signupSection", {
  layout: "popups",
  insert: "before",
  pool: 5,
  sticky: true,
  life: 3000,
  progressbar: true,
});

$("form").on("submit", function (e) {
  e.preventDefault();
  const user = {
    firstname: $(".noBullet").children()[0].children[1].value,
    lastname: $(".noBullet").children()[1].children[1].value,
    password: $(".noBullet").children()[2].children[1].value,
    username: $(".noBullet").children()[3].children[1].value,
    gender: $(".noBullet").children()[4].children[1].value,
  };
  console.log(user);
  $.ajax({
    type: "POST",
    url: "/auth/signup",
    data: user,
    success: (result) => {
      polipop.add({
        type: "success",
        title: "Success",
        content: result,
      });
      console.log(result);
    },
    error: (xhr) => {
      polipop.add({
        type: "error",
        title: "Error",
        content: JSON.parse(xhr.responseText).message,
      });
    },
  });
});
