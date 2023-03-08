$("#logoutBtn").on("click", async function () {
  await fetch("/auth/logout");
  window.location.href = "/auth/login";
});
$("#editBtn").on("click", () => {
  window.location.href = "/myAccount/edit";
});
