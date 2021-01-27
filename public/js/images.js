$(document).ready(function () {
  let uploadFile = $('.upload-profile-image input[type="file"]');
  uploadFile.change(function () {
    readURL(this);
  });
});

function readURL(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (event) {
      $(".upload-profile-image .img").attr("src", event.target.result);
      $(".upload-profile-image .camera-icon").css("display", "none");
    };

    reader.readAsDataURL(input.files[0]);
  }
}
