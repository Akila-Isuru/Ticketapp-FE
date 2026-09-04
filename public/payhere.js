window.payhere = window.payhere || {};

(function () {
  window.payhere.onCompleted = window.payhere.onCompleted || function () {};
  window.payhere.onDismissed = window.payhere.onDismissed || function () {};
  window.payhere.onError = window.payhere.onError || function () {};

  window.payhere.startPayment = function (paymentObj) {
    var isSandbox = paymentObj.sandbox !== false;
    var domain = isSandbox
      ? "https://sandbox.payhere.lk"
      : "https://www.payhere.lk";

    var existingModal = document.getElementById("payhere-modal-overlay");
    if (existingModal) existingModal.remove();

    var overlay = document.createElement("div");
    overlay.id = "payhere-modal-overlay";
    overlay.style.cssText =
      "position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.6);z-index:99999;display:flex;justify-content:center;align-items:center;";

    var wrapper = document.createElement("div");
    wrapper.style.cssText =
      "position:relative;width:100%;max-width:500px;height:650px;background:#fff;border-radius:12px;overflow:hidden;";

    var closeBtn = document.createElement("button");
    closeBtn.innerText = "✕ Close";
    closeBtn.style.cssText =
      "position:absolute;top:10px;right:10px;z-index:100000;background:#ff4d4d;color:#fff;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-weight:bold;";
    closeBtn.onclick = function () {
      overlay.remove();
      if (window.payhere.onDismissed) window.payhere.onDismissed();
    };

    var iframe = document.createElement("iframe");
    iframe.name = "payhere_checkout_frame";
    iframe.style.cssText = "width:100%;height:100%;border:none;";

    wrapper.appendChild(closeBtn);
    wrapper.appendChild(iframe);
    overlay.appendChild(wrapper);
    document.body.appendChild(overlay);

    var form = document.createElement("form");
    form.target = "payhere_checkout_frame";
    form.method = "POST";
    form.action = domain + "/payhere/checkout";

    for (var key in paymentObj) {
      if (paymentObj.hasOwnProperty(key)) {
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = paymentObj[key];
        form.appendChild(input);
      }
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };
})();
