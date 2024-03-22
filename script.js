ftom=0;jikakuis=0;ftganti=0;flag=1;flagg=1;fungsi=0;

function mulaikonten() {
    fungsi=1;
    suratin.style="display:none";
    ket.style="display:none";
    Content.style = "opacity:1;margin-top:4vh;";
    bodyblur.style="opacity:.4;animation:none";
    wallpaper.style="transform: scale(1);";
    bq.style = "position:relative;opacity:1;visibility:visible;margin-top:0;";
    audio.play();ftganti=0;ftmuncul();setTimeout(pesan,100);
}

async function menuju(){await swals.fire('OK!', 'Kirim pesan ke WhatsApp aku, ya!', 'success');window.location = "https://wa.me/6282372556135?text=" + pesanwhatsapp;Tombol.style="margin-top:15px;opacity:1;transform: scale(1);";}

const swalst = Swal.mixin({timer: 2777, allowOutsideClick: false, showConfirmButton: false, timerProgressBar: true, imageHeight: 100,}); const swals = Swal.mixin({allowOutsideClick: false, cancelButtonColor: '#FF0040', imageWidth: 100, imageHeight: 100,}); const body = document.querySelector("body");function createHeart() {const heart = document.createElement("div"); heart.className = "fas fa-heart"; heart.style.left = (Math.random() * 90)+"vw"; heart.style.animationDuration = (Math.random()*3)+2+"s"; body.appendChild(heart);} setInterval(function name(params) {var heartArr = document.querySelectorAll(".fa-heart"); if (heartArr.length > 100) {heartArr[0].remove()}},100);

async function pesan(){
    fthilang();wallpaper.style="transform: scale(1.5);";
    await swalst.fire({
        title: 'Kau Mencuuriii', timer: 3300,
        imageUrl: '' + fotoakhir1.src,
    });
    wallpaper.style="transform: scale(1);";
    await swalst.fire({
        title: 'Hatiku', timer: 1400,
        imageUrl: '' + fotoakhir2.src,
    });
    wallpaper.style="transform: scale(1.5);";
    await swalst.fire({
        title: 'Mimpiku', timer: 1100,
        imageUrl: '' + fotoakhir3.src,
    });
    wallpaper.style="transform: scale(1);";
    await swalst.fire({
        title: 'Semua Rindukuu', timer: 1400,
        imageUrl: '' + fotoakhir4.src,
    });
    
    wallpaper.style="transform: scale(1.5);";kalimat.innerHTML = vketik1;ftganti=1;ftmuncul();mulaiketik1();
}

async function jawab(){
    var { value: jawaban } = await swals.fire({
        title: 'Tulis Pesan &#128073;&#128072;', input: 'text', allowOutsideClick: false, showCancelButton: false,
    });
    if(jawaban && jawaban.length < 19){
        window.jawaban = jawaban;
        pesanwhatsapp = jawaban;balasan = jawaban;
        otomatis3();setTimeout(stakhir,1000);
    } else {
        await swals.fire('Ups!', 'Jawaban tidak boleh kosong atau lebih dari 18 karakter, ya!');
    }
}

function memulai(){suratin.style="transition:all 1s ease;transform:scale(.1);opacity:0";ket.style="transition:all 1s ease;transform:scale(.1);opacity:0";setTimeout(mulaikonten,300)}
function ftmuncul(){
    if(ftganti==0){fotoakhir.style="display:inline-flex;transition:all .7s ease;opacity:1;transform:scale(1)";}
    if(ftganti==1){fotoakhir.src = fotoakhir5.src;fotoakhir.style="display:inline-flex;opacity:1;transition:all .7s ease;transform:scale(1);";}
    if(ftganti==3){fotoakhir.src = fotoAkhir.src;fotoakhir.style="display:inline-flex;opacity:1;transition:all .7s ease;transform:scale(1);";}
}
function fthilang(){fotoakhir.style="display:inline-flex;opacity:0;transition:all .7s ease;transform:scale(.1)";}
function jjfoto(){fotoakhir.style.animation="rto .8s infinite alternate";}

function tombol(){Tombol.style="opacity:1;transform: scale(1);margin-top:15px";
if(jikakuis==0){ftom=1;} 
if(jikakuis==1){tmbl.innerHTML=tmbl2.innerHTML;ftom=2;}}

function multifungsi(){if(ftom==1){dilanjut();} if(ftom==2){dibalas();} if(ftom==5){menuju();}}
function dilanjut(){wallpaper.style="transform: scale(1);";setTimeout(otomatis2,500);fthilang();ftganti=3;setTimeout(ftmuncul,400);Tombol.style="opacity:0;transform: scale(.1);";jikakuis=1;setTimeout(tombol,1000);}

vketik1=kalimat.innerHTML;kalimat.innerHTML = "";
vketik1b=kalimata.innerHTML;kalimata.innerHTML = "";
var ab=0,vketik1b;function mulaiketik1() {if(ab<vketik1b.length){kalimata.innerHTML += vketik1b.charAt(ab);ab++;setTimeout(mulaiketik1,36);}if(ab==vketik1b.length){tombol();}}

function otomatis() {befanimkata();setTimeout(animkata,400);} 
function befanimkata(){kalimat.style="transform:scale(.3);";kalimatb.style="transform:scale(.3);";kalimatc.style="transform:scale(.3);";} 
function animkata() {kalimat.style="transform:scale(1);";kalimatb.style="transform:scale(1);";kalimatc.style="transform:scale(1);";}

function otomatis2() {
    kalimat.innerHTML = kalimat2.innerHTML;
    kalimat.style="";kalimata.innerHTML="";
    kalimatb.innerHTML="";
}

function otomatis3() {befanimkata3();setTimeout(animkata3,700);} 
function befanimkata3(){kalimat.style="";kalimatb.style="";kalimat.style="opacity:0";kalimatb.style="opacity:0";} 
function animkata3() {kalimat.innerHTML = kalimat3.innerHTML + balasan;kalimatb.innerHTML = kalimatb3.innerHTML;kalimat.style="opacity:1;font-size:18px;transition:none";kalimatb.style="opacity:1;font-size:17px;font-weight:400;transition:none";}

function stakhir(){tmbl.innerHTML="💌 Kirim";Tombol.style="opacity:1;transform: scale(1)";ftom=5;fungsi=0;}

async function dibalas(){
    setInterval(createHeart,200);
    wallpaper.style="transform: scale(1)";
    Tombol.style="opacity:0;transform: scale(.1);";
    Content.style = "transition:all 1s ease;opacity:1;margin-top:7vh;";
    jawab();
}