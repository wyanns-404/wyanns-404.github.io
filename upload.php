<?php
$target_dir = "uploads/"; // Nama folder untuk menyimpan foto
$target_file = $target_dir . "upload.jpg"; // Nama file diubah menjadi "upload.jpg"
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($_FILES["fileToUpload"]["name"],PATHINFO_EXTENSION));

// Check jika file gambar benar-benar gambar
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        $uploadOk = 1;
    } else {
        $uploadOk = 0;
    }
}

// Check jika file sudah ada
if (file_exists($target_file)) {
    // Jika file sudah ada, hapus file yang lama
    if(unlink($target_file)){
        $uploadOk = 1;
    } else {
        $uploadOk = 0;
    }
}

// Ubah ekstensi file menjadi ".jpg"
if ($imageFileType != "jpg" && $imageFileType != "jpeg") {
    $target_file = $target_dir . "upload.jpg";
}

// Check ukuran file
if ($_FILES["fileToUpload"]["size"] > 500000) {
    $uploadOk = 0;
}

// Check jika $uploadOk bernilai 0 karena error
if ($uploadOk == 0) {
// Jika semua kondisi terpenuhi, maka upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    } else {
        $uploadOk = 0;
    }
}

// Redirect ke halaman lain setelah proses pengunggahan selesai
if ($uploadOk == 1) {
    echo "<script type='text/javascript'>window.location.href = 'code.html';</script>";
}
?>
