const cardGenerator = (product) => {
  return `
    <div class="card shadow" style="width: 18rem">
  <img
    class="card-img-top mb-3 align-self-center"
    src=${product.photo}
    style="width: 250px; height: 150px" />
  <div class="card-body bg-light">
    <h5 class="card-title text-center">${product.name}</h5>
    <p>Color: ${product.color}</p>
    <p>Matrial: ${product.material}</p>
    <p>size: ${product.size}</p>
    <a href="/shoes/info/${product.id}" class="btn btn-primary me-5 px-4">Buy</a>
    <span class="text-secondary ms-3">${product.price}$</span>
  </div>
</div>`;
};
