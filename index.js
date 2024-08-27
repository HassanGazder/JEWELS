let cart = JSON.parse(localStorage.getItem("Products")) || [];

function cartcount(items) {
  let cartcounter = document.getElementById("CartCount");
  cartcounter.innerText = items.reduce((acc, curr) => acc + curr.productquantity, 0);
}

function add(P_id, P_img, p_name, p_price) {
  let obj = {
    productid: P_id,
    productimage: P_img,
    productname: p_name,
    productprice: p_price,
    productquantity: 1,
  };

  let isProductExist = cart.some(item => item.productid === P_id);

  if (isProductExist) {
    cart = cart.map(item => {
      if (item.productid === P_id) {
        item.productquantity++;
      }
      return item;
    });
  } else {
    cart.push(obj);
  }

  cartcount(cart);
  localStorage.setItem("Products", JSON.stringify(cart));
  document.getElementById("cartalert").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  cartcount(cart);
});
