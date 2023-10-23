document.addEventListener("DOMContentLoaded", function () {
  const inputMaxLengthOnLoad = document.getElementById("inputNama").maxLength;
  document.getElementById("sisaKarakter").innerText = inputMaxLengthOnLoad;

  document.getElementById("inputNama").addEventListener("input", function () {
    const jumlahKarakterDiketik =
      document.getElementById("inputNama").value.length;
    const jumlahKarakterMaksimal =
      document.getElementById("inputNama").maxLength;

    console.log(`Jumlah karakter diketik: ${jumlahKarakterDiketik}`);
    console.log(`Jumlah karakter maksimal: ${jumlahKarakterMaksimal}`);

    const sisaKarakterUpdate = jumlahKarakterMaksimal - jumlahKarakterDiketik;
    document.getElementById("sisaKarakter").innerText =
      sisaKarakterUpdate.toString();

    if (sisaKarakterUpdate === 0) {
      document.getElementById("sisaKarakter").innerText =
        "Batas maksimal telah tercapai!";
    } else if (sisaKarakterUpdate <= 5) {
      document.getElementById("notifikasiSisaKarakter").style.color = "red";
    } else {
      document.getElementById("notifikasiSisaKarakter").style.color = "black";
    }
  });

  document.getElementById("inputNama").addEventListener("focus", function () {
    console.log("inputNama: focus");
    document.getElementById("notifikasiSisaKarakter").style.visibility =
      "visible";
  });

  document.getElementById("inputNama").addEventListener("blur", function () {
    console.log("inputNama: blur");
    document.getElementById("notifikasiSisaKarakter").style.visibility =
      "hidden";
  });

  document
    .getElementById("inputCaptcha")
    .addEventListener("change", function () {
      console.log("inputCaptcha: change");

      const inputCaptcha = document.getElementById("inputCaptcha").value;
      const submitButton = document.getElementById("submitButton");

      if (inputCaptcha === "PRNU") {
        submitButton.removeAttribute("disabled");
      } else {
        submitButton.setAttribute("disabled", "");
      }
    });

  document
    .getElementById("formDataDiri")
    .addEventListener("submit", function (event) {
      const inputCaptcha = document.getElementById("inputCaptcha").value;
      if (inputCaptcha === "PRNU") {
        alert("Selamat! Captcha Anda lolos :D");
      } else {
        alert("Captcha Anda belum tepat :(");
        document.getElementById("submitButton").setAttribute("disabled", "");
      }
      event.preventDefault();
    });

  document.getElementById("inputCopy").addEventListener("copy", function () {
    alert("Anda telah men-copy sesuatu!");
  });

  document.getElementById("inputPaste").addEventListener("paste", function () {
    alert("Anda telah men-paste sesuatu!");
  });
});
