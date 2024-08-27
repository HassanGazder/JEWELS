document.addEventListener("DOMContentLoaded", () => {
    let Cart = localStorage.getItem("Products");
    let result = Cart ? JSON.parse(Cart) : [];

    let cartcounter = document.getElementById("CartCount");
    function cartcount(items) {
        cartcounter.innerText = items.reduce((acc, curr) => acc + curr.productquantity, 0);
    }
    cartcount(result);

    let emptyalert = document.getElementById("emptyalert");
    let productInformation = document.getElementById("productinformation");
    let totalQuantity = 0;
    let totalPrice = 0;

    if (result.length === 0) {
        emptyalert.style.display = "block";
        document.getElementById("parentdiv").style.display = "none";
        return;
    }

    result.forEach((item, index) => {
        let productClone = document.getElementById("product-template").cloneNode(true);
        productClone.style.display = "block";

        let productImg = productClone.querySelector(".cartimages");
        productImg.src = item.productimage;
        let productName = productClone.querySelector(".productname");
        productName.innerText = item.productname;
        let productPrice = productClone.querySelector(".productprice");
        productPrice.innerText = `$${item.productprice.toFixed(2)}`;
        let quantityLabel = productClone.querySelector(".quantity-label");
        quantityLabel.innerText = item.productquantity;

        totalPrice += item.productprice * item.productquantity;
        totalQuantity += item.productquantity;

        let quantityMinus = productClone.querySelector(".quantity-minus");
        let quantityPlus = productClone.querySelector(".quantity-plus");

        quantityMinus.addEventListener("click", () => {
            QuantityDecrement(index, quantityLabel, productClone);
        });

        quantityPlus.addEventListener("click", () => {
            QuantityIncrement(index, quantityLabel, productClone);
        });

        productInformation.appendChild(productClone);
    });

    function QuantityIncrement(index, quantityLabel, productClone) {
        let item = result[index];
        item.productquantity++;
        quantityLabel.innerText = item.productquantity;
        totalQuantity++;
        totalPrice += item.productprice;

        updateCart();
    }

    function QuantityDecrement(index, quantityLabel, productClone) {
        let item = result[index];
        if (item.productquantity > 1) {
            item.productquantity--;
            quantityLabel.innerText = item.productquantity;
            totalQuantity--;
            totalPrice -= item.productprice;

            updateCart();
        } else {
            result.splice(index, 1);
            productClone.remove();
            updateCart();

            if (result.length === 0) {
                localStorage.clear();
                document.getElementById("parentdiv").style.display = "none";
                emptyalert.style.display = "block";
            }
        }
    }

    function updateCart() {
        localStorage.setItem("Products", JSON.stringify(result));
        cartcount(result);

        document.getElementById("quantity").innerText = `Quantity: ${totalQuantity}`;
        document.getElementById("total").innerText = `Total: $${totalPrice.toFixed(2)}`;
    }

    updateCart();
});
