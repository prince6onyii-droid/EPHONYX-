let slides = [
    "https://via.placeholder.com/600x200?text=BIG+SALE+50%25+OFF",
    "https://via.placeholder.com/600x200?text=Organic+Soap+Promo",
    "https://via.placeholder.com/600x200?text=Cleaning+Products+Discount"
];

let currentSlide = 0;

// SHOW SLIDE
function showSlide(index) {
    document.getElementById("slideImg").src = slides[index];
}

// AUTO SLIDE
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 3000);

// SWIPE CONTROL
let startX = 0;

function startTouch(e) {
    startX = e.touches[0].clientX;
}

function endTouch(e) {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
        // swipe left → next
        currentSlide = (currentSlide + 1) % slides.length;
    }

    if (endX - startX > 50) {
        // swipe right → previous
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    }

    showSlide(currentSlide);
}
function payWithPaystack() {

    let email = prompt("Enter your email for payment:");
    let total = 0;

    cart.forEach(item => {
        total += item.price;
    });

    let handler = PaystackPop.setup({
        key: 'YOUR_PUBLIC_KEY_HERE', // 🔴 REPLACE THIS
        email: email,
        amount: total * 100, // Paystack uses kobo
        currency: "NGN",
        callback: function(response) {
            alert("Payment successful! Ref: " + response.reference);
            cart = [];
        },
        onClose: function() {
            alert("Payment cancelled");
        }
    });

    handler.openIframe();
}