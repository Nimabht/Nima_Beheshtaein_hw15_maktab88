let polipop = new Polipop("signupSection", {
  layout: "popups",
  insert: "before",
  pool: 5,
  sticky: true,
  life: 3000,
  progressbar: true,
});

$("#submitBtn").on("click", () => {
  const newUser = {
    username: $("#username-inp").val(),
    password: $("#password-inp").val(),
    email: $("#email-inp").val(),
    gender: $("#gender-inp").val(),
  };
  $.ajax({
    url: "/myAccount",
    type: "PUT",
    data: newUser,
    success: () => {
      window.location.href = "/myAccount";
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

$("#cancelBtn").on("click", () => {
  window.location.href = "/myAccount";
});
